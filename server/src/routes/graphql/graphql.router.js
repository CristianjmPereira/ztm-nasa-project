const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { schema } = require("../../models/graphql.model");

const graphqlConfig = graphqlHTTP({
  schema: schema,
  graphiql: true,
});

module.exports = graphqlConfig;
