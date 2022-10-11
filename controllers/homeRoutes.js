const router = require('express').Router();

const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const projectData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attibutes: ['name']
                },
                {
                    model: Comment
                }
            ]
        });
        const projects = projectData.map((projects) => projects.get({ plain: true}));
        res.render('homepage', {
            projects, logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

router.get('/projects/:id', async (req, res) => {
    try {
        const projectData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attibutes: ['name'],
                },
                {
                    model: Comment,
                }
            ]
        });
        const projects = projectData.get({ plain: true});
        res.render('projects', {
            ...projects,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            include: [{ model: Blog}],
        });
        const users = userData.get({ plain: true });
        res.render('dashboard', {
            ...users,
            logged_in: true
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;