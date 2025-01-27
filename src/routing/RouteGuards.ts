import type { NavigationGuard, RouteLocationNormalized } from "vue-router";
import type { Store } from "@/Store";

export interface RouteGuards {
    get(route: RouteLocationNormalized): NavigationGuard | undefined;
}

export default function useRouteGuards(_store: Store): RouteGuards {
    //const { storeName } = store;

    const guards: ReadonlyMap<string, NavigationGuard> = new Map<string, NavigationGuard>([
        // NOTE: dont try anything fancy here like:
        //       [loadSummaries, create, loadById].map(guard => [guard.name, guard])
        //       function names are obfuscated in the built version, so no guards are found!
        // EXAMPLE:
        //   ["guardName", guardFunction],
    ]);

    function get(route: RouteLocationNormalized): NavigationGuard | undefined {
        const { guardName } = route.meta;
        return guardName !== undefined ? guards.get(guardName) : undefined;
    }

    return {
        get,
    };
}
