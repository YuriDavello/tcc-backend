import Shelf from "../../models/Shelf";
import Floor from "../../models/Floor";
import Sector from "../../models/Sector";
import Product from "../../models/Product";

class ShelfService {
  async get({ name }) {
    const shelf = await Shelf.findOne({
      where: {
        name,
      },
    });
    return shelf;
  }

  async findByPk(id) {
    const shelf = await Shelf.findByPk(id, {
      include: [
        {
          model: Floor,
          as: "floors",
          attributes: ["id", "nameFloor"],
          include: [
            {
              model: Sector,
              as: "sectors",
              include: [
                {
                  model: Product,
                  as: "products",
                },
              ],
            },
          ],
        },
      ],
      attributes: ["id", "name", "shelfType"],
      order: [[{ model: Floor, as: "floors" }, "id"]],
    });
    if (!shelf) return false;

    return shelf;
  }

  async list() {
    const shelves = await Shelf.findAll({
      order: [["name", "ASC"]],
    });
    return shelves;
  }

  async create({ shelf }, transaction) {
    const newShelf = await Shelf.create(shelf, {
      transaction,
    });

    return newShelf;
  }

  async delete(id, transaction) {
    const shelf = await Shelf.findByPk(id);
    if (!shelf) return false;

    await Shelf.destroy({ where: { id }, transaction });

    return true;
  }
}

export default ShelfService;
