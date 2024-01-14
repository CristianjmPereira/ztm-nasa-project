const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { mergeResolvers } = require("@graphql-tools/merge");

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

const resolvers = mergeResolvers(resolversArray);

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers,
});

const root = {
  launches: require("./graphqlSchemas/launches.model"),
  planets: require("./graphqlSchemas/planets.model"),
};

module.exports = {
  schema,
  root,
};
