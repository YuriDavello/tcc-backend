import Floor from "../../models/Floor";

class FloorService {
  async get({ nameFloor }) {
    const floor = await Floor.findOne({
      where: {
        nameFloor,
      },
    });
    return floor;
  }

  async findByPk(id) {
    const floor = await Floor.findByPk(id, {
      attributes: ["id", "nameFloor", "shelfId"],
    });
    if (!floor) return false;

    return floor;
  }

  async list(shelfId) {
    const floors = await Floor.findAll({
      order: [["id", "ASC"]],
      where: {
        shelfId,
      },
      attributes: ["id", "nameFloor", "shelfId"],
    });
    return floors;
  }

  async create({ shelfId, floors = null, nameFloor }, transaction) {
    let newFloors;
    if (floors) {
      newFloors = await Promise.all(
        floors.map(async (floor) => {
          const newFloor = await Floor.create(
            {
              nameFloor: floor.nameFloor,
              shelfId,
            },
            {
              transaction,
            }
          );
          return newFloor;
        })
      );
    } else {
      newFloors = await Floor.create(
        {
          nameFloor,
          shelfId,
        },
        {
          transaction,
        }
      );
    }

    return newFloors;
  }

  async delete(id, transaction) {
    const floor = await Floor.findByPk(id);
    if (!floor) return false;

    await Floor.destroy({ where: { id }, transaction });

    return true;
  }
}

export default FloorService;
