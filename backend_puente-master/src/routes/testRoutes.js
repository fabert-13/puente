import express from 'express';
import { submitTest, verificarTest1, guardarTestHabCogni, guardarRespuestasOV, obtenerRespuestasOV} from '../controllers/testController.js';

const router = express.Router();

router.post('/submit', submitTest);
router.post('/submitHabCogni', guardarTestHabCogni);
router.post("/verificar-test1", verificarTest1);
router.post("/orientacion-vocacional", guardarRespuestasOV);
router.get("/orientacion-vocacional", obtenerRespuestasOV);



export default router;
