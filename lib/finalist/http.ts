/* Wraps a route handler so unexpected errors come back as JSON, never an empty 500.
   Missing env vars are named (useful while setting up); other details stay in the server log. */
export function withErrors<A extends unknown[]>(handler: (...args: A) => Promise<Response>) {
  return async (...args: A): Promise<Response> => {
    try {
      return await handler(...args);
    } catch (err) {
      console.error("[finalist] route error", err);
      const msg = err instanceof Error ? err.message : "";
      const missing = msg.startsWith("Missing environment variable");
      const dbDown = /ECONNREFUSED|ENOTFOUND|ETIMEDOUT|password authentication|relation .* does not exist/i.test(msg);
      const error = missing
        ? `Server not configured: ${msg.replace("Missing environment variable: ", "")} is not set in .env.local`
        : dbDown
          ? "Database unavailable or not set up (check DATABASE_URL and that db/schema.sql was run)."
          : "Something went wrong on the server. Please try again.";
      return Response.json({ error }, { status: missing || dbDown ? 503 : 500 });
    }
  };
}
