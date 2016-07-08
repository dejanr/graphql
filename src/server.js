import express from 'express';
import graphQLHTTP from 'express-graphql';
import Schema from './schema';

const GRAPHQL_PORT = process.env.PORT || 4000;

// Expose a GraphQL endpoint
const graphQLServer = express();

graphQLServer.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

graphQLServer.options('*', (req, res) => {
  res.status(200).end();
});

// moch session middleware
graphQLServer.use((req, resp, next) => {
  req.session = {
    user: {
      id: '123',
      firstName: 'John',
      lastName: 'Doe',
    },
    merchant: {
      id: '3b8ff49e-7a83-4172-9e5d-f5c16eb10ea0',
      name: 'Hair Studio',
    },
  };
  next();
});

graphQLServer.use('/', graphQLHTTP(request => ({
  graphiql: true,
  pretty: true,
  schema: Schema,
  context: request.session,
})));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));
