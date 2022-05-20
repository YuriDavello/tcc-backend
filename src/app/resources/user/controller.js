import User from "../../models/User";
import UserService from "./service";

class UserController {
  async create(req, res) {
    const { name, password, email, userType } = req.body;

    const userService = new UserService();

    const user = await userService.get({ email });
    if (user) return res.status(400).json({ message: "E-mail já cadastrado" });

    const newUser = await userService.create({
      name,
      email,
      password,
      rawPassword: password,
      userType,
    });

    return res.json(newUser);
  }

  async list(req, res) {
    const userService = new UserService();
    const users = await userService.list();
    res.json(users);
  }

  async get(req, res) {
    const { id } = req.params;

    const userService = new UserService();

    const user = await userService.findByPk(id);

    if (!user)
      return res
        .status(400)
        .json({ status: 400, message: "Usuário não encontrado" });

    return res.json(user);
  }

  async delete(req, res) {
    const { id } = req.params;

    const userService = new UserService();

    const user = await userService.delete(id);
    if (!user) return res.status(400).json({ message: "Usuário não existe" });

    return res.sendStatus(204);
  }

  async update(req, res) {
    const { id } = req.params;
    const { email } = req.body;

    const userService = new UserService();

    const user = await userService.findByPk(id);

    if (!user) return res.status(400).json({ message: "Usuário inexistente" });

    if (email !== user.email) {
      const userEmail = await userService.get({ email });
      if (userEmail)
        return res.status(400).json({ message: "E-mail já cadastrado" });
    }

    await user.update({
      ...req.body,
    });

    const response = await userService.findByPk(id);

    return res.json(response);
  }
}

export default new UserController();
