<template>
	<div>
		<Suspense>
			<template #default>
				<ListMovie />
			</template>
			<template #fallback>
				<Loading />
			</template>
		</Suspense>
	</div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Loading from "@/components/molecules/MovieListFromGenre/Loading.vue";
import ListMovie from "@/components/molecules/MovieListFromGenre/ListMovie.vue";

export default {
	components: {
		Loading,
		ListMovie,
	},
	setup() {
		return {};
	},
};
</script>

<style>
.display-container {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 20px;
}

.display-movie {
	display: grid;
	grid-template-columns: auto !important;
}
.loadmore {
	grid-column: 3;
}

.title-movie {
	background: url("https://s8.indexmovies.xyz/wp-content/themes/dunia21/images/mask-title.png")
		center top repeat-x;
	bottom: 0;
	left: 0;
	padding: 10px 5px;
	position: absolute;
	width: 100%;
	z-index: 20;
	color: #fff;
	text-align: center;
	/* font-size: 80%; */
	font-weight: 500;
	margin: 0;
	text-shadow: 0 0 2px #000;
}
.poster-movie:hover .overlay {
	opacity: 1;
}
.overlay {
	position: absolute;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	color: #f1f1f1;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	transition: 0.5s ease;
	opacity: 0;
	color: white;
	font-size: 20px;
	padding: 20px;
	text-align: center;
	z-index: 10;
	border-radius: 0.375rem;
}
</style>
