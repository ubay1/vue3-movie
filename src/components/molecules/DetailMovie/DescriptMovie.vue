<template>
	<div class="my-3">
		<hr />
		<div class="mt-3">
			<LoaderCircle
				v-if="isLoadingListVideo"
				:is-loading="isLoadingListVideo"
			/>
			<div v-else>
				<div class="text-lg font-bold mb-3">{{ dataMovie.title }}</div>
				<div class="flex flex-col md:flex-row gap-4">
					<div class="w-1/2 m-auto sm:w-2/5 md:w-1/5 md:m-0 lg:w-1/5 lg:m-0">
						<img
							:src="thumbnailImagePoster()"
							alt="backdrop-image-movie"
							class="h-full w-full object-cover pointer-events-none"
						/>
					</div>
					<div class="w-full md:w-2/3">
						<div class="flex flex-col gap-2">
							<div class="grid-container-title">
								<div class="title font-bold">Country:</div>
								<div class="flex gap-x-2 flex-wrap">
									<div
										v-for="(item, index) in dataMovie.production_countries"
										:key="`dataProductionCountry - ${index}`"
									>
										{{
											`${item.name}${checkCommaOrPoint(
												dataMovie.production_countries.length,
												index
											)}`
										}}
									</div>
								</div>
							</div>
							<div class="grid-container-title">
								<div class="title font-bold">Genres:</div>
								<div class="flex gap-x-2 flex-wrap">
									<div
										v-for="(item, index) in dataMovie.genres"
										:key="`dataGenreFilm - ${index}`"
									>
										{{
											`${item.name}${checkCommaOrPoint(
												dataMovie.genres.length,
												index
											)}`
										}}
									</div>
								</div>
							</div>
							<div class="grid-container-title">
								<div class="title font-bold">Release:</div>
								<div>{{ checkReleaseDate(dataMovie) }}</div>
							</div>
							<div class="grid-container-title">
								<div class="title font-bold">Budget:</div>
								<div>{{ checkBudget(dataMovie) }}</div>
							</div>
							<div class="grid-container-title">
								<div class="title font-bold">Synopsis:</div>
								<div>{{ dataMovie.overview }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import LoaderCircle from "../../atoms/loader/LoaderCircle.vue";
import { formatCurrency } from "../../../utils/currency";


export default {
	components: { LoaderCircle },
	props: {
		isLoadingListVideo: {
			type: Boolean,
		},
		dataMovie: {
			type: Object,
		},
		posterImageMovie: {
			type: String,
		}
	},
	setup(props) {
		/* -------------------------------------------------------------------------- */
		/*                                  computed                                  */
		/* -------------------------------------------------------------------------- */
		/* -------------------------------------------------------------------------- */
		/*                                   method                                   */
		/* -------------------------------------------------------------------------- */
		const thumbnailImagePoster = () => {
			if (![null, "", undefined].includes(props.posterImageMovie)) {
				return `${import.meta.env.VITE_BACKDROP_IMAGE_URL}w780${props.posterImageMovie}`;
			} else {
				return `https://agent1.pk/images/uploads/img.jpg`;
			}
		};

		const checkReleaseDate = (data) => {
			if(["",null, undefined].includes(data.release_date)) {
				return data.first_air_date
			 } else {
				return data.release_date
			 }
		}

		const checkBudget = (data) => {
			if(["",null, undefined].includes(data.budget)) {
				return "-";
			} else {
				return formatCurrency(data.budget)
			}
		}

		const checkCommaOrPoint = (dataLength, index) => {
			return dataLength > 1 && index !== dataLength - 1 ? "," : ".";
		};

		return {
			thumbnailImagePoster,
			checkCommaOrPoint,
			formatCurrency,
			checkReleaseDate,
			checkBudget,
		}
	},
};
</script>
