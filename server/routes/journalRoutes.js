const router = require('express').Router();

const JournalController = require('../controllers/JournalController');


router.get('/', JournalController.getAllEntries);

router.post('/', JournalController.saveEntry);

router.put('/:id', JournalController.updateEntry);

router.delete('/:id', JournalController.deleteEntry);

module.exports = router;