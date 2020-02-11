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
                        return `http://localhost:3333/signature/${this.path}`;
                    },
                },
            },
            {
                sequelize,
            }
        );

        return this;
    }
}

export default Signature;
