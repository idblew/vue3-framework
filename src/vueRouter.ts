import { createRouter, createWebHashHistory } from "vue-router";

import routes from "./routes";

const vueRouter = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default vueRouter;
