<template>
    <v-app :theme="theme">
        <v-navigation-drawer location="start" permanent>
            <template #prepend>
                <div class="pa-5">
                    <v-img :src="logo" alt="" />
                </div>
                <v-divider />
            </template>
            <template #append>
                <v-footer>
                    <small>&copy; 2024 <em>Your name here</em></small>
                </v-footer>
            </template>
            <v-list density="compact" open-strategy="single" variant="plain">
                <template v-for="route in routes" :key="route.name">
                    <v-list-group v-if="route.children.length > 0">
                        <template #activator="{ props: itemProps }">
                            <v-list-item
                                v-bind="itemProps"
                                :prepend-icon="route.meta.menuItem?.icon"
                                :title="route.meta.menuItem?.title"
                                color="primary--text"
                                slim
                            />
                        </template>
                        <v-list-item
                            v-for="child in route.children.filter((child) => child.path)"
                            :key="child.name"
                            :prepend-icon="child.meta?.menuItem?.icon"
                            :title="child.meta?.menuItem?.title"
                            :to="child"
                            :value="child.name"
                            color="primary"
                            slim
                        />
                    </v-list-group>
                    <v-list-item
                        v-else
                        :prepend-icon="route.meta.menuItem?.icon"
                        :title="route.meta.menuItem?.title"
                        :to="route"
                        :value="route.name"
                        color="primary"
                        slim
                    />
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar color="primary">
            <template #title>
                <v-app-bar-title class="text-h5"><em>Application Name</em></v-app-bar-title>
            </template>
            <template #append>
                <v-btn
                    v-tooltip="'Generate Random Notification'"
                    class="mr-5"
                    icon="mdi-bell-ring"
                    @click="notificationStore.generateRandomNotification"
                />
                <v-menu>
                    <template #activator="{ props: btnProps }">
                        <v-btn
                            v-bind="btnProps"
                            :text="name"
                            prepend-icon="mdi-account"
                            rounded="pill"
                            size="x-large"
                            variant="tonal"
                        />
                    </template>
                    <v-list class="pb-0">
                        <v-list-item
                            :title="name"
                            lines="two"
                            prepend-icon="mdi-account"
                            subtitle="Signed In"
                        />
                        <v-list-item
                            lines="two"
                            prepend-icon="mdi-account-settings-outline"
                            subtitle="Adjust preferences"
                            title="Settings"
                        />
                        <v-divider />
                        <v-list-item
                            lines="two"
                            prepend-icon="mdi-theme-light-dark"
                            subtitle="Display Mode"
                            title="Theme"
                        />
                        <theme-selection class="pl-2" />
                        <v-divider />
                        <v-list-item prepend-icon="mdi-logout" title="Sign Out" @click="signOut" />
                    </v-list>
                </v-menu>
            </template>
        </v-app-bar>
        <v-main class="d-flex flex-column flex-1-1-100">
            <router-view v-slot="{ Component, route }" name="main">
                <notification-snackbar :theme="theme" />
                <component :is="Component" :key="route.name" />
            </router-view>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { computed, provide, unref } from "vue";
import { RouterView } from "vue-router";
import { byIndex, hasMenuItem } from "@/Routes";
import type { Services } from "@/Services";
import { defineStore, StoreKey } from "@/Store";
import logo from "@/assets/logo.png";
import NotificationSnackbar from "./notification/NotificationSnackbar.vue";
import ThemeSelection from "@/theme/ThemeSelection.vue";

const props = defineProps<{
    services: Services;
}>();

const stores = defineStore(props.services);
provide(StoreKey, stores);

const { notificationStore, router } = stores;
const { topLevelRoutes } = router;
const { theme } = stores.themeStore;

const routes = unref(topLevelRoutes)
    .filter((route) => hasMenuItem(route))
    .sort(byIndex);

const name = computed<string>(() => "User Name");

function signOut() {}
</script>

<style lang="scss">
@forward "vuetify/settings" with (
    $color-pack: false
);

body {
    font-family: "Roboto", sans-serif;
}

a {
    text-decoration: none;
}

a[target="_blank"]::after {
    content: " \0f0327";
    font-family: "Material Design Icons", fantasy;
    font-variant-position: super;
    text-decoration: none;
}

.v-list-group {
    --prepend-width: 25px !important;
}

.v-list-item__prepend .v-icon {
    opacity: 1 !important;
}
</style>
