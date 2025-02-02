import { computed, type Ref, ref, unref } from "vue";
import type { SubmitEventPromise } from "vuetify";
import type { Services } from "@/Services";
import type { Store } from "@/Store";

export const enum NotificationType {
    INFO,
    SUCCESS,
    WARNING,
    ERROR,
}

export interface FieldValidationResult {
    id: number | string;
    errorMessages: string[];
}

export interface Notification {
    type: NotificationType;
    message: string;
    exception?: string;
    details?: string[];
}

export interface NotificationStore {
    currentNotification: Ref<Notification | undefined>;
    dismissCurrentNotification(): Promise<void>;
    notifyInfo(message: string): void;
    notifySuccess(message: string): void;
    notifyWarning(message: string): void;
    notifyError(message: string, exception?: unknown): void;
    notifyFormValidationErrors(errors: Awaited<SubmitEventPromise>["errors"]): void;
}

export default function useNotificationStore(
    _services: Services,
    _store: Store,
): NotificationStore {
    const notifications = ref<Notification[]>([]);

    const currentNotification = computed(() => unref(notifications).at(0));

    function addNotification(notification: Notification) {
        notifications.value.push(notification);
    }

    async function dismissCurrentNotification() {
        notifications.value.shift();
    }

    function notifyInfo(message: string): void {
        addNotification({ type: NotificationType.INFO, message });
    }

    function notifySuccess(message: string): void {
        addNotification({ type: NotificationType.SUCCESS, message });
    }

    function notifyWarning(message: string): void {
        addNotification({ type: NotificationType.WARNING, message });
    }

    function notifyError(message: string, exception?: Error): void {
        if (exception !== undefined) {
            addNotification({
                type: NotificationType.ERROR,
                message: `${message} (${exception.name})`,
                exception: exception.message,
            });
        } else {
            addNotification({ type: NotificationType.ERROR, message });
        }
    }

    function notifyFormValidationErrors(errors: Awaited<SubmitEventPromise>["errors"]): void {
        const details = errors.reduce((messages: string[], element) => {
            element.errorMessages.forEach((message) => messages.push(message));
            return messages;
        }, []);
        addNotification({
            type: NotificationType.ERROR,
            message: "The following errors occurred:",
            details,
        });
    }

    return {
        currentNotification,
        dismissCurrentNotification,
        notifyInfo,
        notifySuccess,
        notifyWarning,
        notifyError,
        notifyFormValidationErrors,
    };
}
