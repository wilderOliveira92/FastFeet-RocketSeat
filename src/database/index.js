import { Sequelize } from 'sequelize';
import databaseCnfig from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Deliveryman from '../app/models/Deliveryman';
import File from '../app/models/File';

const models = [User, Recipient, File, Deliveryman];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseCnfig);
        models.map(model => model.init(this.connection));
    }
}

export default new Database();
