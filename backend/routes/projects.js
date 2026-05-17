const router = require('express').Router()
const ctrl   = require('../controllers/projectController')

router.get('/',         ctrl.getProjects)
router.get('/featured', ctrl.getFeatured)
router.post('/',        ctrl.createProject)

module.exports = router
