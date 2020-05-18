// import path from 'path';
import { Router } from 'express';
import * as controller from './controllers/controller';

const routes = Router();
routes.get('/', controller.renderHomePage);

routes.get('/about', controller.renderAboutPage);

routes.post('/', controller.getWeather);

export default routes;
