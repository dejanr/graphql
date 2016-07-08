import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import appointments from './domain/appointments';
import setup from './domain/setup';

/**
 * Domain Types
 */
const AppointmentType = new GraphQLObjectType({
  name: 'Appointment',
  description: 'Merchant appointment',
  fields: () => ({
    id: { type: GraphQLString },
    event_type: { type: GraphQLString },
    color: { type: GraphQLString },
    start: { type: GraphQLString },
    end: { type: GraphQLString },
    duration: {
      type: GraphQLInt,
    },
    steps: {
      type: new GraphQLList(StepType),
    },
    resources: {
      type: new GraphQLList(ResourceType),
      resolve: (source) =>
        setup.resources.filter(
          resource => source.resource_ids.find(id => id === resource.id)
        ),
    },
  }),
});

const StepType = new GraphQLObjectType({
  name: 'Step',
  description: 'Service step',
  fields: () => ({
    type: { type: GraphQLString },
    duration: { type: GraphQLInt },
    name: { type: GraphQLString },
    resource: {
      type: ResourceType,
    },
  }),
});

const ResourceType = new GraphQLObjectType({
  name: 'Resource',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    services: {
      type: new GraphQLList(ServiceType),
      args: {
        offset: {
          type: GraphQLInt,
          description: 'Offset the appointments returing',
        },
        limit: {
          type: GraphQLInt,
          description: 'Limit the appointments returing',
        },
      },
      resolve: (source, { offset, limit } = {}) => {
        const data = setup.services.filter(
          service => source.service_ids.find(id => id === service.id)
        );

        if (!offset && limit > 0) {
          return data.slice(0, limit);
        }

        if (offset > 0) {
          return data.slice(
            offset,
            offset + (limit || data.length)
          );
        }

        return data;
      },
    },
  }),
});

const ServiceType = new GraphQLObjectType({
  name: 'Service',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    position: { type: GraphQLInt },
    is_combinable: { type: GraphQLBoolean },
    resources: {
      type: new GraphQLList(ResourceType),
      resolve: (source) =>
        setup.resources.filter(
          resource => source.resource_ids.find(id => id === resource.id)
        ),
    },
    price: { type: GraphQLInt },
    price_currency: { type: GraphQLString },
    price_cents: { type: GraphQLInt },
    category: {
      type: ServiceCategoryType,
      resolve: (source) =>
        setup.service_categories.find(
          category => category.id === source.service_category_id
        ),
    },
  }),
});

const ServiceCategoryType = new GraphQLObjectType({
  name: 'ServiceCategory',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

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

    appointment: {
      type: AppointmentType,
      description: 'Merchant appointments',
      args: {
        id: { type: GraphQLID },
      },
      resolve: (source, { id } = {}) => {
        if (!id) {
          return null;
        }

        return appointments.appointments.find(appointment => appointment.id === id);
      },

    },

    appointments: {
      type: new GraphQLList(AppointmentType),
      description: 'Merchant appointments',
      args: {
        offset: {
          type: GraphQLInt,
          description: 'Offset the appointments returing',
        },
        limit: {
          type: GraphQLInt,
          description: 'Limit the appointments returing',
        },
      },
      resolve: (source, { offset, limit } = {}) => {
        if (!offset && limit > 0) {
          return appointments.appointments.slice(0, limit);
        }

        if (offset > 0) {
          return appointments.appointments.slice(
            offset,
            offset + (limit || appointments.appointments.length)
          );
        }

        return appointments.appointments;
      },
    },

    latestAppointment: {
      type: AppointmentType,
      description: 'Last created appointment',
      resolve: () => appointments.appointments[appointments.appointments.length - 1],
    },

    services: {
      type: new GraphQLList(ServiceType),
      description: 'Merchant services',
      resolve: () => setup.services,
    },

    resources: {
      type: new GraphQLList(ResourceType),
      description: 'Merchant resources',
      resolve: () => setup.resources,
    },
  }),
});

/**
 * Mutation Types
 */
// const mutationType = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: () => ({
//     // todo: Add mutations
//   }),
// });

const Schema = new GraphQLSchema({
  query: Query,
  // todo: Uncomment the following after adding some mutation fields:
  // mutation: mutationType,
});

export default Schema;
