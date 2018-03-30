import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { StaticRouter as Router, matchPath } from 'react-router';
import logger from './src/logging/logger';

const app = express();

const routes = [
    '/',
];
const excludeValidationRoutes = [
    '/ping'
];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    logger.info('requested url: ', req.url);
    let match = routes.some((url) => matchPath(req.url, {path: url, exact: true}));
    if (!match) {
        logger.info('exclude matches');
        res.end();
    }
    match = excludeValidationRoutes.some((url) => matchPath(req.url, {path: url, exact: true}));
    if (match) {
        logger.info('exclude routes');
        next();
    }
});

app.get('/ping', (req, res) => {
    res.status(200);
    res.json('OK');
});

app.listen('3000', () => {
    logger.info(`Listening on port 3000`);
});
