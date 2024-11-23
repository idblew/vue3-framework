import type { Router } from "vue-router";
import vueRouter from "./VueRouter";

export interface Services {
    vueRouter: Router;
}

const services: Services = {
    vueRouter,
};

export default services;
