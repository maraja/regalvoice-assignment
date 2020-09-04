module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable("calls", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID
        },
        customerId: {
          allowNull: false,
          type: DataTypes.UUID
        },
        answered: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
          defaultValue: false
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
        voicemail_detected: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        declined: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        deletedAt: {
            allowNull: true,
            type: DataTypes.DATE
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {charset: "utf8"})
}

module.exports.down = queryInterface => queryInterface.dropTable("calls");

