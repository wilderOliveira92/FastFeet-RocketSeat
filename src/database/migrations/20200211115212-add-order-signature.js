'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('order', 'signature_id', {
            type: Sequelize.INTEGER,
            references: { model: 'signature', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: true,
        });
    },

    down: queryInterface => {
        return queryInterface.removeColumn('order', 'signature_id');
    },
};
