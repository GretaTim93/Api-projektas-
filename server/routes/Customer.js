const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customerController')

// costumer Routes

router.get('/', customerController.homepage);
router.get('/add', customerController.addCustomer);
router.post('/add', customerController.postCustomer);
router.get('/edit/:id', customerController.editCustomer);
router.put('/edit/:id', customerController.editPost);
router.delete('/edit/:id', customerController.deleteCustomer);

module.exports = router