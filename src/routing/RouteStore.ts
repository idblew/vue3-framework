import { computed, type Ref, unref } from "vue";
import type { Router, RouteRecordNormalized } from "vue-router";

import type { Services } from "@/Services";
import type { Store } from "@/Store";

import useRouteGuards from "./RouteGuards";

export interface RouterStore extends Router {
    readonly topLevelRoutes: Ref<RouteRecordNormalized[]>;
    reloadRoute(delay: number): Promise<void>;
}

export default function useRouterStore(services: Services, store: Store): RouterStore {
    const { vueRouter } = services;
    const { getRoutes } = vueRouter;
    const guards = useRouteGuards(store);

    vueRouter.beforeEach(async (to, from, next) => {
        const guard = guards.get(to);
        if (guard) {
            await guard(to, from, next);
        } else {
            next();
        }
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
        ...vueRouter,
        topLevelRoutes,
        reloadRoute,
    };
}
