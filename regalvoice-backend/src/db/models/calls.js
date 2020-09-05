'use strict';


module.exports = (sequelize, DataTypes) => {
    var Call = sequelize.define('Call', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID
        },
        customerId: {
          allowNull: false,
          type: DataTypes.UUID
        },
        callSid: {
          allowNull: false,
          type: DataTypes.STRING
        },
        callStatus: {
          allowNull: false,
          type: DataTypes.STRING,
          defaultValue: 'in-progress'
        },
        answered: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        voicemail_detected: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        declined: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
          defaultValue: false
        }
    }, {tableName: "calls"});

    Call.associate = function(models) {
        this.belongsTo(models.Customer, {
            foreignKey: 'customerId',
            as: 'customer'
        });
      };

    return Call;
};
