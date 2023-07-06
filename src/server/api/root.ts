import { createTRPCRouter } from "./trpc";
import { askRouter } from "./routers/askRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  ask: askRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
