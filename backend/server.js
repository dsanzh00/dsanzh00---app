const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Configurar CORS para permitir solicitudes desde el cliente Vue.js
app.use(cors());

// Middleware para analizar el cuerpo de la solicitud
app.use(express.json());

// Configurar conexión con la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tfg12345',
  database: 'drwriting',
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conexión exitosa con la base de datos');
  }




// OBTENER TODOS LOS USUARIOS
app.get('/items', (req, res) => {
    const query = 'SELECT * FROM usuarios'; // Cambia "items" por el nombre de tu tabla
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener los elementos:', err);
        res.status(500).json({ error: 'Error al obtener los elementos' });
      } else {
        res.json(results);
      }
    });
  });

});

app.get('/usuarios/nosuper', (req, res) => {
  const query = 'SELECT * FROM drwriting.usuarios WHERE type != ?';
  connection.query(query, ['super'], (err, results) => {
    if (err) {
      console.error('Error al obtener los elementos:', err);
      res.status(500).json({ error: 'Error al obtener los elementos' });
    } else {
      res.json(results);
    }
  });
});

// Ruta para obtener los usuarios de tipo "worker"
app.get('/usuarios/workers', (req, res) => {
  const query = 'SELECT * FROM drwriting.usuarios WHERE type = ?';
  connection.query(query, ['worker'], (err, results) => {
    if (err) {
      console.error('Error al obtener los elementos:', err);
      res.status(500).json({ error: 'Error al obtener los elementos' });
    } else {
      res.json(results);
    }
  });
});

// Configuración de la ruta para obtener un usuario por su ID
app.get('/usuarios/:id', (req, res) => {
  const userId = req.params.id;

  // Realiza una consulta a la base de datos para obtener el usuario por su ID
  const sql = 'SELECT * FROM drwriting.usuarios WHERE id = ?';
  connection.query(sql, [userId], (error, results) => {
    if (error) throw error;

    // Verifica si se encontró un usuario con el ID dado
    if (results.length > 0) {
      const usuario = results[0];
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  });
});





// Aquí puedes agregar tus rutas y lógica del servidor
// Ruta para el INICIO DE SESIÓN
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Realizar la consulta en la base de datos para verificar las credenciales
  const query = 'SELECT * FROM drwriting.usuarios WHERE username = ? AND password = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error al realizar la consulta:', err);
      res.status(500).json({ error: 'Error al realizar la consulta' });
    } else {
      if (results.length > 0) {
        // Credenciales válidas
        const userType = results[0].type; // Obtener el tipo de usuario de los resultados de la consulta
        const id = results[0].id;
        const username = results[0].username;

        res.json({ success: true, userType, id, username });
      } else {
        // Credenciales inválidas
        res.status(401).json({ error: 'Credenciales inválidas' });
      }
    }
  });
});


//BORRAR USUARIOS
app.delete('/usuarios/:id', (req, res) => {
  const userId = req.params.id;

  // Realizar la consulta para eliminar el usuario por su ID
  const query = 'DELETE FROM drwriting.usuarios WHERE id = ?';
  connection.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Error al eliminar el usuario:', err);
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    } else {
      if (result.affectedRows > 0) {
        // Usuario eliminado correctamente
        res.json({ success: true });
      } else {
        // No se encontró el usuario con el ID especificado
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    }
  });
});


//  EDITAR  USUARIOS
app.put('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  const { fullname, username, password, type, userGroup} = req.body;

  const sql = `UPDATE drwriting.usuarios SET fullname = ?, username = ?, password = ?, type = ?, userGroup = ? WHERE id = ?`;
  const values = [fullname, username, password, type, userGroup, userId];

  connection.query(sql, values, (error, results) => {
    if (error) throw error;
    console.log(`Usuario actualizado con ID: ${userId}`);
    res.send('Usuario actualizado correctamente');
  });
});



// REGISTRO DE NUEVO USUARIO
app.post('/usuarios', (req, res) => {
  const { fullname, username, password, type, userGroup } = req.body;

  // Verificar si el usuario ya existe en la base de datos
  const checkUserQuery = 'SELECT * FROM drwriting.usuarios WHERE username = ?';
  connection.query(checkUserQuery, [username], (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      // El usuario ya existe
      res.status(409).json({ error: 'El usuario ya está registrado' });
    } else {
      // El usuario no existe, se puede registrar
      const insertUserQuery = 'INSERT INTO usuarios (fullname, username, password, type, userGroup) VALUES (?, ?, ?, ?, ?)';
      connection.query(insertUserQuery, [fullname, username, password, type, userGroup], (error, results) => {
        if (error) throw error;

        const newUserId = results.insertId;
        res.status(201).json({ message: 'Usuario registrado con éxito', userId: newUserId });
      });
    }
  });
});


// Ruta para obtener los usuarios de tipo "worker"
app.get('/usuarios', (req, res) => {
  // Realiza una consulta a la base de datos para obtener los usuarios de tipo "worker"
  const sql = 'SELECT * FROM drwriting.usuarios WHERE type = ?';
  connection.query(sql, ['worker'], (error, results) => {
    if (error){
      console.log("errorrrrrrr")
      throw error;
    }else{
      res.json(results);
    }    
  });
});



// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log('Servidor backend escuchando en el puerto', port);
});
