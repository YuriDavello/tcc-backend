import Shelf from "../../models/Shelf";
import Floor from "../../models/Floor";

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
        },
      ],
      attributes: ["id", "name", "shelfType"],
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

  async create({ name, shelfType }, transaction) {
    const newShelf = await Shelf.create(
      {
        name,
        shelfType,
      },
      {
        transaction,
      }
    );

    return newShelf;
  }

  async delete(id, transaction) {
    const shelf = await Shelf.findByPk(id);
    if (!shelf) return false;

    await Shelf.destroy({ where: { id }, transaction });

    return true;
  }

  async update({ id, name, shelfType }, transaction) {
    const shelfUpdated = await Shelf.update(
      {
        name,
        shelfType,
      },
      {
        where: {
          id,
        },
        transaction,
      }
    );

    return shelfUpdated;
  }
}

export default ShelfService;
