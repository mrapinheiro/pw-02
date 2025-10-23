import React, { useState } from 'react';

const Register = ({ onRegister }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '', role: 'guest' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }
            alert('Registration successful! You can now login.');
            onRegister(); // callback to close form or switch to login
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="register-form">
            <h3>User Registration</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <div>
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="guest"
                            checked={credentials.role === 'guest'}
                            onChange={handleChange}
                        />
                        Guest
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="admin"
                            checked={credentials.role === 'admin'}
                            onChange={handleChange}
                        />
                        Admin
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Register;
