<template>
    <div class="grid-container my-4">
        <v-card
            v-for="route in routes"
            :key="route.name"
            :to="route.components ? route.path : ''"
            class="d-flex flex-nowrap grid-item"
            width="400"
        >
            <v-icon :icon="route.meta.menuItem?.icon" color="primary" size="128" />
            <div class="align-start">
                <v-card-title class="pb-0">
                    {{ route.meta.menuItem?.title }}
                </v-card-title>
                <v-card-subtitle class="pt-0">
                    {{ route.meta.menuItem?.description }}
                </v-card-subtitle>
                <v-card-text class="px-3">
                    <div v-for="child in route.children" :key="child.name">
                        <v-btn
                            v-tooltip="child.meta?.menuItem?.description"
                            :text="child.name as string"
                            :to="child"
                            class="pa-0"
                            density="compact"
                            justify-start
                            size="small"
                            variant="plain"
                        />
                    </div>
                </v-card-text>
            </div>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { unref } from "vue";
import { byIndex, hasMenuItemWithDescription } from "@/Routes";
import { injectStore } from "@/Store";

const { router } = injectStore();
const { topLevelRoutes } = router;
const routes = unref(topLevelRoutes).filter(hasMenuItemWithDescription).sort(byIndex);
</script>

<style scoped lang="scss">
.grid-container {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-template-rows: auto;
    place-items: center;
}

.grid-item {
    place-self: center;
}
</style>
