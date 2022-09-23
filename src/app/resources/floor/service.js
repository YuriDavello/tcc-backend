import Floor from "../../models/Floor";

class FloorService {
  async get({ floorName }) {
    const floor = await Floor.findOne({
      where: {
        floorName,
      },
    });
    return floor;
  }

  async findByPk(id) {
    const floor = await Floor.findByPk(id, {
      attributes: ["id", "floorName", "shelfId"],
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
      attributes: ["id", "floorName", "shelfId"],
    });
    return floors;
  }

  async create({ shelfId, floors = null, floorName = "" }, transaction) {
    let newFloors;
    if (floors) {
      newFloors = await Promise.all(
        floors.map(async (floor) => {
          const newFloor = await Floor.create(
            {
              floorName: floor.floorName,
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
          floorName,
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
