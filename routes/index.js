const express = require('express');
const router = express.Router();

const book = require('./book');

router.get('/books', book.findBooks);
router.get('/book/:id', book.findBook);
router.get('/wishlists/:idUser', book.getWishlists);
router.post('/wishlist', book.postWishlist);
router.delete('/wishlist/:idBook', book.deleteWishlist);

module.exports = router;
