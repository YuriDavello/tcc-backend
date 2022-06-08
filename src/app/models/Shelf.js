import Sequelize, { Model } from "sequelize";

class Shelf extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        sections: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        shelfType: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Shelf;
