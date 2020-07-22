const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/data',
    createProxyMiddleware({
      target: 'https://flask-fire-4xxzvy3jwq-an.a.run.app',
      changeOrigin: true,
    })
  );
};