'use strict';


module.exports = (sequelize, DataTypes) => {
    var Customer = sequelize.define('Customer', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID
        },
        first_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        phone_number: {
            allowNull: false,
            unique: false,
            type: DataTypes.STRING
        }
    }, {tableName: "customers"});

    Customer.associate = function (models) {
        this.hasMany(models.Call, {as: "calls"});
    };

    return Customer;
};
