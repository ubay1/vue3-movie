<template>
	<div
		id="layout-default"
		class="h-screen min-h-full bg-white text-gray-800 dark:bg-gray-700 dark:text-white"
	>
		<Navbar />
		<slot></slot>
	</div>
</template>

<script>
import { provide, reactive } from "vue";
import Navbar from "@/components/molecules/Navbar.vue";

export default {
	components: {
		Navbar,
	},
	setup() {
		const theme = reactive({
			theme: "light",
		});

		provide("settingsTheme", theme);
	},
};
</script>
