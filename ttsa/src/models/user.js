"use strict";
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: DataTypes.STRING
    },
    {}
  );
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
