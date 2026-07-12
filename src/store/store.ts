import Block, { type BlockOwnProps } from "../framework/Block";
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

type BlockConstructor<Props extends BlockOwnProps = BlockOwnProps> = new (
  props?: Props,
) => Block<Props>;

export function connect<Props extends BlockOwnProps>(
  Component: BlockConstructor<Props>,
  mapStateToProps: (state: PlainObject) => Partial<Props> = (state) =>
    state as Partial<Props>,
): BlockConstructor<Props> {
  class ConnectedComponent extends Component {
    constructor(props?: Props) {
      super(props);

      this.setProps(mapStateToProps(store.getState()));

      store.subscribe(() => {
        this.setProps(mapStateToProps(store.getState()));
      });
    }
  }

  return ConnectedComponent;
}

export default store;
