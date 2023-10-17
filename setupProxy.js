import { createProxyMiddleware } from 'http-proxy-middleware';

const setupProxy = (app) => {
  app.use(
    'ws',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      ws: true,
    })
  );
};

export default setupProxy;
