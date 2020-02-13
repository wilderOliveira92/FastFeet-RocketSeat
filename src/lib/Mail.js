import nodemailer from 'nodemailer';
import nodemailerhbs from 'nodemailer-express-handlebars';
import exphbs from 'express-handlebars';

import mailConfig from '../config/mail';
import { resolve } from 'path';

class Mail {

    constructor() {
        const { host, port, secure, auth } = mailConfig;

        this.trasporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: auth.user ? auth : null
        });

        this.configureTemplates();

    }

    configureTemplates() {
        const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

        this.trasporter.use(
            'compile',
            nodemailerhbs({
                viewEngine: exphbs.create({
                    layoutsDir: resolve(viewPath, 'layouts'),
                    partialsDir: resolve(viewPath, 'partials'),
                    defaultLayout: 'default',
                    extname: '.hbs'
                }),
                viewPath,
                extname: '.hbs'
            })
        );

    }

    sendEmail(message) {
        return this.trasporter.sendMail({
            ...mailConfig.default,
            ...message
        })
    }

}

export default new Mail();
