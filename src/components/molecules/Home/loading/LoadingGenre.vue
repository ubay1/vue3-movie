<template>
	<div class="flex justify-center items-center mt-6 mb-8">
		<div class="flex overflow-hidden">
			<div v-for="(item, index) in 10" :key="`loading-list-genre-${index}`">
				<div
					class="shimmer-image w-24 lg:w-32 h-10 flex justify-center items-center cursor-pointer bg-gray-200 dark:bg-gray-400
					p-2 rounded-md mr-2 mb-2 whitespace-nowrap text-ellipsis overflow-hidden"
				>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	setup() {},
};
</script>
