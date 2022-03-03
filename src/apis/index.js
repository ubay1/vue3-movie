import movie from "./movie";
import tv from "./tv";

export default (baseUrl, apiKey) => ({
	movie: movie(baseUrl, apiKey),
	tv: tv(baseUrl, apiKey),
});
