import express from 'express';
import graphQLHTTP from 'express-graphql';
import Schema from './schema';

const GRAPHQL_PORT = process.env.PORT || 4000;

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
  /* eslint no-param-reassign:0 */
  req.session = {
    user: {
      id: '123',
      firstName: 'John',
      lastName: 'Doe',
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

/* eslint no-console:0 */
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`,
));
