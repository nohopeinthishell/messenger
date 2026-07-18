import store from "../store/store";

export type ToastType = "error" | "success" | "info";

export type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastOptions = {
  message: string;
  type?: ToastType;
  duration?: number;
};

type ApiError = {
  status?: number;
  statusText?: string;
  response?: string;
  reason?: string;
};

const DEFAULT_TOAST_DURATION = 5000;

let toastId = 0;

const timers = new Map<number, ReturnType<typeof setTimeout>>();

function getToasts(): Toast[] {
  return (store.getState().toasts as Toast[] | undefined) ?? [];
}

function parseResponseReason(response?: string): string | null {
  if (!response) {
    return null;
  }

  try {
    const data = JSON.parse(response) as { reason?: string; message?: string };

    return data.reason ?? data.message ?? null;
  } catch {
    return response;
  }
}

export function getErrorMessage(
  error: unknown,
  fallback = "Что-то пошло не так",
): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === "string" && error) {
    return error;
  }

  if (typeof error === "object" && error !== null) {
    const apiError = error as ApiError;
    const reason = apiError.reason ?? parseResponseReason(apiError.response);

    if (reason) {
      return reason;
    }

    if (apiError.statusText) {
      return apiError.statusText;
    }
  }

  return fallback;
}

export function removeToast(id: number): void {
  const timer = timers.get(id);

  if (timer) {
    clearTimeout(timer);
    timers.delete(id);
  }

  store.setState(
    "toasts",
    getToasts().filter((toast) => toast.id !== id),
  );
}

export function addToast({
  message,
  type = "info",
  duration = DEFAULT_TOAST_DURATION,
}: ToastOptions): void {
  const id = ++toastId;

  store.setState("toasts", [
    ...getToasts(),
    {
      id,
      message,
      type,
    },
  ]);

  if (duration > 0) {
    timers.set(id, setTimeout(() => removeToast(id), duration));
  }
}

export function handleError(
  error: unknown,
  fallback = "Что-то пошло не так",
): void {
  addToast({
    message: getErrorMessage(error, fallback),
    type: "error",
  });
}
