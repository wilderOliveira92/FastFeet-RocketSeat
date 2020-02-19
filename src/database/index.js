import { Sequelize } from 'sequelize';
import databaseCnfig from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Deliveryman from '../app/models/Deliveryman';
import File from '../app/models/File';
import Order from '../app/models/Order';
import Signature from '../app/models/Signature';
import DeliveryProblems from '../app/models/DeliveryProblems';

const models = [User, Recipient, File, Deliveryman, Signature, Order, DeliveryProblems];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseCnfig);
        models.map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();
