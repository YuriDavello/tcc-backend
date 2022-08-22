import Shelf from "../../models/Shelf";

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
    const shelf = await Shelf.findByPk(id);
    if (!shelf) return false;

    return shelf;
  }

  async list() {
    const shelves = await Shelf.findAll({
      order: [["name", "ASC"]],
    });
    return shelves;
  }

  async create({ name, floors, shelfType }, transaction) {
    const newShelf = await Shelf.create(
      {
        name,
        floors,
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

  async update({ id, name, floors, shelfType }, transaction) {
    const shelfUpdated = await Shelf.update(
      {
        name,
        floors,
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
