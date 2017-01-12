#!/usr/bin/env babel-node

import fs from 'fs';
import path from 'path';
import { graphql } from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';
import Schema from '../src/schema';

// Save user readable type system shorthand of schema
fs.writeFileSync(
  path.join(__dirname, '../src/schema.graphql'),
  printSchema(Schema),
);
