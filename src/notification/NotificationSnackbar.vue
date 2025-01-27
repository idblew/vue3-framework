<template>
    <v-snackbar
        v-model="show"
        class="notification"
        close-on-content-click
        location="top right"
        max-width="500"
        multi-line
        position="fixed"
        :color="colour"
        :theme="theme"
        :timer="`on-${colour}`"
    >
        <div class="d-flex flex-row">
            <v-icon size="large" class="flex-0-0 my-auto mr-4" :icon="icon" />
            <div class="d-flex flex-column my-auto">
                <div class="flex-1-1 notification-text">{{ currentNotification?.message }}</div>
                <div v-if="currentNotification?.exception" class="flex-1-1 notification-exception">
                    {{ currentNotification?.exception }}
                </div>
                <ul v-if="currentNotification?.details" class="flex-1-1 ml-4">
                    <li v-for="(detail, index) in currentNotification.details" :key="index">
                        {{ detail }}
                    </li>
                </ul>
            </div>
        </div>
    </v-snackbar>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, unref, watchEffect } from "vue";
import { injectStore } from "@/Store";
import { NotificationType } from "./NotificationStore";

const colours: ReadonlyMap<NotificationType, string> = new Map([
    [NotificationType.INFO, "info"],
    [NotificationType.SUCCESS, "success"],
    [NotificationType.WARNING, "warning"],
    [NotificationType.ERROR, "error"],
]);

const icons: ReadonlyMap<NotificationType, string> = new Map([
    [NotificationType.INFO, "mdi-information-variant-circle"],
    [NotificationType.SUCCESS, "mdi-check-circle"],
    [NotificationType.WARNING, "mdi-alert-circle"],
    [NotificationType.ERROR, "mdi-close-circle"],
]);

defineProps<{
    theme: string;
}>();

const { notificationStore } = injectStore();
const { currentNotification, dismissCurrentNotification } = notificationStore;
const show = ref(false);

watchEffect(() => (show.value = unref(currentNotification) !== undefined));

watchEffect(() => {
    if (unref(show) === false) {
        nextTick().then(() => dismissCurrentNotification());
    }
});

const colour = computed<string | undefined>((existingColour) => {
    const type = unref(currentNotification)?.type;
    return type !== undefined && colours.has(type) ? colours.get(type) : existingColour;
});

const icon = computed<string | undefined>((existingIcon) => {
    const type = unref(currentNotification)?.type;
    return type !== undefined && icons.has(type) ? icons.get(type) : existingIcon;
});
</script>

<style scoped lang="scss">
.notification {
    cursor: pointer !important;
}
.notification-exception {
    font-size: smaller;
}
.notification-text {
    font-size: medium;
}
</style>
