import Sequelize, { Model } from "sequelize";

class Batch extends Model {
  static init(sequelize) {
    super.init(
      {
        code: Sequelize.STRING,
        productId: Sequelize.INTEGER,
        productQuantity: Sequelize.INTEGER,
        validTill: Sequelize.DATE,
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
      as: "batches",
    });
  }
}

export default Batch;
