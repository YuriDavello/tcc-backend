import AuthService from "../services/AuthService";

class getUserByToken {
  async getUser(req, res) {
    const { token } = req.params;

    const user = await AuthService.decrypt(token);

    return res.json({
      user,
    });
  }
}

export default new getUserByToken();
