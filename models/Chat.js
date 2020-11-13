module.exports = (sequelize, datatypes) => {
    const Chat = sequelize.define('Chat', {
        comment_id: {
            type: datatypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        commenter: {
            type: datatypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        comment: {
            type: datatypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })

    return Chat
}