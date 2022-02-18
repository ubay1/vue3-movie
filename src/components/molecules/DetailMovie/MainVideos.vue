<template>
	{{ titles }}
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, toRefs, onMounted } from "vue";
export default {
	// components: {}
	props: {
		title: {
			type: String,
			default: () => {
				return "hallo ha";
			},
		},
	},
	setup(props) {
		const count = ref(0);
		const titles = toRefs(props.title);
		/* -------------------------------------------------------------------------- */
		/*                                 lifecycle                                  */
		/* -------------------------------------------------------------------------- */
		// onMounted(() => console.log("onMounted run.."));
		/* -------------------------------------------------------------------------- */
		/*                                   method                                   */
		/* -------------------------------------------------------------------------- */
		//const inc = () => {
		//	count.value++;
		//};
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
			titles,
			count,
		};
	},
};
</script>
