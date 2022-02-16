<script setup>
import { RouterView } from "vue-router";
</script>

<template>
	<component :is="this.$route.meta.layout || 'div'">
		<router-view />
	</component>
</template>

<style></style>
