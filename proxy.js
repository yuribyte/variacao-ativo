import { createServer } from 'cors-anywhere';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

createServer({
  originWhitelist: [],
  requireHeader: [],
  removeHeaders: []
}).listen(port, host, () => {
  console.log(`Running cors-anywhere on ${host}:${port}`);
});
