
const logger = require('morgan');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require("./src/graphql/schemas/schema");
const resolvers = require("./src/graphql/resolvers");
const connectDB = require("./src/config/db");

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 4000;
const ENV = process.env.NODE_ENV || 'development';

app.use(logger('dev'));
app.use(express.json());

connectDB();

const server = new ApolloServer(
    {
      typeDefs,
      resolvers ,
        context: ({ req }) => {
            return { headers: req.headers };
        },
        formatError: (err) => {
            return err.message;

        },
    }
);
server.start().then(() => {
  server.applyMiddleware({ app });
  const baseUrl = ENV === 'production'
      ? `https://${process.env.HOST || 'your-production-domain.com'}`
      : `http://localhost:${PORT}`;

  console.log(`GraphQL API available at ${baseUrl}${server.graphqlPath}`);
});

module.exports = app;


