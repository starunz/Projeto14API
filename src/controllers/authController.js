import bcrypt from 'bcrypt';
import { v4 as uuid} from 'uuid';
import db from '../db.js';

export async function signUp (req, res) {
    const user = req.body;

    try {
        const email = await db
        .collection('users')
        .findOne( {email: user.email});
        
        if (email) return res.sendStatus(409);

        const passwordHash = bcrypt.hashSync(user.password, 10);

        await db
        .collection('users')
        .insertOne({...user, password: passwordHash})

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}