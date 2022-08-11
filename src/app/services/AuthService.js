import jwt from "jsonwebtoken";
import { promisify } from "util";

import User from "../models/User";

class AuthService {
  async decrypt(authToken) {
    if (!authToken) {
      throw new Error("Token não encontrado");
    }

    try {
      const decoded = await promisify(jwt.verify)(authToken, process.env.KEY);

      const user = await User.findByPk(decoded.id);

      if (!user) throw new Error("Token de usuário inválido");

      return {
        user,
      };
    } catch (err) {
      throw new Error("Token não encontrado");
    }
  }
}

export default new AuthService();
