const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4
    },
    username: {
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true
    },
    name: DataTypes.STRING,

    email: {
      type: DataTypes.STRING,
      validate: { isEmail: {msg: 'Email Not Valid'} }
      },
      
    password: DataTypes.STRING,
    phonenumber: {
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true
    },
    gender: DataTypes.STRING,
    profilepicture: DataTypes.BLOB,
    birthdate: DataTypes.DATE,
    notifications: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

  }, {freezeTableName: true});

  users.associate = function(models){
    // Assocations define here
    
    users.hasMany(models.transaction, {
      foreignKey: 'users_id'
    })
    
  }

  return users
}