import Shelf from "../../models/Shelf";
import ShelfService from "./service";

class ShelfController {
  async list(req, res) {
    const shelfService = new ShelfService();
    const shelves = await shelfService.list();
    res.json(shelves);
  }

  async create(req, res) {
    const { name, sections, shelfType } = req.body;

    const shelfService = new ShelfService();

    const shelf = await shelfService.get({ name });
    if (shelf)
      return res
        .status(400)
        .json({ message: "Nome já pertence à outra prateleira" });

    const newShelf = await shelfService.create({
      name,
      sections,
      shelfType,
    });

    return res.json(newShelf);
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
    const { name } = req.body;

    const shelfService = new ShelfService();

    const shelf = await shelfService.findByPk(id);

    if (!shelf)
      return res.status(400).json({ message: "Prateleira inexistente" });

    if (name !== shelf.name) {
      const shelfName = await shelfService.get({ name });
      if (shelfName)
        return res
          .status(400)
          .json({ message: "Outra prateleira já possui esse nome" });
    }

    await shelf.update({
      ...req.body,
    });

    const response = await shelfService.findByPk(id);

    return res.json(response);
  }
}

export default new ShelfController();
