const { createProxyMiddleware } = require('http-proxy-middleware');

console.log('proxy ............')
module.exports = function(app) {
  const PORT = process.env.PORT || 9997;
  app.use('/api',
    createProxyMiddleware({
      target: process.env.NODE_ENV === 'production' ? `0.0.0.0:${PORT}` : `http://localhost:${PORT}`,
      changeOrigin: true
    })
  );
}