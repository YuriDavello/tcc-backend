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
    this.hasMany(models.Sector, {
      foreignKey: "product_id",
      as: "product",
    });

    this.hasMany(models.Inventory, {
      foreignKey: "product_id",
      as: "inventories",
    });
  }
}

export default Product;
