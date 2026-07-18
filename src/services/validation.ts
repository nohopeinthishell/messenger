type ValidationRule = {
  pattern: RegExp;
  message: string;
};

const nameRule: ValidationRule = {
  pattern: /^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё-]*$/,
  message: "Первая буква должна быть заглавной, допустимы только буквы и дефис",
};

const passwordRule: ValidationRule = {
  pattern: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
  message: "Пароль должен быть 8-40 символов, с заглавной буквой и цифрой",
};

const requiredTextRule = (message: string): ValidationRule => ({
  pattern: /\S/,
  message,
});

export const rulesValidation: Record<string, ValidationRule> = {
  first_name: nameRule,
  second_name: nameRule,
  login: {
    pattern: /^(?!\d+$)[A-Za-z0-9_-]{3,20}$/,
    message:
      "Логин должен быть 3-20 символов, латиница, цифры, дефис или подчёркивание",
  },
  email: {
    pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+$/,
    message: "Введите корректный email",
  },
  password: passwordRule,
  password_repeat: passwordRule,
  oldPassword: passwordRule,
  newPassword: passwordRule,
  newPasswordRepeat: passwordRule,
  display_name: requiredTextRule("Имя в чате не должно быть пустым"),
  phone: {
    pattern: /^\+?\d{10,15}$/,
    message: "Телефон должен содержать 10-15 цифр и может начинаться с плюса",
  },
  title: requiredTextRule("Название чата не должно быть пустым"),
  message: requiredTextRule("Сообщение не должно быть пустым"),
};

export const validation = (
  value: string,
  field: keyof typeof rulesValidation,
): string | null => {
  const rule = rulesValidation[field];

  if (!rule) {
    return null;
  }
  const isValid = rule.pattern.test(value);
  return isValid ? null : rule.message;
};
