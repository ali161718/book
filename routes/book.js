const axios = require('axios');
require('dotenv').config();

const model = require('../model/database');

const book = {

	findBooks: async (req, res) => {
		let keyword = req.query.keyword ? req.query.keyword : 'database';

		let { data } = await axios.get(`${process.env.urlFindBook}?q=${keyword}`);

		let result;
		if (!data.totalItems) {
			result = {
				code: 400,
				message: 'Data tidak ditemukan',
				data: []
			};
		} else {
			result = {
				code: 200,
				message: 'List data',
				data: []
			}

			data.items.forEach(element => {
				// console.log('elemetn', element);
				let currencyCode = element.saleInfo.listPrice?.currencyCode ? element.saleInfo.listPrice.currencyCode : 'IDR';
				let amount = element.saleInfo.listPrice?.amount ? element.saleInfo.listPrice.amount : 0;

				let temp = {
					id: element.id,
					title: element.volumeInfo.title,
					smallThumbnail: element.volumeInfo.imageLinks.smallThumbnail,
					thumbnail: element.volumeInfo.imageLinks.thumbnail,
					author: element.volumeInfo.authors,
					rating: element.volumeInfo.averageRating ? element.volumeInfo.averageRating : 0
				};

				result.data.push(temp);
			});

			// console.log(result.data);
		}

		res.send(result)

	},

	findBook: async (req, res) => {

		let { id } = req.params
		let result;

		try {

			let { data } = await axios.get(`${process.env.urlFindBook}/${id}`);

			if (!data.id) {
				result = {
					code: 400,
					message: 'Data tidak ditemukan',
					data: []
				};
			} else {
				result = {
					code: 200,
					message: 'List data',
					data: data
				}

				// console.log(result.data);
			}

			res.send(result);

		} catch (error) {
			result = {
				code: '400',
				message: 'Data tidak ditemukan',
				data: []
			};

			res.send(result);

		}

	},

	getWishlists: async (req, res) => {

		const idUser = req.params.idUser;

		let result;

		let data = await model.findsWishlist({idUser});
		
		if (data == 503 || data == 400) {
			result = {
				code: data,
				message: 'Failed wishlist not found',
				data: []
			}
		} else {
			result = {
				code: 200,
				message: 'Success list wishlist',
				data: data
			}
		}

		res.send(result);

	},

	postWishlist: async (req, res) => {

		const payload = req.body;
		let result;

		try {

			await axios.get(`${process.env.urlFindBook}/${payload.idBook}`);

			let data = await model.addWishlist(payload);

			if (data == 400) {
				result = {
					code: data,
					message: 'Failed duplicate wishlist'
				}
			} else if (data == 503) {
				result = {
					code: data,
					message: 'Failed add wishlist'
				}
			} else {
				result = {
					code: 200,
					message: 'Success add wishlist'
				}
			}

			res.send(result);

		} catch (error) {
			result = {
				code: '400',
				message: 'Data tidak ditemukan'
			};

			res.send(result);

		}
	},

	deleteWishlist: async (req, res) => {

		const idBook = req.params.idBook;

		let result;

		let data = await model.deleteWishlist({idBook});

		if (data != 200) {
			result = {
				code: data,
				message: 'Failed delete wishlist'
			}
		} else {
			result = {
				code: 200,
				message: 'Success delete wishlist'
			}
		}

		res.send(result);

	}
};

module.exports = book;
