import Block from "../framework/Block";
import { merge, set, type PlainObject } from "../utils/utils";

type Listener = () => void;

class Store {
  private state: PlainObject = {};
  private listeners: Set<Listener> = new Set();

  public getState() {
    return this.state;
  }

  public setState(path: string, value: unknown) {
    // Создаем новый объект состояния вместо изменения существующего
    this.state = merge(this.state, set({}, path, value));

    // Уведомляем всех подписчиков об изменении
    this.emit();
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);

    // Возвращаем функцию для отписки
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    this.listeners.forEach((listener) => listener());
  }
}

const store = new Store();

type BlockConstructorWithProps = new (
  ...args: ConstructorParameters<typeof Block>
) => {
  setProps(props: PlainObject): void;
};

export function connect(Component: typeof Block) {
  const ConnectedComponent = Component as unknown as BlockConstructorWithProps;

  return class extends ConnectedComponent {
    constructor(...args: ConstructorParameters<typeof Block>) {
      // Не забываем передать все аргументы конструктора
      super(...args);

      // Подписываемся на событие обновления хранилища
      store.subscribe(() => {
        // Вызываем обновление компонента, передав данные из хранилища
        this.setProps({ ...store.getState() });
      });
    }
  };
}

export default store;
