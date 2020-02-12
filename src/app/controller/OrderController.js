import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import * as Yup from 'yup';

class OrderController {
    async store(req, res) {

        const schema = Yup.object().shape({
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
            product: Yup.string().required(),
            canceled_at: Yup.date(),
            start_date: Yup.date(),
            end_date: Yup.date()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' })
        }

        const orderExists = await Order.findOne({
            where: {
                recipient_id: req.body.recipient_id,
                deliveryman_id: req.body.deliveryman_id,
                product: req.body.product,
                canceled_at: null,
            }
        });

        if (orderExists) {
            return res.status(400).json({ error: 'Order already exists.' })
        }

        const { id, recipient_id, deliveryman_id, product } = await Order.create(req.body);

        return res.json({
            id, recipient_id, deliveryman_id, product
        });

    }

    async index(req, res) {

        const order = await Order.findAll({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: ['id,', 'name', 'rua']
                },
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: ['id', 'name']
                }
            ]
        })

        if (!order) {
            return res.status(400).json({ error: 'Order not found.' })
        }

        const { id, } = order;

        return res.json();
    }

    async update(req, res) {
        return res.json();
    }

    async delete(req, res) {
        return res.json();
    }
}

export default new OrderController();
