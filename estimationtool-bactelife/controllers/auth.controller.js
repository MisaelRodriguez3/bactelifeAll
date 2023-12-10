import Auth from '../models/auth.model.js';
import { ROOT, PASSWORD, SECRET_KEY } from '../config.js';
import bcrypt from 'bcryptjs'; //to encrypt the password
import { createAccesToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';

const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000)

export const register = async (req, res) => {
    const { user, password } = req.body;
    try {
        const passHash = await bcrypt.hash(password, 10)
        const newUser = new Auth({
            user,
            password: passHash
        });
        const userSaved = await newUser.save();
        const token = await createAccesToken({ id: userSaved._id });

        //res.cookie('token', token)
        res.cookie('token', token, { secure: true, sameSite: 'none', Partitioned: true, expires: expirationDate });
        res.json('User created successfully');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'There was an internal server error' });
    }
};

export const login = async (req, res) => {
    const { user, password } = req.body;
    try {

        if (user === ROOT) {
            if (password === PASSWORD) {
                const token = await createAccesToken({ user: 'root' });
                // res.cookie('token', token);
                res.cookie('token', token, { secure: true, sameSite: 'none', Partitioned: true, expires: expirationDate });
                return res.json({ user: 'root' })
            } else { return res.status(400).json({ message: 'incorrect password' }); }
        }
        const userFound = await Auth.findOne({ user });
        if (!userFound) return res.status(400).json({ message: "Incorrect user" });
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect password" })

        const token = await createAccesToken({ id: userFound._id });
        //res.cookie('token', token)
        res.cookie('token', token, { secure: true, sameSite: 'none', Partitioned: true, expires: expirationDate });
        res.json(userFound.user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'There was an internal server error' });
    }
};

export const logout = (req, res) => {
    try {
        //res.cookie('token', null, { expires: new Date(0) });
        res.cookie('token', null, { secure: true, sameSite: 'None', expires: new Date(0) });
        res.json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'There was an internal server error' });
    }
};

export const getAdmins = async (req, res) => {
    try {
        const admins = await Auth.find();
        res.json(admins);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'There was an internal server error' });
    }
}

export const deleteAdmin = async (req, res) => {
    try {
        const admin = await Auth.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).json({ error: 'this member does not exist' });
        }
        res.json('admin deleted')
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'There was an internal server error' });
    }
}

export const updateAdmin = async (req, res) => {
    try {
        if (req.body.password) {
            const passHash = await bcrypt.hash(req.body.password, 10);
            req.body.password = passHash;
        }
        const admin = await Auth.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!admin) {
            return res.status(404).json('this member does not exist');
        };
        res.json(admin);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'There was an internal server error' });
    }
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json('Unauthorized');
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        if (!decoded) {
            return res.status(401).json('Unauthorized');
        }

        if (decoded.user === 'root') {
            return res.json({ user: 'root' });
        }

        const userFound = await Auth.findById(decoded.id);
        if (!userFound) {
            return res.status(401).json('Unauthorized');
        }

        return res.json(userFound.user);
    } catch (error) {
        console.error(error);
        return res.status(401).json('Unauthorized');
    }
};