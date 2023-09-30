import React from 'react';

const Products = ({ products, cartItems, createLineItem, updateLineItem })=> {

  //Alphabetically sort products
  const sortedProducts = products.slice().sort((a, b) => a.name.localeCompare(b.name));

  //Converting cents to dollars, display currency format
  const formatPrice = (priceInCents) => {
    const priceInDollars = priceInCents / 100;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(priceInDollars);
    };

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {
          sortedProducts.map( (product) => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (
              <li key={ product.id }>
                Product:{ product.name } - Price:{ formatPrice(product.price) }
                <p>Description:{ product.description }</p>
                {
                  cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add</button>
                }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Products;
