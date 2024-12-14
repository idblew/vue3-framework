import type { RouteRecordNormalized, RouteRecordRaw } from "vue-router";
import AppHome from "./home/AppHome.vue";
import ReloadRoute from "./routing/ReloadRoute.vue";

// use dynamic imports to enable route based code splitting
const AlphaView = () => import("./alpha/AlphaView.vue");
const Beta1View = () => import("./beta/Beta1View.vue");
const Beta2View = () => import("./beta/Beta2View.vue");

interface RouteMenuItem {
    index: number;
    icon: string;
    title: string;
    description?: string;
}

declare module "vue-router" {
    interface RouteMeta {
        menuItem?: RouteMenuItem;
        guardName?: string;
    }
}

export function hasMenuItem(
    route: RouteRecordNormalized,
    menuItemCheck: (menuItem: RouteMenuItem) => boolean = () => true,
): boolean {
    const { menuItem } = route.meta;
    return menuItem !== undefined && menuItemCheck(menuItem);
}

export function hasMenuItemWithDescription(route: RouteRecordNormalized): boolean {
    return hasMenuItem(route, (menuItem) => (menuItem.description?.length ?? 0) > 0);
}

export function byIndex(
    { meta: meta1 }: RouteRecordNormalized,
    { meta: meta2 }: RouteRecordNormalized,
): number {
    const { index: index1 } = meta1.menuItem ?? {};
    const { index: index2 } = meta2.menuItem ?? {};
    return Math.sign((index1 ?? 0) - (index2 ?? 0));
}

const routes: Readonly<RouteRecordRaw[]> = [
    {
        path: "/",
        redirect: { name: "Home" },
    },
    {
        name: "ReloadRoute",
        path: "/reloading",
        component: ReloadRoute,
    },
    {
        name: "Home",
        path: "/home",
        components: { main: AppHome },
        meta: {
            menuItem: {
                index: 0,
                icon: "mdi-home-outline",
                title: "Home",
            },
        },
    },
    {
        name: "Alpha",
        path: "/alpha",
        components: { main: AlphaView },
        meta: {
            menuItem: {
                index: 1,
                icon: "mdi-alpha-a-circle-outline",
                title: "Alpha",
                description: "Alpha Description",
            },
        },
    },
    {
        name: "Beta",
        path: "/beta",
        meta: {
            menuItem: {
                index: 2,
                icon: "mdi-alpha-b-circle-outline",
                title: "Beta",
                description: "Beta Description",
            },
        },
        children: [
            {
                name: "Beta 1",
                path: "1",
                components: { main: Beta1View },
                meta: {
                    menuItem: {
                        index: 0,
                        icon: "mdi-numeric-1-circle-outline",
                        title: "Beta 1",
                        description: "Beta 1 Description",
                    },
                },
            },
            {
                name: "Beta 2",
                path: "2",
                components: { main: Beta2View },
                meta: {
                    menuItem: {
                        index: 1,
                        icon: "mdi-numeric-2-circle-outline",
                        title: "Beta 2",
                        description: "Beta 2 Description",
                    },
                },
            },
        ],
    },
];

export default routes;
