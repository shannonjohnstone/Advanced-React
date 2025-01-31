import 'dotenv/config';
import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import { text, relationship } from '@keystone-next/fields';

export const ProductImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_KEY,
        apiSecret: process.env.CLOUDINARY_SECRET,
        folder: 'sickfits',
      },
      label: 'source',
    }),
    altText: text(),
    product: relationship({ ref: 'Product.photo' }),
  },
  ui: {
    listView: { initialColumns: ['image', 'altText', 'product'] },
  },
});
