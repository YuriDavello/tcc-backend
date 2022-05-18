import App from './app.js';

const app = new App();

async function boot() {
  await app.init();
}

boot();
