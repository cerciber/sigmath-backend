const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(
    require('../../../sigmath-firebase-adminsdk-dr1fk-c44ba83e4c.json')
  ),
  databaseURL: 'https://sigmath.firebaseio.com',
});

// Exportar administrador de firebase
module.exports = admin;
