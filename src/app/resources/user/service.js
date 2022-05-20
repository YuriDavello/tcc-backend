import User from "../../models/User";

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
    const user = await User.findByPk(id);
    if (!user) return false;

    return user;
  }

  async create({ name, password, email, userType }, transaction) {
    const newUser = await User.create(
      {
        name,
        password,
        email,
        rawPassword: password,
        userType,
      },
      {
        transaction,
      }
    );
    return newUser;
  }

  async delete(id, transaction) {
    const user = await User.findByPk(id);
    if (!user) return false;

    await User.destroy({ where: { id }, transaction });

    return true;
  }

  async update({ id, name, password, email, userType }, transaction) {
    const userUpdated = await User.update(
      {
        name,
        password,
        email,
        rawPassword: password,
        userType,
      },
      {
        where: {
          id,
        },
        transaction,
      }
    );

    return userUpdated;
  }

  async list() {
    const users = await User.findAll({
      order: [["name", "ASC"]],
    });
    return users;
  }
}
export default UserService;
