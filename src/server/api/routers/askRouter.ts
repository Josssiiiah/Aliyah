import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { PineconeStore } from "langchain/vectorstores";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { PineconeClient } from "@pinecone-database/pinecone";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAI } from "langchain/llms";

export const askRouter = createTRPCRouter({
  answer: publicProcedure
    .input(z.object({ question: z.string() }))
    .query(async ({ input }) => {
      const pinecone = new PineconeClient();
      await pinecone.init({
        apiKey: process.env.PINECONE_API_KEY,
        environment: process.env.PINECONE_ENVIRONMENT,
      });

      const index = pinecone.Index("aliyah");
      const vectorStore = await PineconeStore.fromExistingIndex(
        index,
        new OpenAIEmbeddings()
      );

      const model = new OpenAI();
      const chain = VectorDBQAChain.fromLLM(model, vectorStore);
      const response = await chain.call({
        query: input.question,
      });

      return response;
    }),
  sources: protectedProcedure
    .input(z.object({ question: z.string() }))
    .query(async ({ input }) => {
      const pinecone = new PineconeClient();
      await pinecone.init({
        apiKey: process.env.PINECONE_API_KEY,
        environment: process.env.PINECONE_ENVIRONMENT,
      });

      const index = pinecone.Index("aliyah");
      const vectorStore = await PineconeStore.fromExistingIndex(
        index,
        new OpenAIEmbeddings()
      );

      const response = await vectorStore.similaritySearchWithScore(
        input.question,
        1
      );

      return response;
    }),
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.session.user;
  }),
});
