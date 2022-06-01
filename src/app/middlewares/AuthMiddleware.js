import AuthService from "../services/AuthService";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Token não encontrado",
    });
  }

  const [, token] = authHeader.split(" ");

  const authService = new AuthService();

  try {
    const decodedData = await authService.decrypt(token);
    req.userId = decodedData.user.id;
    req.userType = decodedData.user.userType;
    req.user = decodedData.user;

    return next();
  } catch (err) {
    return res.status(401).json({
      status: 401,
      message: "Token não encontrado",
      description: err,
    });
  }
};
