<template>
    <v-radio-group v-model="selectedTheme" class="text-body-2" density="comfortable">
        <v-radio label="Dark" :value="Theme.DARK" />
        <v-radio label="Light" :value="Theme.LIGHT" />
        <v-radio label="System Default" :value="Theme.SYSTEM" />
    </v-radio-group>
</template>

<script setup lang="ts">
import { injectStore } from "@/Store";
import { Theme } from "@/theme/ThemeStore";

const { themeStore } = injectStore();
const { selectedTheme } = themeStore;
</script>
