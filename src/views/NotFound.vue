<template>
	<Error>
		<Head>
			<title>page not found | {{ title }}</title>
			<base href="/base" />
		</Head>
		<div class="flex flex-col justify-center items-center">
			<img
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTazApMEHG8rfAMQEufM9B4bsjou-0beSiuYfYbyIJfXHodyzXqnP0FugKhfTgD6bsGWKw&usqp=CAU"
				alt=""
				class="pointer-events-none"
			/>
			<div class="text-white">Page not found</div>
		</div>
	</Error>
</template>

<script setup>
import { ref } from "vue";
import Error from "../layouts/Error.vue";
import { Head } from "@vueuse/head";

// eslint-disable-next-line no-unused-vars
const title = ref(import.meta.env.VITE_TITLE);
</script>
