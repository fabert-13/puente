import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import testRoutes from './routes/testRoutes.js';
import { pool } from './models/db.js';
import adminRoutes from './routes/adminRoutes.js';
import { createTables } from './initDb.js'; 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/tests', testRoutes);
app.use('/api/admin', adminRoutes);

createTables();


const PORT = process.env.PORT || 3001;

// Verificar conexión a la base de datos
pool.connect()
  .then(client => {
    console.log('✅ Conexión exitosa a la base de datos PostgreSQL');
    client.release(); // Liberamos el cliente de conexión

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar a la base de datos:', err);
  });
