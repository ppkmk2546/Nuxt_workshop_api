const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const UserController = require('./controllers/UserController');
const ProductTypeController = require('./controllers/ProductTypeController')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ! product type
app.delete('/api/productType/remove/:id', ProductTypeController.remove); // remove product type
app.put('/api/productType/update/:id', ProductTypeController.update); // update product type
app.post('/api/productType/create', ProductTypeController.create);
app.get('/api/productType/list', ProductTypeController.list) // list all product types

// ! user
app.post('/api/user/signIn', UserController.signIn);

app.listen(3001, '0.0.0.0', () => {
    console.log('Server is running on port 3001');
})