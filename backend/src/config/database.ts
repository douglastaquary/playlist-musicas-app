import sqlite3 from 'sqlite3';

class Database {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(process.env.DATABASE_PATH || './database.sqlite');
    this.init();
  }

  private init(): void {
    this.db.serialize(() => {
      // Tabela de músicas
      this.db.run(`
        CREATE TABLE IF NOT EXISTS songs (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          artist TEXT,
          position INTEGER NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Tabela de usuários/admin
      this.db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'user',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Criar usuário admin padrão se não existir
      this.db.get(
        'SELECT id FROM users WHERE role = ?',
        ['admin'],
        (err, row) => {
          if (!row) {
            const bcrypt = require('bcryptjs');
            const { v4: uuidv4 } = require('uuid');
            const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', 10);
            this.db.run(
              'INSERT INTO users (id, username, password, role) VALUES (?, ?, ?, ?)',
              [uuidv4(), 'admin', hashedPassword, 'admin']
            );
          }
        }
      );
    });
  }

  getDb(): sqlite3.Database {
    return this.db;
  }

  close(): void {
    this.db.close();
  }
}

export const database = new Database();
export const db = database.getDb();

// Wrappers com Promise para facilitar o uso com async/await
export const dbRun = (sql: string, params: any[] = []): Promise<void> =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });

export const dbGet = <T = any>(sql: string, params: any[] = []): Promise<T | undefined> =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row as T | undefined);
    });
  });

export const dbAll = <T = any>(sql: string, params: any[] = []): Promise<T[]> =>
  new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows as T[]);
    });
  });

