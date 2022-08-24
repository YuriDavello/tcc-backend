import Sequelize, { Model } from "sequelize";

class Inventory extends Model {
  static init(sequelize) {
    super.init(
      {
        batch: Sequelize.STRING,
        quantity: Sequelize.INTEGER,
        validTill: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Product, {
      foreignKey: "inventory_id",
      as: "inventory",
    });
  }
}

export default Inventory;
