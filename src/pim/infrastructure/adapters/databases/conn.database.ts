import { Collection, Db, Document, MongoClient } from 'mongodb';
import { ICollections } from '../../../core';
import { getEnvVariableValue } from '../../utils/envVariableValidator.util';

export class Database {
  private static instance: Database;
  private client: MongoClient;
  private db: Db;

  constructor() {
    this.client = new MongoClient(getEnvVariableValue('DATABASE_URL'));
    this.db = this.client.db();
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db('pim');
  }

  getCollection<T extends Document>(collectionName: keyof ICollections): Collection<T> {
    return this.db.collection<T>(collectionName);
  }

  static getInstance(): Database {
    if (!Database.instance) Database.instance = new Database();

    return Database.instance;
  }
}
