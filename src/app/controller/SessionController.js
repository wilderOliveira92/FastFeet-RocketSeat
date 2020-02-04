import User from '../models/User';
import authConfig from '../../config/auth';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            res.status(401).json({ error: 'Validation fails' });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            res.status(401).json({ error: 'User does not exists.' });
        }

        if (!(await user.checkPassword(password))) {
            res.status(401).json({ error: 'User does not match.' });
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
