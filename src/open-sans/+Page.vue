<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import GenericPage from "../GenericPage.vue";
</script>

<template>
    <GenericPage
        identifier="Open Sans"
        styleName="open-sans"
        sourceUrl="https://fonts.google.com/specimen/Open+Sans"
    />
</template>

<style>
.open-sans {
    font-family: "Open Sans", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-variation-settings: "wdth" 100;
}
</style>
