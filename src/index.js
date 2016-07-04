import { graphql } from 'graphql';
import Schema from './schema';

const runGraphQL = (event, cb) => {
  let query = event.query;

  return graphql(Schema, query)
};

export default runGraphQL;
