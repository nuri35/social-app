const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/auth/google',
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_BACK_HOST}:5000/`,
      changeOrigin: true,
      secure:false
    })
  );
};