<template>
	<div class="px-2 sm:px-6 lg:px-8">
		<div class="flex flex-col">
			<Suspense>
				<template #default>
					<ListGenre />
				</template>
				<template #fallback>
					<LoadingGenre />
				</template>
			</Suspense>
			<Suspense>
				<template #default>
					<PopulerMovie />
				</template>
				<template #fallback>
					<LoadingMovie />
				</template>
			</Suspense>
			<Suspense>
				<template #default>
					<PopulerTv />
				</template>
				<template #fallback>
					<LoadingMovie mBottom="mb-2" />
				</template>
			</Suspense>
		</div>
	</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, toRefs, onMounted, onBeforeUnmount } from "vue";
import ListGenre from "../molecules/Home/Genre.vue";
import PopulerMovie from "../molecules/Home/PopulerMovie.vue";
import PopulerTv from "../molecules/Home/PopulerTv.vue";
import LoadingGenre from "../molecules/Home/loading/LoadingGenre.vue";
import LoadingMovie from "../molecules/Home/loading/LoadingMovie.vue";

export default {
	components: {
		ListGenre,
		PopulerMovie,
		PopulerTv,
		LoadingGenre,
		LoadingMovie,
	},
	setup() {
		onMounted(() => {
			const currPos = localStorage.getItem("scrollVerticalPositionHome");
			window.scrollTo({ left: 0, top: currPos, behavior: "smooth" });
			window.addEventListener("scroll", handleScroll);
		});

		const handleScroll = () => {
			localStorage.setItem("scrollVerticalPositionHome", window.scrollY);
		};

		onBeforeUnmount(() => {
			window.removeEventListener("scroll", handleScroll);
		});

		return {};
	},
};
</script>
