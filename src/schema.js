import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  }),
});

/**
 * Query
 */
const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    whoami: {
      type: UserType,
      resolve: (source, args, context) => context.user,
    },
  }),
});

const Schema = new GraphQLSchema({
  query: Query,
});

export default Schema;
