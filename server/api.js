const {
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder
} = require('./db');

const express = require('express');
const app = express.Router();
app.use(express.json())

app.get('/products', async(req, res, next)=> {
  try {
    res.send(await fetchProducts());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/products', async(req, res, next)=> {
  const body = req.body
  try {
    const SQL=`
    INSERT INTO products(name, description, price)
    VALUES($1, $2, $3)
    RETURNING *
    `;
    const response = await client.query(SQL, [req.body.name, req.body.description, req.body.price]);
    res.send(response.rows)
  } catch (error) {
      next(error)
  }

});

app.put('/products/:id', async(req, res, next)=> {
  try {
    const SQL = `
      UPDATE products
      SET name = $1, description = $2, price = $3
      WHERE id = $4
      RETURNING *
    `;
    const response = await client.query(SQL, [req.body.name, req.body.description, req.body.price, req.params.id]);
    res.send(response.rows)
  } catch(error) {
      next(error)
  }

});

app.put('/orders/:id', async(req, res, next)=> {
  try {
    res.send(await updateOrder({ ...req.body, id: req.params.id}));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/orders', async(req, res, next)=> {
  try {
    res.send(await fetchOrders());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/lineItems', async(req, res, next)=> {
  try {
    res.send(await fetchLineItems());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/lineItems', async(req, res, next)=> {
  try {
    res.send(await createLineItem(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.put('/lineItems/:id', async(req, res, next)=> {
  try {
    res.send(await updateLineItem({...req.body, id: req.params.id}));
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/lineItems/:id', async(req, res, next)=> {
  try {
    await deleteLineItem({ id: req.params.id });
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

module.exports = app;
