import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  User,
  getUser,
  getViewer,
} from './domain/user';

/**
 * Define the way we resolve an ID to its object.
 * Define the way we resolve an object to its GraphQL type.
 */
const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);

    if (type === 'User') {
      return getUser(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return UserType;

    } else {
      return null;
    }
  }
);

/**
 * Domain Types
 */
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
  }),
  interfaces: [nodeInterface],
});

/**
 * Domain Connections
 */
const {connectionType: userConnection} =
  connectionDefinitions({name: 'User', nodeType: UserType});

/**
 * Query
 */
const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,

    whoami: {
      type: UserType,
      resolve: () => getViewer(),
    },
  }),
});

/**
 * Mutation Types
 */
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // todo: Add mutations
  })
});

const Schema = new GraphQLSchema({
  query: Query,
  // todo: Uncomment the following after adding some mutation fields:
  // mutation: mutationType
});

export default Schema;
