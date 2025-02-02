import { computed, reactive, type Ref, type ToRefs, toRefs, unref } from "vue";
import type {
    RouteLocationNormalizedLoadedGeneric,
    Router,
    RouteRecordNormalized,
} from "vue-router";

import type { Services } from "@/Services";
import type { Store } from "@/Store";

import useRouteGuards from "./RouteGuards";

interface State {
    previousRoute?: RouteLocationNormalizedLoadedGeneric;
    processingGuard: boolean;
    guardError: boolean;
}

export interface RouterStore extends Router, Readonly<ToRefs<State>> {
    readonly topLevelRoutes: Ref<RouteRecordNormalized[]>;
    reloadRoute(delay: number): Promise<void>;
}

export default function useRouterStore(services: Services, store: Store): RouterStore {
    const state = reactive<State>({
        previousRoute: undefined,
        processingGuard: false,
        guardError: false,
    });
    const { vueRouter } = services;
    const { notificationStore } = store;
    const { getRoutes } = vueRouter;
    const guards = useRouteGuards(store);

    vueRouter.beforeEach(async (to, from, next) => {
        state.processingGuard = true;

        const guard = guards.get(to);
        try {
            if (guard) {
                await guard(to, from, next);
            } else {
                next();
            }
            state.guardError = false;
            state.previousRoute = from;
        } catch (e) {
            notificationStore.notifyError(`Error during navigation to '${String(to.name)}'`, e);
            state.guardError = true;
            next(false);
        }

        state.processingGuard = false;
    });

    const topLevelRoutes = computed(() => {
        const allRoutes = getRoutes();
        return allRoutes.filter((route) =>
            allRoutes.every((parent) =>
                parent.children.every((child) => route.path !== `${parent.path}/${child.path}`),
            ),
        );
    });

    async function reloadRoute(delay = 100) {
        const { currentRoute } = vueRouter;
        const route = unref(currentRoute);
        await vueRouter
            .replace({ name: "ReloadRoute" })
            .then(() => setTimeout(() => vueRouter.replace(route), delay));
    }

    return {
        ...toRefs(state),
        ...vueRouter,
        topLevelRoutes,
        reloadRoute,
    };
}
