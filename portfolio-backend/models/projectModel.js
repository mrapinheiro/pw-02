const fs = require('fs');
const path = require('path');

const projectsFilePath = path.join(__dirname, '../data/projects.json');

const getAllProjects = () => {
    if (!fs.existsSync(projectsFilePath)) {
        return [];
    }
    const data = fs.readFileSync(projectsFilePath, 'utf8');
    return JSON.parse(data);
};

const saveProjects = (projects) => {
    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 4));
};

const addProject = (newProject) => {
    const projects = getAllProjects();
    newProject.id = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    projects.push(newProject);
    saveProjects(projects);
    return newProject;
};

const findProjectById = (id) => {
    const projects = getAllProjects();
    return projects.find(p => p.id === id);
};

module.exports = {
    getAllProjects,
    addProject,
};
