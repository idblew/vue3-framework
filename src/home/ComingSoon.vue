<template>
    <v-card
        class="d-flex flex-nowrap justify-space-between"
        :color="color"
        height="100"
        location="center"
        width="300"
    >
        <div>
            <v-card-title class="text-h5">{{ message }}</v-card-title>
            <v-card-actions>
                <v-btn prepend-icon="mdi-home-outline" text="Return home" :to="{ name: 'Home' }" />
            </v-card-actions>
        </div>
        <v-avatar size="96">
            <v-icon icon="mdi-hammer-wrench" size="96" />
        </v-avatar>
    </v-card>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        message?: string;
        color?: string;
    }>(),
    {
        message: "coming soon",
        color: "secondary",
    },
);
</script>
