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

			return fetcher
				.get(`/genre/movie/list?api_key=${apiKey}&language=${language}`)
				.then((response) => response)
				.catch((error) => {
					console.log(error);
					return null;
				});
		},

		getListPopulerMovie: ({ language, page }) => {
			const fetcher = createAxios();

			return fetcher
				.get(
					`/movie/popular?api_key=${apiKey}&language=${language}&page=${page}`
				)
				.then((response) => response)
				.catch((error) => {
					console.log(error);
					return null;
				});
		},

		getDetailMovie: ({ language, movieId }) => {
			const fetcher = createAxios();

			return fetcher
				.get(`/movie/${movieId}?api_key=${apiKey}&language=${language}`)
				.then((response) => response)
				.catch((error) => {
					console.log(error);
					return null;
				});
		},

		getVideosFromMovie: ({ language, movieId }) => {
			const fetcher = createAxios();

			return fetcher
				.get(`/movie/${movieId}/videos?api_key=${apiKey}&language=${language}`)
				.then((response) => response)
				.catch((error) => {
					console.log(error);
					return null;
				});
		},
	};

	return apis;
};