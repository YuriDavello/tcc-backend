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
        },
        code: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        sections: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      {
        sequelize,
      }
    );
  }
}

export default Shelf;
