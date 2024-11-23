import { inject, type InjectionKey } from "vue";

import type { Services } from "./Services";
import useRouterStore, { type RouterStore } from "./routing/RouteStore";

export interface Store {
    router: RouterStore;
}

export function defineStore(services: Services): Readonly<Store> {
    const store = {} as Store;

    store.router = useRouterStore(services, store);

    return store;
}

export const StoreKey = Symbol("Store") as InjectionKey<Store>;
export const injectStore = (): Store => inject(StoreKey) as Store;
