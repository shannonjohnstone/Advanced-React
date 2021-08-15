import { config, createSchema } from '@keystone-next/keystone/schema';
// import type { ServerConfig } from '@keystone-next/types';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import 'dotenv/config';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';

const databaseURl =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 34 * 360,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO roles
  },
});

export default withAuth(
  config({
    db: {
      adapter: 'mongoose',
      url: databaseURl,
      async onConnect(keystone) {
        if (process.argv.includes('--seed-data')) {
          return insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({ User, Product, ProductImage }),
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    ui: {
      isAccessAllowed: ({ session }) => {
        console.log(session);
        return !!session?.data;
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id',
    }),
  })
);
