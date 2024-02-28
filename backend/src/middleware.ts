import { MiddlewareHandler } from "hono";
import { verify } from "hono/jwt";

export const authenticateUser :MiddlewareHandler = async(c, next)=> {
        const header = c.req.header("authorization") || "";
        // Bearer token => ["Bearer", "token"];
        const token = header.split(" ")[1]

      	const payload = await verify(token, c.env.JWT_SECRET);
      if (!payload) {
        c.status(401);
        return c.json({ error: "unauthorized" });
      }
      c.set('userId', payload.id);
      await next()
}

