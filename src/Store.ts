import { inject, type InjectionKey } from "vue";

import type { Services } from "./Services";
import useNotificationStore, { type NotificationStore } from "./notification/NotificationStore";
import useRouterStore, { type RouterStore } from "./routing/RouteStore";
import useThemeStore, { type ThemeStore } from "./theme/ThemeStore";

export interface Store {
    notificationStore: NotificationStore;
    router: RouterStore;
    themeStore: ThemeStore;
}

export function defineStore(services: Services): Readonly<Store> {
    const store = {} as Store;

    store.notificationStore = useNotificationStore(services, store);
    store.router = useRouterStore(services, store);
    store.themeStore = useThemeStore(services, store);

    return store;
}

export const StoreKey = Symbol("Store") as InjectionKey<Store>;
export const injectStore = (): Store => inject(StoreKey) as Store;
