import express from 'express';
import graphQLHTTP from 'express-graphql';
import Schema from './schema';

const GRAPHQL_PORT = process.env.PORT || 3000;

// Expose a GraphQL endpoint
const graphQLServer = express();
graphQLServer.use('/', graphQLHTTP({
  graphiql: true,
  pretty: true,
  schema: Schema,
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));
