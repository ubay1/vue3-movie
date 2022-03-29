<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
</script>

<template>
	<component :is="layout">
		<router-view></router-view>
		<!-- <router-view v-slot="{ Component }">
			<keep-alive>
				<component :is="Component" />
			</keep-alive>
		</router-view> -->
	</component>
</template>

<script>
import { onMounted } from "vue";
export default {
	computed: {
		isKeepAlive() {
			return this.$route.meta.keepAlive;
		},
		layout() {
			return this.$route.meta.layout;
		},
	},
	setup() {
		onMounted(() => {
			console.log(this.$route.meta);
		});

		return {};
	},
};
</script>

<style></style>
