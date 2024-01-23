const { Router } = require('express');
const { db } = require('../../firebase');

const router = Router();

// * Endpoints Tasques (CRUD)
// ? Obtenir totes les tasques
router.get('/tasks', async (req, res) => {
  try {
    const querySnapshot = await db.collection('tasks').get();

    const tasks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.send(tasks);
  } catch (error) {
    // console.error('Error retrieving tasks:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ? Crear una nova tasca
router.post('/new-task', async (req, res) => {
  try {
    const { id, column_id, user_id, text, desc } = req.body; // TODO: Canvia el atribut 'text' a 'name'

    const newTaskRef = await db.collection('tasks').add({
      id,
      column_id,
      user_id,
      text,
      desc
    });

    // Obtener el ID del document acabat de crear
    const newTaskId = newTaskRef.id;

    // Actualizar el document acabat de crear amb el seu propi ID
    await db.collection('tasks').doc(newTaskId).update({
      id: newTaskId
    });

    res.send('New task created');
  } catch (error) {
    // console.error('Error creating task:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ? Obtenir una tasca
router.get('/get-task/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const taskDoc = await db.collection('tasks').doc(taskId).get();

    if (!taskDoc.exists) {
      res.status(404).send('Task not found');
      return;
    }

    const taskData = {
      id: taskDoc.id,
      ...taskDoc.data()
    };

    res.send(taskData);
  } catch (error) {
    // console.error('Error retrieving task:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ? Eliminar una tasca
router.delete('/delete-task/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const taskDoc = await db.collection('tasks').doc(taskId).get();

    // Verfiquem si la tasca existeix abans de eliminarla
    if (!taskDoc.exists) {
      res.status(404).send('Task not found');
      return;
    }

    await db.collection('tasks').doc(taskId).delete();

    res.send('Task deleted');
  } catch (error) {
    // console.error('Error deleting task:', error);
    res.status(500).send('Internal Server Error');
  }
});

// ? Actualitzar una tasca
router.put('/update-task/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    
    const taskDoc = await db.collection('tasks').doc(taskId).get();

    if (!taskDoc.exists) {
      res.status(404).send('Task not found');
      return;
    }

    await db.collection('tasks').doc(taskId).update(req.body);

    res.send('Task updated');
  } catch (error) {
    // console.error('Error updating task:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
