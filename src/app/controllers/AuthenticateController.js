import jwt from "jsonwebtoken";
import User from "../models/User";

class AuthenticateController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(400).json({ message: "Email e/ou senha inválido(s)" });

    if (!(await user.validPassword(password))) {
      return res.status(400).json({ message: "Email e/ou senha inválido(s)" });
    }

    const { id, name, userType } = user;

    return res.json({
      user: {
        id,
        name,
        userType,
        email,
      },
      authorizationToken: jwt.sign({ id }, process.env.KEY, {
        expiresIn: "1d",
      }),
    });
  }
}

export default new AuthenticateController();
