const { createProxyMiddleware } = require('http-proxy-middleware');

console.log('proxy ............')
module.exports = function(app) {
  app.use('/api',
    createProxyMiddleware({
      target: 'http://localhost:9999',
      changeOrigin: true
    })
  );
}