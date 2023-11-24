'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Food.belongsTo(models.Group, { foreignKey: 'groupId' })
    }
  }
  Food.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Food',
    tableName: 'Foods',
    underscored: true,
  });
  return Food;
};