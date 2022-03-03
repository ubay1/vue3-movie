<template>
	<HomeOrganisms />
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { onBeforeMount, defineAsyncComponent, onMounted, onUnmounted, reactive, ref, onErrorCaptured } from "vue";
import HomeOrganisms from "@/components/organisms/Home.vue";

export default {
	components: {
		HomeOrganisms
	},
	setup() {
		
		return {
			
		};
	},
};
</script>

<style>
.display-movie {
	display: grid;
	grid-template-columns: 200px;
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

@media (min-width: 0px) and (max-width: 767.9px) {
	.list-genre-carousel {
		display: none;
	}
}
/* .carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color:  var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
} */

.carousel__slide {
  padding: 10px;
}

.carousel__prev--in-active {
	opacity: 0;
	left: 50px !important;
	cursor: default;
	z-index: -10;
}
.carousel__next--in-active {
	opacity: 0;
	right: 50px !important;
	cursor: default;
	z-index: -10;
}

.carousel__prev {
	left: 20px;
	border: unset !important;
	background: #fff;
	padding: 5px;
	transition: all 0.5s cubic-bezier(0.2, 0.64, 0.21, 1) 0s;
	box-sizing: content-box;
	box-shadow: 0px 2px 4px gray;
}
.carousel__next {
	right: 20px;
	border: unset;
	background: #fff;
	padding: 5px;
	transition: all 0.5s cubic-bezier(0.2, 0.64, 0.21, 1) 0s;
	box-sizing: content-box;
	box-shadow: 0px 2px 4px gray;
}
.carousel__icon {
	fill: #000 !important;
}
</style>
