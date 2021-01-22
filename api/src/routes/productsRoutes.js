const server = require('express').Router(); //Import router from express module.
const { OK, CREATED, UPDATED, ERROR, NOT_FOUND, ERROR_SERVER } = require('../constants'); // Import Status constants.
const { Product, Categories, Review } = require('../db.js'); // Import Products model.
const { Op } = require('sequelize'); // Import operator from sequelize module.

// 'Get products' route in '/'
server.get('/', (req, res) => {
	//Product.findAll().then(products => res.status(STATUS.OK).json({message: 'Success',data: products})
	Product.findAll({
		include: [{ model: Categories }, { model: Review }],
	})
		.then((products) => {
			return res.status(OK).json({
				message: 'Success',
				data: products,
			});
		})
		.catch((err) => {
			return res.status(ERROR_SERVER).json({
				message: 'Hubo un error en el servidor',
				data: err,
			});
		});
});

// 'Get an especific product' route in '/:id'
server.get('/product/:id', (req, res) => {
	const { id } = req.params;

	return Product.findOne({ where: { id }, include: Review })

		.then((products) => {
			return res.status(OK).json({
				message: 'Success',
				data: products,
			});
		})
		.catch((err) => {
			return res.status(NOT_FOUND).json({
				message: 'El producto no se encuentra en la base de datos',
				data: err,
			});
		});
});

// 'Create product' route in '/'
server.post('/', function (req, res) {
	const { name, description, price, stock, dimentions, image, sku } = req.body;
	return Product.create({ name, description, price, stock, dimentions, image, sku })
		.then((product) => {
			return res.status(OK).json({
				message: 'Producto creado exitosamente!',
				data: product,
			});
		})
		.catch((err) => {
			return res.status(ERROR).json({
				message: 'Error al crear producto',
				data: err,
			});
		});
});

// 'Update product' route in '/:id'
server.put('/:id', (req, res) => {
	const { id } = req.params;

	const { name, description, price, stock, dimentions, image, sku } = req.body;

	return Product.findOne({ where: { id } })
		.then((product) => {
			product.name = name;
			product.description = description;
			product.price = price;
			product.stock = stock;
			product.dimentions = dimentions;
			product.image = image;
			product.save();
			return res.status(OK).json({
				message: `El ítem se ha actualizado correctamente!`,
				data: product,
			});
		})
		.catch((err) => {
			return res.status(ERROR).json({
				message: 'Error al modificar producto',
				data: err,
			});
		});
});

// 'Delete product' route in '/:id'
server.delete('/:id', (req, res) => {
	const { id } = req.params;

	return Product.findOne({ where: { id } })
		.then((deletedProduct) => {
			deletedProduct.destroy();
			return res.status(OK).json({
				message: 'Producto eliminado',
				data: deletedProduct,
			});
		})
		.catch((err) => {
			return res.status(ERROR_SERVER).json({
				message: 'Error al eliminar producto',
				data: err,
			});
		});
});

// 'Search product' route in '/search?query={value}'
server.get('/search', (req, res, next) => {
	const value = req.query.query;
	let queryParameters;
	if (value === '') {
		queryParameters = { include: [{ model: Categories }, { model: Review }] };
	} else {
		queryParameters = {
			where: { [Op.or]: [{ name: { [Op.iLike]: `%${value}%` } }, { description: { [Op.iLike]: `%${value}%` } }] },
			include: [{ model: Categories }, { model: Review }],
		};
	}
	return Product.findAll(queryParameters)
		.then((products) => {
			return res.status(OK).json({
				message: 'Success',
				data: products,
			});
		})
		.catch(next);
});

// 'Add Category to a product' route in '/:product_id/category/:category_id'
server.put('/:product_id/category/:category_id', (req, res, next) => {
	console.log(req);
	const { product_id, category_id } = req.params;

	Promise.all([Product.findByPk(product_id), Categories.findByPk(category_id)]).then((data) => {
		data[0]
			.addCategories(data[1])
			.then(() => {
				Product.findOne({
					where: { id: product_id },
					include: [{ model: Categories }, { model: Review }],
				}).then((data) => {
					console.log(data);
					res.json({
						message: 'Categoría añadida correctamente!',
						data: data,
					});
				});
			})
			.catch(next);
	});
});

// 'Remove Category to a product' route in '/:product_id/category/:category_id'
server.delete('/:product_id/category/:category_id', (req, res) => {
	console.log(req.body);

	const { product_id, category_id } = req.params;

	Promise.all([Product.findByPk(product_id), Categories.findByPk(category_id)]).then((data) => {
		data[0]
			.removeCategories(data[1])
			.then(() => {
				Product.findOne({
					where: { id: product_id },
					include: [{ model: Categories }, { model: Review }],
				}).then((data) => {
					console.log(data);
					res.json({
						message: 'Categoría eliminada correctamente!',
						data: data,
					});
				});
			})
			.catch(next);
	});
});

// POPULATE DB
const productsForPopulate = [
	{
		name: 'Smart TV LED Full HD 43',
		description: 'Su resolución Full HD muestra una clara evolución frente a su antecesora. Las imágenes que vas a ver van a tener una calidad superior con un alto nivel de detalle y colores mucho más llamativos.',
		price: 3890,
		stock: 1150,
		dimentions: '43',
		image: 'https://http2.mlstatic.com/D_NQ_NP_658979-MLA40774216513_022020-O.webp',
		sku: Math.floor(Math.random() * 100 * 1000 * 1000), // Random number entre 0 y 100 millones
	},
	{
		name: 'Memoria Notebook Hp 8gb Ddr4 2400 S1 Sodimm',
		description: 'Especificaciones Técnicas: - Garantia:5 año - Marca:HP - Medidas:2.74 X 1.18 PULGADAS - Tamaño:8GB - Tipo:DRAM DDR4 SO-DIMM 260 PIN - Velocidad:2400 - Voltage:1.2V~1.35V',
		price: 4033,
		stock: 2000,
		dimentions: '10x20x25',
		image: 'https://http2.mlstatic.com/D_NQ_NP_607182-MLA43398228056_092020-O.webp',
		sku: Math.floor(Math.random() * 100 * 1000 * 1000), // Random number entre 0 y 100 millones
	},
	{
		name: 'Transmisor Receptor Audio Bluetooth Adaptador Tv Pc Parlante',
		description: 'Cumple la funciona de emisor y de receptor, quiere decir, lo podes conectar a un parlante, equipo de musica , tv , pc etc que NO tenga bluetooth y lo hace bluetooth para poder transmitir desde un celular o tablet, tambien cumple la funcion contraria, podes conectar a una pc o tv sin bluetooth para que trasmita a un auricular que si tiene bluetooth.',
		price: 13250,
		stock: 180,
		dimentions: '10x20x35',
		image: 'https://http2.mlstatic.com/D_NQ_NP_768500-MLA31133280702_062019-O.webp',
		sku: Math.floor(Math.random() * 100 * 1000 * 1000), // Random number entre 0 y 100 millones
	},
	{
		name: 'Teclado Y Mouse Gamer Usb Retro Iluminado Led 2000dpi Combo Kit',
		description: 'KIT TECLADO GAMER moderno de ultima generación ideal para jugadores multiplayer on-line, rpg, first person shooter y cualquier juego con interface basada en Teclado + Mouse. Diseño óptimo para largas sesiones de juego en las que puedas apoyar tus manos y tu celular! Teclas de doble inyección para mayor vida útil y un perfecto feedback al tacto. Construido sobre estructura metálica garantiza larga durabilidad, además posee Retroiluminación LED.',
		price: 4600,
		stock: 325,
		dimentions: '10x20x35',
		image: 'https://http2.mlstatic.com/D_NQ_NP_669086-MLA44352604268_122020-O.webp',
		sku: Math.floor(Math.random() * 100 * 1000 * 1000), // Random number entre 0 y 100 millones
	},
	{
		name: 'Mouse Pad Gamer XXL Con Borde Rojo 890 X 400 X 3mm',
		description: 'Tenemos más de 26 años de permanencia y experiencia en el rubro fuera de mercado libre. Somos usuarios desde 2004 en mercado libre, hace 15 años que estamos en el sitio y AHORA!!! decidimos incursionar en el e-commerce!!! Ventas por mayor y menor. Estamos en C.A.B.A',
		price: 2990,
		stock: 150,
		dimentions: '890x400x3',
		image: 'https://http2.mlstatic.com/D_NQ_NP_796022-MLA32150438287_092019-O.webp',
		sku: Math.floor(Math.random() * 100 * 1000 * 1000), // Random number entre 0 y 100 millones
	},
	{
		name: 'Organizador De Zapatos, 6 Estantes, Desarmable Botinero',
		description: 'Rack de almacenamiento de zapatos apilable de 6 niveles con espacio para 18 pares de Zapatos. Bastones de metal resistentes. Excelente para sostener tacones altos. Para mantener su dormitorio ordenado. Le permitirá encontrar rapidamente el calzado adecuado para el día. Este estante para zapatos le permite ajustar los niveles segun su conveniencia. Con diseño dividible, puede colocarlos fácilmente en diferentes áreas de su casa.',
		price: 1900,
		stock: 130,
		dimentions: '890x400x3',
		image: 'https://http2.mlstatic.com/D_NQ_NP_815478-MLA31116053731_062019-O.webp',
		sku: Math.floor(Math.random() * 100 * 1000 * 1000), // Random number entre 0 y 100 millones
	},
];

// 'Create product' route in '/'
server.post('/populate', function (req, res) {
	return Product.bulkCreate(productsForPopulate)
		.then((product) => {
			return res.status(OK).json({
				message: 'Productos creados exitosamente!',
				data: product,
			});
		})
		.catch((err) => {
			return res.status(ERROR).json({
				message: 'Error al crear los productos',
				data: err,
			});
		});
});

//End routes
module.exports = server;
