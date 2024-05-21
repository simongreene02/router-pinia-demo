<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    parentIdentifier: String,
    name: String,
    location: String,
});
</script>

<template>
    <v-list-item
        v-if="parentIdentifier != name"
        :title="name"
        :href="location"
    />
</template>
