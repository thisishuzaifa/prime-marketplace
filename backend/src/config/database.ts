import mysql from 'mysql2/promise';
import { config } from 'dotenv';

config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const query = async <T>(sql: string, params: any[] = []): Promise<T> => {
  const [rows] = await pool.execute(sql, params);
  return rows as T;
};

export const transaction = async <T>(
  callback: (connection: mysql.Connection) => Promise<T>
): Promise<T> => {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}; 