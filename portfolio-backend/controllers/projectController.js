const { validationResult } = require('express-validator');
const { getAllProjects, addProject } = require('../models/projectModel');

const getProjects = (req, res) => {
    try {
        const projects = getAllProjects();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

const createProject = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tech } = req.body;

    const newProject = {
        title,
        description,
        tech: Array.isArray(tech) ? tech : []
    };

    try {
        const added = addProject(newProject);
        res.status(201).json(added);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add project' });
    }
};

module.exports = {
    getProjects,
    createProject,
};
