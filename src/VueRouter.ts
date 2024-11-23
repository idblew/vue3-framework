import { createRouter, createWebHashHistory } from "vue-router";

import routes from "./Routes";

const vueRouter = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default vueRouter;
