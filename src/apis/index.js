import movie from "./movie";

export default (baseUrl, apiKey) => ({
	movie: movie(baseUrl, apiKey),
});
