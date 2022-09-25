import { client } from '$services/redis/client';
import { pageCacheKey } from '$services/keys';

const cacheRoutes = ['/about', '/privacy', '/auth/signin', '/auth/signup'];

// get cached page
export const getCachedPage = (route: string): Promise<string> | null => {
	if (cacheRoutes.includes(route)) {
		const result = client.get(pageCacheKey(route));
		return result;
	}
	return null;
};

// set cached page
export const setCachedPage = (route: string, page: string): Promise<string> | null => {
	if (!cacheRoutes.includes(route)) return null;
	const result = client.set(pageCacheKey(route), page, {
		EX: 5 // expiration time in seconds
	});
	return result;
};
