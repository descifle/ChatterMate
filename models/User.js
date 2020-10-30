module.exports = (sequelize, datatypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: datatypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        age: {
            type: datatypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })

    return User
}