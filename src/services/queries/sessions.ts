import type { Session } from '$services/types';
import { sessionsKey } from '$services/keys';
import { client } from '$services/redis';

export const getSession = async (id: string) => {
	const session = await client.hGetAll(sessionsKey(id));
	console.log('session', session);
	if (!!!Object.keys(session).length) {
		return null;
	}
	return deSerialize(id, session);
};

export const saveSession = async (session: Session) => {
	return client.hSet(sessionsKey(session.id), serialize(session));
};

const serialize = (session: Session) => {
	return {
		userId: session.userId,
		username: session.username
	};
};

const deSerialize = (sessionId: string, session: { [key: string]: string }) => {
	return {
		userId: session.userId,
		username: session.username,
		id: sessionId
	};
};
