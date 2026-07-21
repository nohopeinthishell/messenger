export type PlainObject<T = unknown> = {
  [k in string]: T;
};

export function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = [];

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  }

  return result;
}

export function queryString(data: PlainObject) {
  if (!isPlainObject(data)) {
    throw new Error("input must be an object");
  }

  return getParams(data)
    .map((arr) => arr.join("="))
    .join("&");
}

export function isEqual(lhs: PlainObject | [], rhs: PlainObject | []): boolean {
  if (isArray(lhs) && isArray(rhs)) {
    if (lhs.length !== rhs.length) {
      return false;
    }
    for (let i = 0; i < lhs.length; i++) {
      if (!isEqual(lhs[i], rhs[i])) {
        return false;
      }
    }
    return true;
  }

  if (isPlainObject(lhs) && isPlainObject(rhs)) {
    const lhsKeys = Object.keys(lhs);
    const rhsKeys = Object.keys(rhs);

    if (lhsKeys.length !== rhsKeys.length) {
      return false;
    }

    for (const key of lhsKeys) {
      if (!(key in rhs)) {
        return false;
      }
      const leftValue = lhs[key];
      const rightValue = rhs[key];

      if (isArrayOrObject(leftValue) && isArrayOrObject(rightValue)) {
        if (!isEqual(leftValue, rightValue)) {
          return false;
        }
      } else if (leftValue !== rightValue) {
        return false;
      }
    }
    return true;
  }

  return false;
}

export function merge(lhs: PlainObject, rhs: PlainObject): PlainObject {
  const result: PlainObject = { ...lhs };

  for (const key in rhs) {
    const leftValue = result[key];
    const rightValue = rhs[key];

    if (isPlainObject(leftValue) && isPlainObject(rightValue)) {
      result[key] = merge(leftValue, rightValue);
    } else {
      result[key] = rightValue;
    }
  }

  return result;
}

export function set(
  object: PlainObject,
  path: string,
  value: unknown,
): PlainObject {
  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  if (!isPlainObject(object)) {
    return object;
  }

  const keys = path.split(".");
  let current: PlainObject = object;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (i === keys.length - 1) {
      current[key] = value;
    } else {
      if (!isPlainObject(current[key])) {
        current[key] = {};
      }

      current = current[key] as PlainObject;
    }
  }

  return object;
}

export function formatChatTime(value: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
