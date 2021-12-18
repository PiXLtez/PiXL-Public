// External Dependencies
import * as mongoDB from 'mongodb';

export class DatabaseService {
	private client: mongoDB.MongoClient;
	private db: mongoDB.Db;

	constructor() {
		const connectionString = process.env.DB_CONN_STRING as string;

		this.client = new mongoDB.MongoClient(connectionString);
	}

	async connect(): Promise<DatabaseService> {
		if (!this.client) {
			throw new Error('Connect called before instantiation of class!');
		}

		await this.client.connect();

		const dbName = process.env.DB_NAME;

		if (dbName) {
			this.db = this.client.db(dbName);
		}

		return this;
	}

	selectDb(dbName?: string): DatabaseService {
		if (!dbName) {
			dbName = process.env.DB_NAME;
		}

		this.db = this.client.db(dbName);

		return this;
	}

	getCollection(collectionName: string): mongoDB.Collection {
		return this.db.collection(collectionName);
	}
}
