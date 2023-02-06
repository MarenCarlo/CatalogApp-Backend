const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const app = express();
const morgan = require('morgan');
require('dotenv').config();

/**
 * Configuraciones del Servidor
 */
//Puerto
app.set('port', process.env.SV_PORT || 3031);
app.use(helmet());

//CORS
const whiteList = [process.env.CR_DOMAIN_1, process.env.CR_DOMAIN_2, process.env.CR_DOMAIN_3];
var corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: "GET, HEAD, PUT, PATCH ,DELETE",
    preflightContinue: false,
}
app.use(cors(corsOptions));

//Middleware
const validateToken = require('./middleware/validate-token');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Uso de Rutas
app.get('/', (res) => {
    res.status(200).json({
        estado: true,
        title: process.env.APP,
        message_info: 'Versiones disponibles de la API',
        API_Versions: [
            {
                url: '/api/v1/',
                message: 'first Version of the API with basic functions and authentication system.',
                state: "Alpha"
            }
        ],
    })
});

/**
 * API Alpha V1.0.0
 */
/**
 * Importacion de Rutas
 */
const defaultRoute = require('./routes/default');
const usersRoute = require('./routes/users');
//Products Routes
const productsPublicRoute = require('./routes/public-products');
const productsPrivateRoute = require('./routes/private-products');
//Categories Routes
const categoriesPublicRoute = require('./routes/public-category');
const categoriesPrivateRoute = require('./routes/private-category');
//Brands Routes
const brandsPublicRoute = require('./routes/public-brand');
const brandsPrivateRoute = require('./routes/private-brand');
//auth route
const authRoute = require('./routes/auth');

/**
 * Public Routes
 */
app.use('/api/v1', authRoute);
app.use('/api/v1', defaultRoute);
app.use('/api/v1', productsPublicRoute);
app.use('/api/v1', categoriesPublicRoute);
app.use('/api/v1', brandsPublicRoute);

/**
 * Private Routes
 */
app.use(
    '/api/v1',
    validateToken,
    usersRoute
);
app.use(
    '/api/v1',
    validateToken,
    productsPrivateRoute
);
app.use(
    '/api/v1',
    validateToken,
    categoriesPrivateRoute
);
app.use(
    '/api/v1',
    validateToken,
    brandsPrivateRoute
);
export default app;