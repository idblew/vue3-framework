import type { NavigationGuard, NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import type { Store } from "@/Store";

export interface RouteGuards {
    get(route: RouteLocationNormalized): NavigationGuard | undefined;
}

export default function useRouteGuards(store: Store): RouteGuards {
    const {} = store;

    async function sampleGuard(
        _to: RouteLocationNormalized,
        _from: RouteLocationNormalized,
        next: NavigationGuardNext,
    ) {
        await Promise.all([
            new Promise((resolve) => {
                setTimeout(resolve, Math.round(Math.random() * (2000 - 500)) + 500);
            }),
        ]);
        if (Math.random() < 0.3) {
            throw new Error("Route Guard Error");
        }
        next();
    }

    const guards: ReadonlyMap<string, NavigationGuard> = new Map<string, NavigationGuard>([
        // NOTE: dont try anything fancy here like:
        //       [loadSummaries, create, loadById].map(guard => [guard.name, guard])
        //       function names are obfuscated in the built version, so no guards are found!
        // EXAMPLE:
        //   ["guardName", guardFunction],
        ["sampleGuard", sampleGuard],
    ]);

    function get(route: RouteLocationNormalized): NavigationGuard | undefined {
        const { guardName } = route.meta;
        return guardName !== undefined ? guards.get(guardName) : undefined;
    }

    return {
        get,
    };
}
