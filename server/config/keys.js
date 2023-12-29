const { TOKEN_KEY } = require('./env');

module.exports = {
    jwt: {
      secret: TOKEN_KEY,
      tokenLife: '7d'
    }
  };
  