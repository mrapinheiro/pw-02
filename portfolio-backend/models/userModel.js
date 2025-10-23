const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');

const getAllUsers = () => {
    if (!fs.existsSync(usersFilePath)) {
        return [];
    }
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
};

const saveUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

const findUserByUsername = (username) => {
    const users = getAllUsers();
    return users.find(u => u.username === username);
};

const createUser = (username, password, role = 'guest') => {
    const users = getAllUsers();
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { username, password: hashedPassword, role };
    users.push(newUser);
    saveUsers(users);
    return newUser;
};

const validatePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

// Seed admin user on first run
if (getAllUsers().length === 0) {
    createUser('admin', 'adminpass', 'admin');
}

module.exports = {
    findUserByUsername,
    createUser,
    validatePassword,
};
