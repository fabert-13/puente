import { pool } from '../models/db.js';

// Crear estudiante manualmente
export const crearEstudiante = async (req, res) => {
  const { nombre, apellido, dni, email } = req.body;

  try {
    const existe = await pool.query(
      'SELECT * FROM estudiantes WHERE dni = $1 AND email = $2',
      [dni, email]
    );

    if (existe.rows.length > 0) {
      return res.status(400).json({ error: 'El estudiante ya existe.' });
    }

    const result = await pool.query(
      'INSERT INTO estudiantes (nombre, apellido, dni, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, apellido, dni, email]
    );

    res.status(201).json({ success: true, estudiante: result.rows[0] });

  } catch (err) {
    console.error('Error creando estudiante:', err);
    res.status(500).json({ error: 'Error al crear el estudiante.' });
  }
};

// Crear test
export const crearTest = async (req, res) => {
  const { titulo, descripcion } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO tests (titulo, descripcion) VALUES ($1, $2) RETURNING *',
      [titulo, descripcion]
    );

    res.status(201).json({ success: true, test: result.rows[0] });

  } catch (err) {
    console.error('Error creando test:', err);
    res.status(500).json({ error: 'Error al crear el test.' });
  }
};


// Listar tests
export const listarRespuestasPorTest = async (req, res) => {
  const { idTest } = req.params;

  if (!idTest || isNaN(idTest)) {
    return res.status(400).json({ error: "ID de test inválido." });
  }

  try {
    const query = `
      SELECT 
        r.id,
        r.idtest,
        r.devolucion,
        r.created_at,
        e.nombre,
        e.apellido,
        e.dni,
        e.email,
        r.respuesta1, r.respuesta2, r.respuesta3, r.respuesta4, r.respuesta5,
        r.respuesta6, r.respuesta7, r.respuesta8, r.respuesta9, r.respuesta10,
        r.respuesta11, r.respuesta12
      FROM respuestas r
      JOIN estudiantes e ON r.idestudiante = e.id
      WHERE r.idtest = $1
      ORDER BY r.created_at DESC;
    `;

    const { rows } = await pool.query(query, [idTest]);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error al obtener respuestas:", err);
    res.status(500).json({ error: "Error al obtener respuestas del test." });
  }
};



// controllers/adminController.js
export const getRespuestasHabCogni = async (req, res) => {
  try {
    const query = `
      SELECT id, nombre, apellido, dni, email, respuestas, devoluciones
      FROM test_hab_cogni
      ORDER BY id ASC;
    `;
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No se encontraron respuestas" });
    }

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener respuestas:", error);
    res.status(500).json({ error: "Error al obtener respuestas del test" });
  }
};
