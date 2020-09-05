'use strict';


module.exports = (sequelize, DataTypes) => {
    var Admin = sequelize.define('Admin', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID
        },
        first_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        last_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        passwordHash: {
            allowNull: true,
            type: DataTypes.CHAR(64)
        }
    }, {tableName: "admins",
        defaultScope: {
            rawAttributes: {
                exclude: ["passwordHash"]
            }
        }
    });

    return Admin;
};
