import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import OrderMail from '../jobs/OrderMail';

import Queue from '../../lib/queue';
import Mail from '../../lib/Mail';

import * as Yup from 'yup';

import { startOfHour, parseISO, isBefore, format, subHours, isAfter } from "date-fns";
import pt from "date-fns/locale/pt";

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

        const order = await Order.findAll({
            where: { id },
            include: [
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: ['id', 'name', 'rua']
                },
                {
                    model: Deliveryman,
                    as: 'deliveryman',
                    attributes: ['id', 'name', 'email']
                }
            ]
        })


        await Queue.add(OrderMail.key, {
            order
        });

        /*
                await Mail.sendEmail({
                    to: `teste <wilder@teste.com>`,
                    subject: 'Nova encomenda',
                    template: 'newOrder',
                    context: {
                        deliveryman: 'teste',
                        recipient: 'teste2',
                        date: '22/02/2020',
                        rua: 'teste'

                    }
                });
        */
        return res.json({
            id, recipient_id, deliveryman_id, product
        });

    }

    async index(req, res) {

        const order = await Order.findAll({
            where: {
                id: req.params.id1
            },
            include: [
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: ['id', 'name', 'rua']
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

        const { id, recipient, deliveryman, product, canceled_at, start_date, end_date } = order;

        return res.json({
            order
        });

    }

    async update(req, res) {

        const schema = Yup.object().shape({
            recipient_id: Yup.number(),
            product: Yup.string().required(),
            canceled_at: Yup.date(),
            start_date: Yup.date(),
            end_date: Yup.date()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' })
        }

        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(400).json({ error: 'Order not exists.' })
        }

        const { start_date } = req.body;


        if (start_date != null) {
            const hourStart = startOfHour(parseISO(start_date))

            if (isAfter(hourStart, '08:00') || isBefore(hourStart, '18:00')) {
                return res.status(400).json({ error: 'Informed hour not allowed.' })
            }

        }

        const { id, recipient_id, deliveryman_id, product, canceled_at, end_date } = await order.update(req.body);

        return res.json({
            id, recipient_id, deliveryman_id, product, canceled_at, end_date, start_date
        });
    }

    async delete(req, res) {

        const order = await Order.findByPk(req.params.id);

        if (!order) {
            return res.status(400).json({ error: 'Order not exists.' })
        }

        order.canceled_at = new Date();
        order.save();

        return res.json(order);
    }
}

export default new OrderController();
