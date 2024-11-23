<template>
    <v-progress-circular class="centered" :size="50" :width="5" indeterminate="disable-shrink" />
</template>

<style lang="scss" scoped>
.centered {
    top: calc((100% - 50px) / 2);
    left: calc((100% - 50px) / 2);
}
</style>
