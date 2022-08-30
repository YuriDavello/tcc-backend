import Sequelize, { Model } from "sequelize";

class Shelf extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        shelfType: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Floor, {
      foreignKey: "shelf_id",
      as: "floors",
    });
  }
}

export default Shelf;
