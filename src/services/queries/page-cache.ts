import { client } from '$services/redis/client';
import { pageCacheKey } from '$services/keys';

// the name of the routes we want to cache
const cacheRoutes = ['/about', '/privacy', '/auth/signin', '/auth/signup'];

export const getCachedPage = (route: string): Promise<string> | null => {
	if (cacheRoutes.includes(route)) {
		// get the cached versoin of the page
		const result = client.get(pageCacheKey(route));
		return result;
	}
	return null;
};

export const setCachedPage = (route: string, page: string): Promise<string> | null => {
	if (!cacheRoutes.includes(route)) return null;
	const result = client.set(pageCacheKey(route), page, {
		EX: 5 // expiration time in seconds
	});
	return result;
};
