// ***********************************
// ***********************************

// The intention for these routes is to populate all the tables so you can use the app entirely without having to do it manually

// ***********************************
// ***********************************

const server = require('express').Router(); //Import router from express module.
const { OK, CREATED, UPDATED, ERROR, NOT_FOUND, ERROR_SERVER } = require('../constants'); // Import Status constants.
const { Product, Categories, Review, User } = require('../db.js'); // Import Products model.
const { Op } = require('sequelize'); // Import operator from sequelize module.

// POPULATE INFO
const productsForPopulate = [
	{
		name: 'Smart TV LED Full HD 43',
		description: 'Su resolución Full HD muestra una clara evolución frente a su antecesora. Las imágenes que vas a ver van a tener una calidad superior con un alto nivel de detalle y colores mucho más llamativos.',
		price: 3890,
		stock: 1150,
		dimentions: '43',
		image: 'https://http2.mlstatic.com/D_NQ_NP_658979-MLA40774216513_022020-O.webp',
		sku: Math.floor(Math.random() * 100 * 1000 * 1000), // Random number entre 0 y 100 millones
		rating: Math.ceil(Math.random() * 5), // 1, 2, 3, 4 o 5
	},
	{
		name: 'Memoria Notebook Hp 8gb Ddr4 2400 S1 Sodimm',
		description: 'Especificaciones Técnicas: - Garantia:5 año - Marca:HP - Medidas:2.74 X 1.18 PULGADAS - Tamaño:8GB - Tipo:DRAM DDR4 SO-DIMM 260 PIN - Velocidad:2400 - Voltage:1.2V~1.35V',
		price: 4033,
		stock: 2000,
		dimentions: '10x20x25',
		image: 'https://http2.mlstatic.com/D_NQ_NP_607182-MLA43398228056_092020-O.webp',
		sku: Math.floor(Math.random() * 100 * 1000 * 1000), // Random number entre 0 y 100 millones
		rating: Math.ceil(Math.random() * 5), // 1, 2, 3, 4 o 5
	},
	{
		name: 'Transmisor Receptor Audio Bluetooth Adaptador Tv Pc Parlante',
		description: 'Cumple la funciona de emisor y de receptor, quiere decir, lo podes conectar a un parlante, equipo de musica , tv , pc etc que NO tenga bluetooth y lo hace bluetooth para poder transmitir desde un celular o tablet, tambien cumple la funcion contraria, podes conectar a una pc o tv sin bluetooth para que trasmita a un auricular que si tiene bluetooth.',
		price: 13250,
		stock: 180,
		dimentions: '10x20x35',
		image: 'https://http2.mlstatic.com/D_NQ_NP_768500-MLA31133280702_062019-O.webp',
		sku: Math.floor(Math.random() * 100 * 1000 * 1000), // Random number entre 0 y 100 millones
		rating: Math.ceil(Math.random() * 5), // 1, 2, 3, 4 o 5
	},
	{
		name: 'Teclado Y Mouse Gamer Usb Retro Iluminado Led 2000dpi Combo Kit',
		description: 'KIT TECLADO GAMER moderno de ultima generación ideal para jugadores multiplayer on-line, rpg, first person shooter y cualquier juego con interface basada en Teclado + Mouse. Diseño óptimo para largas sesiones de juego en las que puedas apoyar tus manos y tu celular! Teclas de doble inyección para mayor vida útil y un perfecto feedback al tacto. Construido sobre estructura metálica garantiza larga durabilidad, además posee Retroiluminación LED.',
		price: 4600,
		stock: 325,
		dimentions: '10x20x35',
		image: 'https://http2.mlstatic.com/D_NQ_NP_669086-MLA44352604268_122020-O.webp',
		sku: Math.floor(Math.random() * 100 * 1000 * 1000), // Random number entre 0 y 100 millones
		rating: Math.ceil(Math.random() * 5), // 1, 2, 3, 4 o 5
	},
	{
		name: 'Mouse Pad Gamer XXL Con Borde Rojo 890 X 400 X 3mm',
		description: 'Tenemos más de 26 años de permanencia y experiencia en el rubro fuera de mercado libre. Somos usuarios desde 2004 en mercado libre, hace 15 años que estamos en el sitio y AHORA!!! decidimos incursionar en el e-commerce!!! Ventas por mayor y menor. Estamos en C.A.B.A',
		price: 2990,
		stock: 150,
		dimentions: '890x400x3',
		image: 'https://http2.mlstatic.com/D_NQ_NP_796022-MLA32150438287_092019-O.webp',
		sku: Math.floor(Math.random() * 100 * 1000 * 1000), // Random number entre 0 y 100 millones
		rating: Math.ceil(Math.random() * 5), // 1, 2, 3, 4 o 5
	},
	{
		name: 'Organizador De Zapatos, 6 Estantes, Desarmable Botinero',
		description: 'Rack de almacenamiento de zapatos apilable de 6 niveles con espacio para 18 pares de Zapatos. Bastones de metal resistentes. Excelente para sostener tacones altos. Para mantener su dormitorio ordenado. Le permitirá encontrar rapidamente el calzado adecuado para el día. Este estante para zapatos le permite ajustar los niveles segun su conveniencia. Con diseño dividible, puede colocarlos fácilmente en diferentes áreas de su casa.',
		price: 1900,
		stock: 130,
		dimentions: '890x400x3',
		image: 'https://http2.mlstatic.com/D_NQ_NP_815478-MLA31116053731_062019-O.webp',
		sku: Math.floor(Math.random() * 100 * 1000 * 1000), // Random number entre 0 y 100 millones
		rating: Math.ceil(Math.random() * 5), // 1, 2, 3, 4 o 5
	},
];
const usersForPopulate = [
	{
		name: 'admin',
		email: 'admin@admin.com',
		password: 'admin',
		role: 'admin',
	},
	{
		name: 'Juan',
		email: 'juan@juan.com',
		password: 'juan',
		role: 'client',
	},
	{
		name: 'Sebastian',
		email: 'sebastian@sebastian.com',
		password: 'sebastian',
		role: 'client',
	},
	{
		name: 'Melisa',
		email: 'melisa@melisa.com',
		password: 'melisa',
		role: 'client',
	},
	{
		name: 'Estefania',
		email: 'estefania@estefania.com',
		password: 'estefania',
		role: 'client',
	},
];
const categoriesForPopulate = [
	{
		name: 'Tecnologia',
		description: 'Articulos a la vanguardia del diseño y la funcion que se le brinda',
	},
	{
		name: 'Decoracion',
		description: 'Articulos que se utilizan para hacer mas bellos los ambientes',
	},
	{
		name: 'Otros',
		description: 'Articulos varios que no encajan en las otras categorias',
	},
	{
		name: 'Libros',
		description: 'Cualquier tipo de articulo cuyo uso principal sea el de su lectura',
	},
	{
		name: 'Deportes',
		description: 'Articulos utilizados para la realizacion de cualquier actividad física',
	},
	{
		name: 'Moda',
		description: 'Articulos varios utilizados para verse mejor',
	},
	{
		name: 'Herramientas',
		description: 'Articulos para la realizacion de tareas varias tanto dentro como fuera del hogar',
	},
];

// POPULATE products
server.post('/products', function (req, res) {
	return Product.bulkCreate(productsForPopulate)
		.then((product) => {
			return res.status(CREATED).json({
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

// POPULATE users
server.post('/users', function (req, res) {
	var users = usersForPopulate.map((user) => {
		user.password = User.encryptPassword(user.password);
		return user;
	});
	// let passEncrypt = User.encryptPassword(password);
	User.bulkCreate(users)
		.then((user) => {
			// console.log(user);
			return res.status(CREATED).json({
				message: 'Usuarios creados exitosamente!',
				data: user,
			});
		})
		.catch((err) => {
			return res.status(ERROR).json({
				message: 'Error al crear los usuarios',
				data: err,
			});
		});
});

// POPULATE categories
server.post('/categories', (req, res) => {
	return Categories.bulkCreate(categoriesForPopulate)
		.then((newCategory) => {
			return res.status(CREATED).json({
				message: `La categorias han sido creadas exitosamente`,
				data: newCategory,
			});
		})
		.catch((err) => {
			return res.status(ERROR).json({
				message: 'Hubo un error al crear las categorías',
				data: err,
			});
		});
});

//End routes
module.exports = server;
