import Shelf from "../../models/Shelf";
import ShelfService from "./service";

class ShelfController {
  async create(req, res) {
    const { name, sections, type, code } = req.body;

    const shelfService = new ShelfService();

    const shelf = await shelfService.get({ code });
    if (shelf)
      return res.status(400).json({ message: "Código já cadastrado!" });

    const newShelf = await userService.create({
      name,
      sections,
      code,
      type,
    });

    return res.json(newShelf);
  }

  async list(req, res) {
    const shelfService = new ShelfService();
    const shelves = await shelfService.list();
    res.json(shelves);
  }

  async get(req, res) {
    const { id } = req.params;

    const shelfService = new ShelfService();

    const shelf = await shelfService.findByPk(id);

    if (!shelf)
      return res
        .status(400)
        .json({ status: 400, message: "Prateleira não encontrada" });

    return res.json(shelf);
  }

  async delete(req, res) {
    const { id } = req.params;

    const shelfService = new ShelfService();

    const shelf = await shelfService.delete(id);
    if (!shelf)
      return res.status(400).json({ message: "Prateleira não existe" });

    return res.sendStatus(204);
  }

  async update(req, res) {
    const { id } = req.params;
    const { code } = req.body;

    const shelfService = new ShelfService();

    const shelf = await shelfService.findByPk(id);

    if (!shelf)
      return res.status(400).json({ message: "Prateleira inexistente" });

    if (code !== shelf.code) {
      const shelfCode = await shelfService.get({ code });
      if (shelfCode)
        return res
          .status(400)
          .json({ message: "Código já existente em outra prateleira" });
    }

    await shelf.update({
      ...req.body,
    });

    const response = await shelfService.findByPk(id);

    return res.json(response);
  }
}

export default new ShelfController();
