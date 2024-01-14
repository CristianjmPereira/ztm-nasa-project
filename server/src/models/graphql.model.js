const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

const root = {
  launches: require("./graphqlSchemas/launches.model"),
  planets: require("./graphqlSchemas/planets.model"),
};

module.exports = {
  schema,
  root,
};
