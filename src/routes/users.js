const { Router } = require('express');
const { db } = require('../../firebase');

const router = Router();

// * Endpoints Users (CRUD)
// ? Obtenir tots els usuaris
router.get('/users', async (req, res) => {
  try {
    const querySnapshot = await db.collection('users').get();
    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.send(users);
  } catch (error) {
    // console.error('Error retrieving users:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ? Crear un nou usuari
router.post('/new-user', async (req, res) => {
  try {
    const { id, name, lastname, email, address, tel } = req.body;

    await db.collection('users').doc(id).set({
      id,
      name,
      lastname,
      email,
      address,
      tel
    });

    // const newUserRef = await db.collection('users').add({
    //   name,
    //   lastname,
    //   email,
    //   address,
    //   tel
    // });

    // const newUserId = newUserRef.id;

    // await db.collection('users').doc(newUserId).update({
    //   id: newUserId
    // });

    res.send('New user created');
  } catch (error) {
    // console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ? Obtenir un usuari
router.get('/get-user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      res.status(404).send('User not found');
      return;
    }

    const userData = {
      id: userDoc.id,
      ...userDoc.data()
    };

    res.send(userData);
  } catch (error) {
    // console.error('Error retrieving user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ? Eliminar un usuari
router.delete('/delete-user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      res.status(404).send('User not found');
      return;
    }

    await db.collection('users').doc(userId).delete();

    res.send('User deleted');
  } catch (error) {
    // console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ? Actualitzar un usuari
router.put('/update-user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      res.status(404).send('User not found');
      return;
    }

    await db.collection('users').doc(userId).update(req.body);

    res.send('User updated');
  } catch (error) {
    // console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ? Obtenir sugerencies en el buscador de usuaris
router.get('/get-suggestion-users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const collectionRef = db.collection('users');
    const querySnapshot = await collectionRef
      .where('name', '>=', userId)
      .orderBy('name')
      .get();

    if (querySnapshot.empty) {
      res.status(404).send('Users not found');
    } else {
      const users = querySnapshot.docs
        .map(doc => doc.data())
        .filter(user => user.name.includes(userId));

      res.send(users);
    }
  } catch (error) {
    // console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
