const { Router } = require('express');
const { db } = require('../../firebase');

const router = Router();

// * Endpoints Columnes (CRUD)
// ? Obtenir totes les columnes
router.get('/columns', async (req, res) => {
  try {
    const querySnapshot = await db.collection('columns').get();
    const columns = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.send(columns);
  } catch (error) {
    // console.error('Error retrieving columns:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ? Crear una nova columna
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
    // console.error('Error creating column:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ? Obtenir una columna
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
    // console.error('Error retrieving column:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ? Eliminar una columna
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
    // console.error('Error deleting column:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ? Actualitzar una columna
router.put('/update-column/:columnId', async (req, res) => {
  try {
    const columnId = req.params.columnId;
    const columnDoc = await db.collection('columns').doc(columnId).get();

    if (!columnDoc.exists) {
      res.status(404).send('Column not found');
      return;
    }

    await db.collection('columns').doc(columnId).update(req.body);

    res.send('Column updated');
  } catch (error) {
    // console.error('Error updating column:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
