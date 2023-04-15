'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  car.init({
    nama: DataTypes.STRING,
    sewa_per_hari: DataTypes.INTEGER,
    ukuran: DataTypes.STRING,
    foto: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'car',
  });
  return car;
};