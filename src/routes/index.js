const { Router } = require('express');
const { db } = require('../../firebase');

const router = Router();

// ? Endpoints Columnes (CRUD)
// * Obtenir totes les columnes
router.get('/columns', async (req, res) => {
  try {
    const querySnapshot = await db.collection('columns').get();

    const columns = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.send(columns);
  } catch (error) {
    console.error('Error retrieving columns:', error);
    res.status(500).send('Internal Server Error');
  }
});

// * Crear una nova columna
router.post('/new-column', async (req, res) => {
  try {
    const { title, color } = req.body;

    const newColumnRef = await db.collection('columns').add({
      title,
      color
    });

    // Obtener el ID del document acabat de crear
    const newColumnId = newColumnRef.id;

    // Actualizar el document acabat de crear amb el seu propi ID
    await db.collection('columns').doc(newColumnId).update({
      id: newColumnId
    });

    res.send('New column created');
  } catch (error) {
    console.error('Error creating column:', error);
    res.status(500).send('Internal Server Error');
  }
});

// * Obtenir una columna
router.get('/get-column/:columnId', async (req, res) => {
  try {
    const columnId = req.params.columnId;

    const columnDoc = await db.collection('columns').doc(columnId).get();

    if (!columnDoc.exists) {
      res.status(404).send('Column not found');
      return;
    }

    const columnData = {
      id: columnDoc.id,
      ...columnDoc.data()
    };

    res.send(columnData);
  } catch (error) {
    console.error('Error retrieving column:', error);
    res.status(500).send('Internal Server Error');
  }
});

// * Eliminar una columna
router.delete('/delete-column/:columnId', async (req, res) => {
  try {
    const columnId = req.params.columnId;

    const columnDoc = await db.collection('columns').doc(columnId).get();

    // Verfiquem si la columna existeix abans de eliminarla
    if (!columnDoc.exists) {
      res.status(404).send('Column not found');
      return;
    }

    await db.collection('columns').doc(columnId).delete();

    res.send('Column deleted');
  } catch (error) {
    console.error('Error deleting column:', error);
    res.status(500).send('Internal Server Error');
  }
});

// * Actualitzar una columna
router.put('/update-column/:columnId', async (req, res) => {
  try {
    const columnId = req.params.columnId;
    const { title, color } = req.body;

    const columnDoc = await db.collection('columns').doc(columnId).get();

    if (!columnDoc.exists) {
      res.status(404).send('Column not found');
      return;
    }

    await db.collection('columns').doc(columnId).update({
      title,
      color
      // TODO: Puedes agregar más campos para actualizar según tus necesidades
    });

    res.send('Column updated');
  } catch (error) {
    console.error('Error updating column:', error);
    res.status(500).send('Internal Server Error');
  }
});



// ? Endpoints Users (CRUD)
// * Obtenir tots els usuaris
router.get('/users', async (req, res) => {
  try {
    const querySnapshot = await db.collection('users').get();

    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.send(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Internal Server Error');
  }
});

// * Crear un nou usuari
router.post('/new-user', async (req, res) => {
  try {
    const { name, lastname, email, address, tel } = req.body;

    const newUserRef = await db.collection('users').add({
      name,
      lastname,
      email,
      address,
      tel
    });

    const newUserId = newUserRef.id;

    await db.collection('users').doc(newUserId).update({
      id: newUserId
    });

    res.send('New user created');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// * Obtenir un usuari
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
    console.error('Error retrieving user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// * Eliminar un usuari
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
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// * Actualitzar un usuari
router.put('/update-user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, lastname, email, address, tel } = req.body;

    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      res.status(404).send('User not found');
      return;
    }

    await db.collection('users').doc(userId).update({
      name,
      lastname,
      email,
      address,
      tel
    });

    res.send('User updated');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// * Obtenir sugerencies en el buscador de usuaris
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
    console.error(error);
    res.status(500).send('Server error');
  }
});

// ? Enpoints Tasques (CRUD)

// * Obtenir totes les tasques
router.get('/tasques', async (req, res) => {
  
})



module.exports = router;
