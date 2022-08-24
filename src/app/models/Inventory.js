import Sequelize, { Model } from "sequelize";

class Inventory extends Model {
  static init(sequelize) {
    super.init(
      {
        batch: Sequelize.STRING,
        quantity: Sequelize.INTEGER,
        validTill: Sequelize.DATE,
        productId: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
  }
}

export default Inventory;
