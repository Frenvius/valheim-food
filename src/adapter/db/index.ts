import mysql from "serverless-mysql";

export const conn = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: parseInt(process.env.MYSQL_PORT || "3306"),
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_NAME,
    charset: "utf8mb4_unicode_ci",
  },
});

export async function query<T = unknown>(
  q: string,
  values?: unknown[]
): Promise<T> {
  try {
    const results = await conn.query<T>(q, values);
    await conn.end();
    return results;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Database error");
  }
}
