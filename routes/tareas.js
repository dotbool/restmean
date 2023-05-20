const { Router } = require('express')
const { create, readTarea, updateTarea, deleteTarea } = require('../controllers/tarea.controller');
const login = require('../middlewares/login');

const router = Router();
router.post("/create", [login], create )
router.get("/read", [login], readTarea )
router.put("/update/:id", [login], updateTarea )
router.delete("/delete/:id", [login], deleteTarea )

module.exports = router