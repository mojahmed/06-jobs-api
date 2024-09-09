// const express = require('express')
// const router = express.Router()
// const { register, login } = require('../controllers/auth')
// router.post('/register', register)
// router.post('/login', login)

// module.exports = router

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');

// Add console log to see when the route is accessed
router.post('/register', (req, res, next) => {
  console.log('Register route hit');
  register(req, res, next);
});

router.post('/login', (req, res, next) => {
  console.log('Login route hit');
  login(req, res, next);
});

module.exports = router;

