import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
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
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        userType: Sequelize.INTEGER,
        rawPassword: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.rawPassword)
        user.password = await bcrypt.hash(user.rawPassword, 8);
    });

    return this;
  }

  async validPassword(password) {
    const compare = await bcrypt.compare(password, this.password);

    return compare;
  }
}

export default User;
