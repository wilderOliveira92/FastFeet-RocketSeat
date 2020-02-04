import { Sequelize } from 'sequelize';
import databaseCnfig from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';

const models = [User, Recipient];

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
