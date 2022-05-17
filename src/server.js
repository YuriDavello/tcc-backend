import App from './app';

const app = new App();

async function boot() {
  await app.init();
}

boot();
