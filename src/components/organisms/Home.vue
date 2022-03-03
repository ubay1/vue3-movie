<template>
		<LayoutDefault>
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
							<LoadingMovie mBottom="mb-2"/>
						</template>
					</Suspense>
				</div>
			</div>
		</LayoutDefault>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, toRefs, onMounted } from "vue";
import LayoutDefault from "@/layouts/Default.vue";
import ListGenre from "../molecules/Home/Genre.vue";
import PopulerMovie from "../molecules/Home/PopulerMovie.vue";
import PopulerTv from "../molecules/Home/PopulerTv.vue";
import LoadingGenre from "../molecules/Home/loading/LoadingGenre.vue";
import LoadingMovie from "../molecules/Home/loading/LoadingMovie.vue";

export default {
    components: {
			LayoutDefault,
			ListGenre,
			PopulerMovie,
			PopulerTv,
			LoadingGenre,
			LoadingMovie
		},
    setup() {
        return {};
    },
};
</script>
