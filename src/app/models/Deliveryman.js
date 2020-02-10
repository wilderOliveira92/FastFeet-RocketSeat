import Sequelize, { Model } from 'sequelize';

class DeliveryMan extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.toString,
                email: Sequelize.STRING,
            },
            {
                sequelize,
                tablename: 'deliveryman',
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    }
}

export default DeliveryMan;
