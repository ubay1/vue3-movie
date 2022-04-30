<template>
	<div class="flex justify-center items-center mt-8">
		<div class="mb-6 w-full mx-4 sm:mx-10">
			<div
				class="bg-white border border-gray-300 shadow-dark-200 rounded-lg dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 flex p-2"
			>
				<input
					type="text"
					id="form-search-movie"
					class="text-gray-900 text-sm w-full p-2.5 focus:outline-transparent"
					placeholder="Search movie .."
					v-model="search"
				/>
				<button
					@click="onCLickSearch"
					class="bg-red-500 py-2 px-4 rounded-lg text-white"
				>
					Search
				</button>
			</div>
		</div>
	</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, toRefs, onMounted, watch } from "vue";

export default {
	// components: {}
	props: {},
	setup(props, context) {
		const search = ref(null);
		//const titles = toRefs(props.title);
		/* -------------------------------------------------------------------------- */
		/*                                 lifecycle                                  */
		/* -------------------------------------------------------------------------- */
		// onMounted(() => console.log("onMounted run.."));
		/* -------------------------------------------------------------------------- */
		/*                                   method                                   */
		/* -------------------------------------------------------------------------- */
		const onCLickSearch = () => {
			context.emit("search", search.value);
		};
		/* -------------------------------------------------------------------------- */
		/*                                 computed                                   */
		/* -------------------------------------------------------------------------- */
		//const compCount = computed(() => {
		//	return count.value + 2;
		//});
		/* -------------------------------------------------------------------------- */
		/*                                 watcher                                    */
		/* -------------------------------------------------------------------------- */
		// eslint-disable-next-line no-undef
		//watch(
		//	() => count.value,
		//		(currCount, prevCount) => {
		//		console.log(currCount, prevCount);
		//	}
		//);
		return {
			search,
			onCLickSearch,
		};
	},
};
</script>
