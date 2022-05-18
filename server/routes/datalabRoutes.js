const router = require('express').Router();

const DatalabController = require('../controllers/DatalabController');


router.get('/backcare/data', DatalabController.getBackcareData);

router.post('/backcare/data', DatalabController.saveBackcareData);

router.get('/backcare/model', DatalabController.getBackcareModel);

router.put('/backcare/model', DatalabController.saveBackcareModel);

router.patch('/backcare/model', DatalabController.updateBackcareModel);

module.exports = router;