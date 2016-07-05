import { graphql } from 'graphql';
import Schema from './schema';

const runGraphQL = (event) => {
  const query = event.query;

  return graphql(Schema, query);
};

export default runGraphQL;
