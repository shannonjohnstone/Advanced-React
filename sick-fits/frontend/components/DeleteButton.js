import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
// import { ALL_PRODUCTS_QUERY } from '../pages/products';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, { data: { deleteProduct } }) {
  console.log(cache, deleteProduct);
  cache.evict(cache.identify(deleteProduct));
}

export default function DeleteButton({ children, id }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION);

  function handleDelete() {
    if (confirm('Are you sure you wantt delete this product?')) {
      deleteProduct({
        variables: { id },
        update,
      });
    }
  }

  return (
    <button type="button" onClick={handleDelete} disabled={loading}>
      {children}
    </button>
  );
}
