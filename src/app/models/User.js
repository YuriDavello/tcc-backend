import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
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
