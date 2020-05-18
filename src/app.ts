import express from 'express';
import routes from './routes';

const server = express();
const PORT = 3333;

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(express.static('public'));
server.set('views', 'views'); // telling express to look for thse views in a specific directory which is called views.
server.set('view engine', 'hbs');
server.use('/', routes);

server.listen(PORT, () => {
  console.log('Running!');
});
