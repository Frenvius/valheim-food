import mysql from "serverless-mysql";

function parseDbUrl(url: string) {
  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    port: parseInt(parsed.port || "3306"),
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: parsed.pathname.replace(/^\//, ""),
  };
}

export const conn = mysql({
  config: {
    ...parseDbUrl(process.env.DATABASE_URL!),
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
