import express from 'express';
import { crearEstudiante, crearTest, listarRespuestasPorTest, getRespuestasHabCogni } from '../controllers/adminController.js';

const router = express.Router();

router.get("/respuestas/:idTest", listarRespuestasPorTest);
router.get("/respuestasHabCogni", getRespuestasHabCogni);
router.post('/estudiantes', crearEstudiante);
router.post('/tests', crearTest);

export default router;
