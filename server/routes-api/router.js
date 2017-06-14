const router = require('express').Router();
const DobJobsController = require('./dob-jobs.controller');
const controller = new DobJobsController();

router.get('/', controller.getDobJobs);
router.get('/job/:jobId', controller.getJob);
router.get('/schema', controller.getSchema);

module.exports = router;
