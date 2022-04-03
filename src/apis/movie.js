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

			return new Promise(async (resolve, reject) => {
				try {
					// setTimeout(async () => {
					resolve(
						await fetcher.get(
							`/genre/movie/list?api_key=${apiKey}&language=${language}`
						)
					);
					// },10000);
				} catch (error) {
					console.log(error);
					reject(error);
				}
			});
		},

		getListPopulerMovie: ({ language, page }) => {
			const fetcher = createAxios();

			return new Promise(async (resolve, reject) => {
				try {
					// setTimeout(async () => {
					resolve(
						await fetcher.get(
							`/movie/popular?api_key=${apiKey}&language=${language}&page=${page}`
						)
					);
					// },10000);
				} catch (error) {
					console.log(error);
					reject(error);
				}
			});
		},

		getMovieFromGenre: ({ language, page, with_genres }) => {
			const fetcher = createAxios();

			return new Promise(async (resolve, reject) => {
				try {
					// setTimeout(async () => {
					resolve(
						await fetcher.get(
							`/discover/movie?api_key=${apiKey}&language=${language}&page=${page}&with_genres=${with_genres}`
						)
					);
					// },10000);
				} catch (error) {
					console.log(error);
					reject(error);
				}
			});
		},

		getDetailMovie: ({ language, movieId }) => {
			const fetcher = createAxios();

			return new Promise(async (resolve, reject) => {
				try {
					const response = await fetcher.get(
						`/movie/${movieId}?api_key=${apiKey}&language=${language}`
					);
					resolve(response);
				} catch (error) {
					console.log(error);
					reject(error);
				}
			});

			// return fetcher
			// 	.get(`/movie/${movieId}?api_key=${apiKey}&language=${language}`)
			// 	.then((response) => response)
			// 	.catch((error) => {
			// 		console.log(error);
			// 		return null;
			// 	});
		},

		getImagesFromMovie: ({ movieId, language, include_image_language }) => {
			const fetcher = createAxios();

			return new Promise(async (resolve, reject) => {
				try {
					const response = await fetcher.get(
						`/movie/${movieId}/images?api_key=${apiKey}&language=${language}&include_image_language=${include_image_language}`
					);
					resolve(response);
				} catch (error) {
					console.log(error);
					reject(error);
				}
			});

			// return fetcher.get(`/movie/${movieId}/images?api_key=${apiKey}&language=${language}&include_image_language=${include_image_language}`)
			// 	.then((response) => response)
			// 	.catch((error) => {
			// 		console.log(error);
			// 		return null;
			// 	});
		},

		getVideosFromMovie: ({ language, movieId }) => {
			const fetcher = createAxios();

			return new Promise(async (resolve, reject) => {
				try {
					const response = await fetcher.get(
						`/movie/${movieId}/videos?api_key=${apiKey}&language=${language}`
					);
					resolve(response);
				} catch (error) {
					console.log(error);
					reject(error);
				}
			});

			// return fetcher.get(`/movie/${movieId}/videos?api_key=${apiKey}&language=${language}`)
			// 	.then((response) => response)
			// 	.catch((error) => {
			// 		console.log(error);
			// 		return null;
			// 	});
		},
	};

	return apis;
};
