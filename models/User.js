module.exports = (sequelize, datatypes) => {
    const User = sequelize.define('User', {
        userName: {
            type: datatypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        googleId: {
            type: datatypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }

        },
        password: {
            type: datatypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        }
    })

    return User
}