import Recipient from '../models/Recipient';
import * as Yup from 'yup';

class RecipientController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            rua: Yup.string().required(),
            numero: Yup.number().required(),
            complemento: Yup.string().required(),
            estado: Yup.string().required(),
            cidade: Yup.string().required(),
            cep: Yup.number()
                .required()
                .min(8),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const recipientExists = await Recipient.findOne({
            where: { cep: req.body.cep },
        });

        if (recipientExists) {
            return res.status(401).json({ error: 'Recipient already exists.' });
        }

        const {
            name,
            rua,
            numero,
            complemento,
            estado,
            cidade,
            cep,
        } = Recipient.create(req.body);

        return res.json({
            name,
            rua,
            numero,
            complemento,
            estado,
            cidade,
            cep,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            id: Yup.number().required(),
            name: Yup.string(),
            rua: Yup.string(),
            numero: Yup.number(),
            complemento: Yup.string(),
            estado: Yup.string(),
            cidade: Yup.string(),
            cep: Yup.number().min(8),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ errr: 'Validation fails' });
        }

        const recipient = await Recipient.findByPk(req.body.id);

        if (!recipient) {
            return res.status(401).json({ error: 'Recipient not exists.' });
        }

        const {
            name,
            rua,
            numero,
            complemento,
            estado,
            cidade,
            cep,
        } = await recipient.update(req.body);

        res.json({
            name,
            rua,
            numero,
            complemento,
            estado,
            cidade,
            cep,
        });
    }

    async delete(req, res) {}

    async index(req, res) {}
}

export default new RecipientController();
