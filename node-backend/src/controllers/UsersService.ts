import { DatabaseService } from './DatabaseService';
import { User } from '../models/User';

export class UserService {
	private databaseService: DatabaseService;

	constructor() {
		this.databaseService = new DatabaseService();
	}

	async findUserByWalletAddress(walletAddress: string): Promise<User | null> {
		const connection = await this.databaseService.connect();

		const collection = connection.getCollection('users');

		return collection.findOne<User>({ walletAddress });
	}

	async createUserWithWalletAddress(walletAddress: string): Promise<User> {
		const existingUser = await this.findUserByWalletAddress(walletAddress);

		if (existingUser) {
			return existingUser;
		}

		const connection = await this.databaseService.connect();

		const collection = connection.getCollection('users');

		await collection.insertOne({ walletAddress }).catch((err) => {
			throw new Error(`Fatal while creating new user: ${err}`);
		});

		const newUser = await this.findUserByWalletAddress(walletAddress);

		if (!newUser) {
			throw new Error(`Fatal while creating new user. User not created`);
		}

		return newUser;
	}
}
