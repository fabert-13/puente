import { pool } from "../models/db.js";
import { devolucionesAutoconocimiento } from "../data/devoluciones.js";
import { devolucionesGestionTiempo } from "../data/devoluciones.js";
import { devolucionesHabilidadesCognitivas } from "../data/devoluciones.js"; // exporta el objeto de devoluciones


// Guardar respuestas del test vocacional
export const guardarRespuestasOV = async (req, res) => {
  try {
    const { nombre, apellido, dni, email, respuestas, categoriasDestacadas } = req.body;

    if (!nombre || !apellido || !dni || !email || !respuestas) {
      return res.status(400).json({ error: "Faltan datos obligatorios." });
    }

    // Validar si el estudiante ya hizo el test
    const existe = await pool.query(
      "SELECT * FROM test_orientacion_vocacional WHERE dni = $1 OR email = $2",
      [dni, email]
    );

    if (existe.rows.length > 0) {
      return res.status(400).json({ error: "El estudiante ya completó este test." });
    }

    // Insertar las respuestas
    const resultado = await pool.query(
      `INSERT INTO test_orientacion_vocacional
        (nombre, apellido, dni, email, respuestas, categorias_destacadas)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
      [nombre, apellido, dni, email, respuestas, categoriasDestacadas]
    );

    res.status(201).json({
      message: "✅ Respuestas guardadas correctamente",
      data: resultado.rows[0],
    });
  } catch (error) {
    console.error("❌ Error al guardar respuestas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener todas las respuestas (modo admin)
export const obtenerRespuestasOV = async (req, res) => {
  try {
    const { dni } = req.query;

    const query = dni
      ? "SELECT * FROM test_orientacion_vocacional WHERE dni = $1"
      : "SELECT * FROM test_orientacion_vocacional ORDER BY created_at DESC";

    const params = dni ? [dni] : [];

    const result = await pool.query(query, params);

    // 🔹 Si se buscó por DNI, devolvemos un objeto claro con el estado
    if (dni) {
      if (result.rows.length > 0) {
        // Ya existe un test con ese DNI
        return res.json({ existe: true, data: result.rows[0] });
      } else {
        // No existe registro con ese DNI
        return res.json({ existe: false });
      }
    }

    // 🔹 Si no se pasó DNI, devolvemos la lista completa
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener respuestas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};



function calcularDevolucionAutoconocimiento(respuestas) {
  const conteo = { a: 0, b: 0, c: 0, d: 0, e: 0 };

  for (const r of respuestas) {
    const letra = r.toLowerCase();
    if (conteo.hasOwnProperty(letra)) {
      conteo[letra]++;
    }
  }

  // Encontrar la letra con mayor cantidad
  const mayor = Object.entries(conteo).reduce((a, b) =>
    b[1] > a[1] ? b : a
  )[0];

  return (
    devolucionesAutoconocimiento[mayor] ?? "No se pudo calcular la devolución."
  );
}

function calcularDevolucionGestionTiempo(respuestas) {
  const puntaje = { a: 1, b: 2, c: 3, d: 4, e: 0 };
  let total = 0;

  for (const r of respuestas) {
    const letra = r.toLowerCase();
    total += puntaje[letra] ?? 0;
  }

  const promedio = total / respuestas.length;

  // Clasificamos según rango
  if (promedio < 1.6) return devolucionesGestionTiempo["a"];
  if (promedio < 2.6) return devolucionesGestionTiempo["b"];
  if (promedio < 3.6) return devolucionesGestionTiempo["c"];
  return devolucionesGestionTiempo["d"];
}

export const submitTest = async (req, res) => {
  const { nombre, apellido, dni, email, idTest, respuestas } = req.body;

  try {
    // Verificar si ya existe estudiante por DNI y email (ambos deben coincidir)
    const estudianteQuery = await pool.query(
      "SELECT id FROM estudiantes WHERE dni = $1 AND email = $2",
      [dni, email]
    );

    let idEstudiante;

    // Si no existe, lo creamos
    if (estudianteQuery.rows.length === 0) {
      const nuevo = await pool.query(
        "INSERT INTO estudiantes (nombre, apellido, dni, email) VALUES ($1, $2, $3, $4) RETURNING id",
        [nombre, apellido, dni, email]
      );
      idEstudiante = nuevo.rows[0].id;
    } else {
      idEstudiante = estudianteQuery.rows[0].id;

      // ⚠️ Validación adicional: si intenta hacer test 2 sin haber hecho test 1, rechazar
      if (idTest === 2) {
        const hizoTest1 = await pool.query(
          "SELECT 1 FROM respuestas WHERE idestudiante = $1 AND idtest = 1",
          [idEstudiante]
        );
        if (hizoTest1.rows.length === 0) {
          return res.status(400).json({
            error: "Debés completar el Test 1 antes de realizar el Test 2.",
          });
        }
      }
    }

    // Verificar si ya respondió este test
    const yaRespondio = await pool.query(
      "SELECT 1 FROM respuestas WHERE idestudiante = $1 AND idtest = $2",
      [idEstudiante, idTest]
    );
    if (yaRespondio.rows.length > 0) {
      return res.status(400).json({
        error: "Este estudiante ya respondió este test.",
      });
    }

    // Si no hay respuestas aún, es solo validación inicial
    if (!respuestas || respuestas.length === 0) {
      return res.status(200).json({
        message: "Estudiante validado. No se registraron respuestas.",
      });
    }

    // Calcular devolución
    let devolucion = "";
    if (idTest === 1) {
      devolucion = calcularDevolucionAutoconocimiento(respuestas);
    } else if (idTest === 2) {
      devolucion = calcularDevolucionGestionTiempo(respuestas);
    } else {
      devolucion = "Devolución para este test no implementada aún.";
    }

    // Armar query de inserción
    const campos = respuestas.map((_, i) => `respuesta${i + 1}`).join(", ");
    const valores = respuestas.map((_, i) => `$${i + 3}`).join(", ");
    const insertQuery = `
      INSERT INTO respuestas (idestudiante, idtest, ${campos}, devolucion)
      VALUES ($1, $2, ${valores}, $${respuestas.length + 3})
    `;

    await pool.query(insertQuery, [
      idEstudiante,
      idTest,
      ...respuestas,
      devolucion,
    ]);

    console.log(
      `✅ [${new Date().toISOString()}] Respuesta registrada para estudiante ID ${idEstudiante}, test ${idTest}`
    );

    res.status(200).json({ success: true, devolucion });
  } catch (err) {
    console.error("❌ Error al guardar test:", err);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const verificarTest1 = async (req, res) => {
  const { dni } = req.body;

  try {
    // Buscar estudiante solo por DNI
    const estudiante = await pool.query(
      "SELECT id FROM estudiantes WHERE dni = $1",
      [dni]
    );

    if (estudiante.rows.length === 0) {
      return res.status(404).json({ error: "Debes de completar el Test 1: Autoconocimiento antes de realizar este" });
    }

    const idEstudiante = estudiante.rows[0].id;

    // Verificar si respondió el test 1
    const respuesta = await pool.query(
      "SELECT id FROM respuestas WHERE idestudiante = $1 AND idtest = 1",
      [idEstudiante]
    );

    if (respuesta.rows.length === 0) {
      return res
        .status(400)
        .json({ error: "Debés completar el Test 1 antes de hacer este." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("❌ Error en verificación:", err);
    return res
      .status(500)
      .json({ error: "Error interno del servidor al verificar Test 1." });
  }
};


export const guardarTestHabCogni = async (req, res) => {
  try {
    const { nombre, apellido, dni, email, respuestas, devoluciones } = req.body;

    if (!nombre || !apellido || !dni || !email || !respuestas) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const query = `
      INSERT INTO test_hab_cogni (nombre, apellido, dni, email, respuestas, devoluciones)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [nombre, apellido, dni, email, respuestas, devoluciones];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Test guardado correctamente",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error guardando el test" });
  }
};
