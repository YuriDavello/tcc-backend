import Sequelize, { Model } from "sequelize";

class Shelf extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        floors: Sequelize.INTEGER,
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
      as: "shelf",
    });
  }
}

export default Shelf;
