import { ref } from "vue";
/* eslint-disable no-unused-vars */
import axiosDefault from "axios";

export default (baseUrl, apiKey) => {
	const createAxios = () =>
		axiosDefault.create({
			baseURL: baseUrl,
		});

	const apis = {
		getListPopulerTv: ({ language, page }) => {
			const fetcher = createAxios();

			return new Promise(async (resolve, reject) => {
				try {
					// setTimeout(async () => {
						resolve(
							await fetcher.get(`/tv/popular?api_key=${apiKey}&language=${language}&page=${page}`)
						);
					// },5000);
				} catch (error) {
					console.log(error);
					reject(error);
				}
			});

			// return fetcher
			// 	.then((response) => response)
			// 	.catch((error) => {
			// 		console.log(error);
			// 		return null;
			// 	});
		},

		getDetailTv: ({ language, tvId }) => {
			const fetcher = createAxios();

			return new Promise(async (resolve, reject) => {
				try {
					const response = 	await fetcher.get(`/tv/${tvId}?api_key=${apiKey}&language=${language}`)
					resolve(response)
				} catch (error) {
					console.log(error);
					reject(error);
				}
			});
			// return fetcher
			// 	.then((response) => response)
			// 	.catch((error) => {
			// 		console.log(error);
			// 		return null;
			// 	});
		},

		getImagesFromTv: ({ tvId, language, include_image_language }) => {
			const fetcher = createAxios();
			
			return new Promise(async (resolve, reject) => {
				try {
					const response = 	await fetcher.get(
						`/tv/${tvId}/images?api_key=${apiKey}&language=${language}&include_image_language=${include_image_language}`
					)
					resolve(response)
				} catch (error) {
					console.log(error);
					reject(error);
				}
			});

			// return fetcher
			// 	.then((response) => response)
			// 	.catch((error) => {
			// 		console.log(error);
			// 		return null;
			// 	});
		},

		getVideosFromTv: ({ language, tvId }) => {
			const fetcher = createAxios();

			return new Promise(async (resolve, reject) => {
				try {
					const response = 	await fetcher.get(`/tv/${tvId}/videos?api_key=${apiKey}&language=${language}`)
					resolve(response)
				} catch (error) {
					console.log(error);
					reject(error);
				}
			});

			// return fetcher
			// 	.then((response) => response)
			// 	.catch((error) => {
			// 		console.log(error);
			// 		return null;
			// 	});
		},
	};

	return apis;
};
