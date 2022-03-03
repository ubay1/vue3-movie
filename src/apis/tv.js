import { ref } from "vue";
/* eslint-disable no-unused-vars */
import axiosDefault from "axios";

export default (baseUrl, apiKey) => {
	const createAxios = () =>
		axiosDefault.create({
			baseURL: baseUrl,
		});

	const apis = {
		getListGenre: ({ language }) => {
			const fetcher = createAxios();

			return new Promise((resolve, reject) => {
				try {
					setTimeout(async () => {
						resolve(
							await fetcher.get(
								`/genre/movie/list?api_key=${apiKey}&language=${language}`
							)
						);
					},3000);
				} catch (error) {
					console.log(error);
					reject(error);
				}
			});
		},

		getPopulerTvSeries: ({ language, page }) => {
			const fetcher = createAxios();

			return new Promise((resolve, reject) => {
				try {
					setTimeout(async () => {
						resolve(
							await fetcher.get(
								`/tv/popular?api_key=${apiKey}&language=${language}&page=${page}`
							)
						);
					},3000);
				} catch (error) {
					console.log(error);
					reject(error);
				}
			});
		},

		getPopulerMovieSeries: ({ language, page }) => {
			const fetcher = createAxios();

			return new Promise((resolve, reject) => {
				try {
					setTimeout(async () => {
						resolve(
							await fetcher.get(
								`/movie/popular?api_key=${apiKey}&language=${language}&page=${page}`
							)
						);
					}, 0);
				} catch (error) {
					console.log(error);
					reject(error);
				}
			});

			// return fetcher
			// 	.get(`/tv/popular?api_key=${apiKey}&language=${language}&page=${page}`)
			// 	.then((response) => response)
			// 	.catch((error) => {
			// 		console.log(error);
			// 		return null;
			// 	});
		},
	};

	return apis;
};

// export default async function useBerries() {
//   const fetchBerries = () => {
//     return new Promise((resolve) => {
//       setTimeout(async () => {
//         resolve((await fetch("https://pokeapi.co/api/v2/berry/")).json());
//       }, 2000);
//     });
//   };

//   const berries = ref();
//   berries.value = await fetchBerries();

//   return berries;
// }
