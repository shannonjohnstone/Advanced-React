import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from '../pages/products';
import Product from './Product';

const GET_PRODUCT_QUERY = gql`
  query GET_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String!
    $description: String!
    $price: Int!
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      description
      price
      name
    }
  }
`;

export default function UpdateProduct({ id }) {
  const router = useRouter();

  const { data: queryData, loading: queryLoading } = useQuery(
    GET_PRODUCT_QUERY,
    { variables: { id } }
  );

  const { handleChange, clearForm, inputs } = useForm({
    name: queryData?.Product?.name || '',
    price: queryData?.Product?.price || '',
    description: queryData?.Product?.description || '',
  });

  const [updateProduct, { loading, error }] = useMutation(
    UPDATE_PRODUCT_MUTATION
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const product = await updateProduct({
      variables: { ...inputs, id },
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    });

    if (!error) {
      clearForm();
      router.push({ pathname: `/product/${product.data.updateProduct.id}` });
    }
  }

  //  if (isLoading) return <p>Loading...</p>;
  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset
        disabled={queryLoading || loading}
        aria-busy={queryLoading || loading}
      >
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        {/* <label htmlFor="image">
          Image
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
          />
        </label> */}
      </fieldset>
      <button type="submit">+ Add Product</button>
    </Form>
  );
}
