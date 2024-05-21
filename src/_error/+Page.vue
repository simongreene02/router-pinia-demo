<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { usePageContext } from "vike-vue/usePageContext";
const pageContext = usePageContext();
let { abortReason } = pageContext;
</script>

<template>
    <h1>{{ abortReason }}</h1>
</template>
