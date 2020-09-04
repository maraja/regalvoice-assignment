module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable("customers", {
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

module.exports.down = queryInterface => queryInterface.dropTable("customers");

