const router = require('express').Router();

const userRoutes = require('./userRoutes');

const commentRoutes = require('./commentRoutes');

const projectRoutes = require('./projectRoutes');

router.use('/user', userRoutes);

router.use('/comments', commentRoutes);

router.use('/projects', projectRoutes);


module.exports = router;
