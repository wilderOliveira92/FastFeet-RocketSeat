import { Op } from 'sequelize';
import * as Yup from 'yup';


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

        const deliveryman = await Deliveryman.findByPk(id);

        if (!deliveryman) {
            return res.json({ error: 'Deliveryman not found.' })
        }

        const order = await Order.findByPk({
            where: {
                id: req.order_id,
                canceled_at: null
            }
        })

        if (!order) {
            return res.json({ error: 'Order not fount or canceled.' })
        }

        await order.update(re.body);
        order.save();

        return res.json(order)

    }


}

export default new DeliveriesController();
