const dotenv = require('dotenv');
const path = require('path');

let file = '';

switch ((process.env.NODE_ENV || '').trim().toLowerCase()) {
  case 'production':
    file = path.resolve('environments', '.env.prod');
    break;

  case 'homolog':
    file = path.resolve('environments', '.env.homolog');
    break;

  case 'dev':
    file = path.resolve('environments', '.env.dev');
    break;

  default:
    file = path.resolve('.env');
    break;
}

dotenv.config({
  path: file,
});
