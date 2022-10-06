import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        category: Sequelize.STRING,
        price: Sequelize.FLOAT,
        weight: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Batch, {
      foreignKey: "product_id",
      as: "product",
    });
  }
}

export default Product;
