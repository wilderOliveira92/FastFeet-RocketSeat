import Sequelize, { Model } from 'sequelize'

class DeliveryProblems extends Model {
    static init(sequelize) {
        super.init(
            {
                delivery_id: Sequelize.NUMBER,
                description: Sequelize.STRING
            }, {
            sequelize,
            tableName: 'delivery_problems'
        }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Order, { foreignKey: 'delivery_id', as: 'order' })
    }

}

export default DeliveryProblems;
