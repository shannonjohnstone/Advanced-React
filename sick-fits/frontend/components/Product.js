import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import TitleStyles from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteButton from './DeleteButton';

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
      <p>{product.description}</p>
      <div className="buttonList">
        <Link href={{ pathname: 'update', query: { id: product.id } }}>
          Edit
        </Link>
        <DeleteButton id={product.id}>Delete</DeleteButton>
      </div>
    </ItemStyles>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
    photo: PropTypes.shape({
      image: PropTypes.shape({
        publicUrlTransformed: PropTypes.string,
      }),
    }),
  }),
};
