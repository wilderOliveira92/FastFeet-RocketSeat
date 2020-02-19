import { Op } from 'sequelize';
import * as Yup from 'yup';
import { isBefore, parseISO, startOfHour, isAfter, startOfDay, endOfDay } from 'date-fns'

import Order from '../models/Order'
import Deliveryman from '../models/Deliveryman'


class DeliveriesController {

    async index(req, res) {
        var orders = new Order;
        const id = req.params.id
        const deliveryman = await Deliveryman.findByPk(id);

        if (!deliveryman) {
            return res.json({ error: 'Deliveryman not found.' })
        }

        if (req.deliveries) {
            orders = await Order.findAll({
                where: {
                    deliveryman_id: id,
                    end_date: {
                        [Op.ne]: null
                    }
                }
            });
        } else {
            orders = await Order.findAll({
                where: {
                    deliveryman_id: id,
                    canceled_at: null,
                    end_date: null
                }
            });
        }



        if (!orders) {
            return res.json({ message: 'Not exists orders for this Deliveryman' });
        }

        return res.json(orders)

    }

    async update(req, res) {

        const schema = Yup.object().shape({
            start_date: Yup.date(),
            end_date: Yup.date(),
        })

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' })
        }

        const deliveryman = await Deliveryman.findByPk(req.params.id);

        if (!deliveryman) {
            return res.json({ error: 'Deliveryman not found.' })
        }

        const order = await Order.findByPk(req.params.order_id, {
            where: {
                canceled_at: null
            }
        })

        if (!order) {
            return res.json({ error: 'Order not fount or canceled.' })
        }

        const minHourStart = parseISO('08:00');
        const maxHourStart = parseISO('18:00');

        const { start_date, end_date } = req.body;

        if (start_date) {
            const dateStart = parseISO(start_date)
            if (isBefore(dateStart, new Date()) || isAfter(startOfDay(dateStart), startOfDay(new Date()))) {
                return res.status(401).json({ error: 'Date is not avalable.' })
            }

            const hourStart = startOfHour(dateStart);

            if (isBefore(hourStart, minHourStart) || isAfter(hourStart, maxHourStart)) {
                return res.status(401).json({ error: 'Hour not avalable.' })
            }

            const countOrders = await Order.findAndCountAll({
                where: {
                    id: req.params.order_id,
                    start_date: {
                        [Op.between]: [startOfDay(dateStart), endOfDay(dateStart)]
                    }
                }
            });

            if (countOrders && countOrders.count >= 5) {
                return res.status(401).json({ error: "Deliveryman cannot pick up more than 5 orders." })
            }

        }


        await order.update(req.body);
        return res.json(order)

    }


}

export default new DeliveriesController();
