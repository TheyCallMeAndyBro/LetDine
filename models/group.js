'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsTo(models.User, { foreignKey: 'userId' })
      Group.hasMany(models.Food, { foreignKey: 'groupId' })
      Group.belongsTo(models.Restaurant, { foreignKey: 'restaurantId' })
      Group.hasMany(models.Order, { foreignKey: 'groupId' })
    }
  }
  Group.init({
    name: DataTypes.STRING,
    note: DataTypes.TEXT,
    done: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Group',
    tableName: 'Groups',
    underscored: true,
  });
  return Group;
};