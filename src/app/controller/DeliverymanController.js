import Deliveryman from '../models/Deliveryman';
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

        const deliverys = await Deliveryman.findAll();

        return res.json(deliverys);

    }

    async update(req, res) { }

    async delete(req, res) { }
}

export default new DeliverymanController();
