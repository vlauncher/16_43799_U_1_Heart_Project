const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: '/',
    changeOrigin: true
}
module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware(proxy)
  );
};