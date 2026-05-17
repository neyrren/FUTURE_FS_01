const router    = require('express').Router()
const rateLimit = require('express-rate-limit')
const { body }  = require('express-validator')
const ctrl      = require('../controllers/contactController')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 5,
  message: { success: false, message: 'Too many requests. Try again later.' },
})

router.post('/', limiter, [
  body('name').trim().isLength({ min: 2, max: 100 }),
  body('email').trim().isEmail().normalizeEmail(),
  body('subject').trim().isLength({ min: 3, max: 200 }),
  body('message').trim().isLength({ min: 10, max: 2000 }),
], ctrl.submitContact)

router.get('/', ctrl.getContacts)

module.exports = router
