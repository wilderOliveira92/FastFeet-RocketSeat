import DeliveryProblems from '../models/DeliveryProblems'
import Order from '../models/Order';


import * as Yup from 'yup'

class DeliveryProblemsController {
    async store(req, res) {

        const schema = Yup.object().shape({
            description: Yup.string().required()
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validations Fails.' })
        }

        const order = Order.findByPk(req.params.id);
        if (!order) {
            res.status(401).json({ error: 'Order not found.' })
        }

        const deliveryPrombem = await DeliveryProblems.create({
            delivery_id: req.params.id,
            description: req.body.description
        });

        return res.json(deliveryPrombem);
    }

    async index(req, res) {

        const deliveryPrombems = await DeliveryProblems.findAll({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Order,
                    as: 'order'

                }
            ]
        })

        if (!deliveryPrombems) {
            return res.status(401).json({ error: 'Problems not found for this id.' })
        }

        return res.json(deliveryPrombems);

    }

    async update(req, res) { return res.json() }

    async delete(req, res) {

        const order = await Order.findByPk(req.params.id);
        if (!order) {
            res.status(401).json({ error: 'Order not found.' })
        }

        order.canceled_at = new Date();
        await order.save();

        return res.json(order);

    }
}

export default new DeliveryProblemsController();
