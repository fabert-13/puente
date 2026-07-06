import { pool } from './models/db.js';

export const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS estudiantes (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        dni VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL,
        UNIQUE (dni, email)
      );

      CREATE TABLE IF NOT EXISTS tests (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(200) NOT NULL,
        descripcion TEXT
      );

      CREATE TABLE IF NOT EXISTS respuestas (
        id SERIAL PRIMARY KEY,
        idestudiante INTEGER NOT NULL REFERENCES estudiantes(id) ON DELETE CASCADE,
        idtest INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
        respuesta1 VARCHAR(1),
        respuesta2 VARCHAR(1),
        respuesta3 VARCHAR(1),
        respuesta4 VARCHAR(1),
        respuesta5 VARCHAR(1),
        respuesta6 VARCHAR(1),
        respuesta7 VARCHAR(1),
        respuesta8 VARCHAR(1),
        respuesta9 VARCHAR(1),
        respuesta10 VARCHAR(1),
        respuesta11 VARCHAR(1),
        respuesta12 VARCHAR(1),
        devolucion TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (idestudiante, idtest)
      );

            CREATE TABLE IF NOT EXISTS test_hab_cogni (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(100) NOT NULL,
          apellido VARCHAR(100) NOT NULL,
          dni VARCHAR(20) NOT NULL,
          email VARCHAR(100) NOT NULL,
          respuestas JSONB NOT NULL,
          devoluciones TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS test_orientacion_vocacional (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  dni VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  respuestas JSONB NOT NULL,
  categorias_destacadas TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (dni, email)
);


    `);

    console.log("✅ Tablas creadas correctamente");
  } catch (err) {
    console.error("❌ Error al crear tablas:", err);
  }
};
