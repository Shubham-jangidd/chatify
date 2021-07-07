const express = require('express');
const router = express.Router();
const {ensureAuthenticated }= require('../config/auth');


// welcome page
router.get('/',(req, res)=> res.render('welcome'));

// dashboard
router.get('/dashboard',ensureAuthenticated, (req, res)=> res.render('dashboard',{

	name: req.user.name

}));
// chatify
router.get('/chatify',ensureAuthenticated, (req, res)=> res.sendFile('/home/shubham/projects/web development/chat-project/auth/views/index.html',{

	name: req.user.name

}));

module.exports = router;

	