import User from "../../models/User";

const props = {
  attributes: ["id", "name", "email", "userType"],
};
class UserService {
  async get({ email }) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async findByPk(id) {
    const user = await User.findByPk(id, { ...props });
    if (!user) return false;

    return user;
  }

  async create({ user }, transaction) {
    const newUser = await User.create(user, {
      transaction,
    });
    return newUser;
  }

  async delete(id, transaction) {
    const user = await User.findByPk(id);
    if (!user) return false;

    await User.destroy({ where: { id }, transaction });

    return true;
  }

  async list() {
    const users = await User.findAll({
      order: [["name", "ASC"]],
      ...props,
    });
    return users;
  }
}
export default UserService;
