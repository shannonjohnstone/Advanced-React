import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';
import formatMoney from '../lib/formatMoney';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

const GET_PRODUCT_QUERY = gql`
  query GET_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
      photo {
        image {
          publicUrlTransformed
        }
        altText
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(GET_PRODUCT_QUERY, {
    variables: { id },
  });

  if (error) <DisplayError error={error} />;
  if (loading) return <h2>Loading...</h2>;

  const {
    name,
    price,
    description,
    photo: {
      altText,
      image: { publicUrlTransformed },
    },
  } = data?.Product;

  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {name}</title>
      </Head>
      <img src={publicUrlTransformed} alt={altText} />
      <div className="details">
        <h2>{name}</h2>
        <p>{formatMoney(price)}</p>
        <p>{description}</p>
      </div>
    </ProductStyles>
  );
}

SingleProduct.propTypes = {
  id: PropTypes.string.isRequired,
};
