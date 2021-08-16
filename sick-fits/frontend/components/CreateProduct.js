import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from '../pages/products';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload!
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        status: "AVAILABLE"
        price: $price
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      description
      price
      name
    }
  }
`;

export default function CreateProduct() {
  const router = useRouter();
  const { handleChange, clearForm, inputs } = useForm({
    name: '',
    price: '',
    image: '',
    description: '',
  });

  const [addProduct, { loading, error }] = useMutation(CREATE_PRODUCT_MUTATION);

  async function handleSubmit(e) {
    e.preventDefault();
    const product = await addProduct({
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    });

    if (!error) {
      clearForm();
      router.push({ pathname: `/product/${product.data.createProduct.id}` });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
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
        <label htmlFor="image">
          Image
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
          />
        </label>
      </fieldset>
      <button type="submit">+ Add Product</button>
    </Form>
  );
}
