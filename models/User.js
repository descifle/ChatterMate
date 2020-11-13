module.exports = (sequelize, datatypes) => {
    const User = sequelize.define('User', {
        userName: {
            type: datatypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: datatypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })

    return User
}