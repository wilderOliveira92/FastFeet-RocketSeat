import Sequelize, { Model } from 'sequelize';

class Signature extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                path: Sequelize.STRING,
                url: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `http://localhost:3000/signature/${this.path}`;
                    },
                },
            },
            {
                sequelize,
                tableName: 'signature',
            }
        );

        return this;
    }
}

export default Signature;
