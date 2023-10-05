import React, { useState } from 'react';


const Products = ({ products, cartItems, createLineItem, updateLineItem, createProduct })=> {

const [productName, setProductName] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");


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
    const addProduct = (event) => {
      event.preventDefault ()
      const newProduct = {name: productName, description: description, price: price * 1}
      createProduct (newProduct);
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

      <h3>Add a New Product</h3>
      <form onSubmit={ addProduct }>
        <div>
          <label>Name:</label>
          <input type="text" value= { productName } onChange= {(event) => {
            setProductName (event.target.value);
          }} />
        </div>
        <div>
          <label>Description:</label>
          <textarea type="text" value={ description } onChange= {(event) => {
            setDescription (event.target.value);
          }}></textarea>
        </div>
        <div>
          <label>Price:</label>
          <input type="text" value={ price } onChange={(event) => {
            setPrice (event.target.value);
          }} />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>

    
  );
};

export default Products;
