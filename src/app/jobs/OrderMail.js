import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class OrderMail {

    get key() {
        return 'OrderMail';
    }

    async handle({ data }) {
        const { order } = data;

        await Mail.sendEmail({
            to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
            subject: 'Nova encomenda',
            template: 'newOrder',
            context: {
                deliveryman: order.deliveryman.name,
                recipient: order.recipient.name,
                rua: 'teste',
                date: format(new Date(), "'dia' dd 'de' MMMM', às ' H:mm'h'", { locale: pt })

            }
        })
    }

}

export default new OrderMail();
