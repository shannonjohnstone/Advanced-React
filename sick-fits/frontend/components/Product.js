import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import TitleStyles from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

export default function Product({ product }) {
  return (
    <ItemStyles>
      <p>{product.name}</p>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <TitleStyles>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </TitleStyles>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
    </ItemStyles>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
    photo: PropTypes.shape({
      image: PropTypes.shape({
        publicUrlTransformed: PropTypes.string,
      }),
    }),
  }),
};
