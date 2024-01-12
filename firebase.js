require('dotenv').config();

const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Firebase se configurará automáticamente usando la variable de entorno GOOGLE_APPLICATION_CREDENTIALS
initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();

module.exports = {
  db,
};
