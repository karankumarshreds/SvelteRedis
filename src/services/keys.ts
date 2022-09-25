export const pageCacheKey = (id: string) => {
	return `pagecache${id}`;
};

export const usersKey = (id: string) => {
	return `user#${id}`;
};

export const sessionsKey = (sessionId: string) => {
	return `sessions#${sessionId}`;
};

export const itemsKey = (itemId: string) => {
	return `item#${itemId}`;
};
