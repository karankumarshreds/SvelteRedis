import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
	await client.hSet('car', {
		color: 'red',
		year: 1950,
		engine: JSON.stringify({ cylinders: 8 })
		// owner: null,
		// service: undefined
	});

	// const car = await client.hGetAll('car');
	// console.log(await client.hGetAll('car#'));`
	console.log(await client.get('catss'));
};
run();
