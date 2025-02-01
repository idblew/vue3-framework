import type { NavigationGuard, NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import type { Store } from "@/Store";

export interface RouteGuards {
    get(route: RouteLocationNormalized): NavigationGuard | undefined;
}

export default function useRouteGuards(store: Store): RouteGuards {
    const { notificationStore } = store;

    async function sampleGuardWithRandomDelay(
        _to: RouteLocationNormalized,
        _from: RouteLocationNormalized,
        next: NavigationGuardNext,
    ) {
        try {
            await Promise.all([
                new Promise((resolve) => {
                    setTimeout(resolve, Math.random() * (3000 - 500 + 1) + 500);
                }),
            ]);
            next();
        } catch (err) {
            notificationStore.notifyError("Unable to load account summaries", err);
        }
    }

    const guards: ReadonlyMap<string, NavigationGuard> = new Map<string, NavigationGuard>([
        // NOTE: dont try anything fancy here like:
        //       [loadSummaries, create, loadById].map(guard => [guard.name, guard])
        //       function names are obfuscated in the built version, so no guards are found!
        // EXAMPLE:
        //   ["guardName", guardFunction],
        ["sampleGuardWithRandomDelay", sampleGuardWithRandomDelay],
    ]);

    function get(route: RouteLocationNormalized): NavigationGuard | undefined {
        const { guardName } = route.meta;
        return guardName !== undefined ? guards.get(guardName) : undefined;
    }

    return {
        get,
    };
}
