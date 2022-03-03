<template>
	<div>
		<div class="mt-6 mb-8 hidden md:block">
			<Carousel :breakpoints="breakpointsListGenre">
				<Slide 
					v-for="(item, index) in dataListGenre"
					:key="`list-genre ${index}`"
				>
					<div
						class="w-full h-full cursor-pointer bg-gray-600 hover:bg-gray-700 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-gray-800 p-2 rounded-md whitespace-nowrap text-ellipsis overflow-hidden"
					>
						{{ item.name }}
					</div>
				</Slide>

				<template #addons>
					<Navigation />
				</template>
			</Carousel>
		</div>
		<div class="flex justify-center items-center mt-6 mb-8 md:hidden">
			<div class="flex overflow-x-auto">
				<div
					v-for="(item, index) in dataListGenre"
					:key="`list-genre ${index}`"
				>
					<div
						class="flex justify-center items-center cursor-pointer bg-gray-600 hover:bg-gray-700 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-gray-800 p-2 rounded-md mr-2 mb-2 whitespace-nowrap text-ellipsis overflow-hidden"
					>
						{{ item.name }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, toRefs, onMounted } from "vue";
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import Api from "@/apis";

export default {
	components: {
		Carousel,
    Slide,
    Navigation,
	},
	async setup() {
		const dataListGenre = ref();

		const breakpointsListGenre = ({
      // 700px and up
      768: {
        itemsToShow: 5,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 8,
        snapAlign: 'start',
      },
			1280: {
        itemsToShow: 10,
        snapAlign: 'start',
      },
    })

		const api = () => {
			return Api(
				import.meta.env.VITE_API_URL,
				import.meta.env.VITE_API_KEY_TMDB_V3
			);
		};

		const getListGenre = await api().movie.getListGenre({
			language: "en-US",
		});

		console.log(getListGenre);

		dataListGenre.value = getListGenre.data.genres;

		return {
			dataListGenre,
			breakpointsListGenre,
		};
	},
};
</script>

<style>

</style>
