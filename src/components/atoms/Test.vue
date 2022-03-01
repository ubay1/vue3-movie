<template>
	<div>
		{{names}}
	</div>
</template>

<script>
import axios from 'axios';
import {computed, onMounted, ref} from 'vue';
export default {
	setup() {
		const names = ref('ubay')
		const data = ref([]) 

		const compData = computed(() => {
			return data.value
		})

		const getApi = () => {
			axios.get('https://dog.ceo/api/breeds/image/random/3')
			.then((res) => {
				console.log(res.data.message);
				data.value = res.data.message
			}).finally(() => {
				})
		}

		onMounted(()=>{
			getApi()
		})


		return {
			names,
			compData,
		}
	}
}
</script>
