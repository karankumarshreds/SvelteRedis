import { usersKey } from '$services/keys';
import type { CreateUserAttrs } from '$services/types';
import { genId } from '$services/utils';
import { client } from '$services/redis/client';

export const getUserByUsername = async (username: string) => {};

export const getUserById = async (id: string) => {
	const user = await client.hGetAll(usersKey(id));
	return deSerialize(user, id);
};

export const createUser = async (attrs: CreateUserAttrs): Promise<string> => {
	const userId = genId();
	await client.hSet(usersKey(userId), serialize(attrs));
	return userId;
};

const serialize = (user: CreateUserAttrs) => {
	return {
		username: user.username,
		password: user.password
	};
};

const deSerialize = (user: { [key: string]: string }, id: string) => {
	return { ...user, id };
};
