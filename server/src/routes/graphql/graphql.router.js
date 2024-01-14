const { ApolloServer } = require("apollo-server-express");

const { schema } = require("../../models/graphql.model");

async function startApolloServer() {
  const server = new ApolloServer({
    schema,
  });
  await server.start();
  console.log("Apollo server started");
  return server;
}

module.exports = startApolloServer;
