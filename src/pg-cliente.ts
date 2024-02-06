import { Client } from 'pg';

class PGClient {
  private static instance: Client | null = null;

  private constructor() {}

  public static getInstance(): Client {
    if (!PGClient.instance) {
      PGClient.instance = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'test_seidor',
        password: 'postgre',
        port: 5432,
      });
      PGClient.instance.connect();
    }

    return PGClient.instance;
  }

  public static endInstance(): void {
    if (PGClient.instance) {
      PGClient.instance.end();
    }
  }
}

export default PGClient;
