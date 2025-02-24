import { ApolloServer } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { typeDefs } from "./graphql/schemas";
import { resolvers } from "./graphql/resolvers";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Create Apollo Server instance
export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ prisma }),
});
