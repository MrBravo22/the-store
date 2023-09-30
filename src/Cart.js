import React from 'react';

// Converting cents to dollars, display currency format
const formatPrice = (priceInCents) => {
  const priceInDollars = priceInCents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(priceInDollars);
};

const Cart = ({ updateOrder, removeFromCart, lineItems, cart, products }) => {
  // Filter line items that belong to the current cart
  const cartLineItems = lineItems.filter((lineItem) => lineItem.order_id === cart.id);

  return (
    <div>
      <h2>Cart</h2>
      {cartLineItems.length === 0 ? (
        <p>Add some items to your cart.</p>
      ) : (
        <ul>
          {cartLineItems.map((lineItem) => {
            const product = products.find((product) => product.id === lineItem.product_id) || {};
            return (
              <li key={lineItem.id}>
                {product.name} ({lineItem.quantity})
                {formatPrice(product.price * lineItem.quantity)}
                <button onClick={() => removeFromCart(lineItem)}>Remove From Cart</button>
              </li>
            );
          })}
        </ul>
      )}
      {cartLineItems.length > 0 && (
        <button onClick={() => updateOrder({ ...cart, is_cart: false })}>Create Order</button>
      )}
    </div>
  );
};

export default Cart;

