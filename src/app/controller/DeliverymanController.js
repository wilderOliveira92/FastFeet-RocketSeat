import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import * as Yup from 'yup';

class DeliverymanController {
    async store(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' })
        }

        const DelivExists = await Deliveryman.findOne({
            where: {
                email: req.body.email
            }
        })

        if (DelivExists) {
            return res.status(400).json({ error: 'Deliveryman already exists.' })
        }

        const { id, name, email } = await Deliveryman.create(req.body);
        return res.json({ id, name, email });


    }

    async index(req, res) {

        const deliverys = await Deliveryman.findAll({
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path', 'url']
                }
            ]
        });

        return res.json(deliverys);

    }

    async update(req, res) {

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' })
        }

        const deliveryman = await Deliveryman.findByPk(req.params.id);

        if (!deliveryman) {
            return res.status(400).json({ error: 'Deliveryman not found.' })
        }

        const { id, name, email, avatar_id } = await deliveryman.update(req.body);
        return res.json({ id, name, email, avatar_id });


    }

    async delete(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' })
        }

        const deliveryman = await Deliveryman.findByPk(req.params.id);

        if (!deliveryman) {
            return res.status(400).json({ error: 'Deliveryman not found.' })
        }

        const { id, name, email, avatar_id } = await deliveryman.delete(req.body);
        return res.json({ id, name, email, avatar_id });
    }
}

export default new DeliverymanController();
