import FloorService from "./service";

class FloorController {
  async list(req, res) {
    const { shelfId } = req.params;
    const floorService = new FloorService();
    const floors = await floorService.list(shelfId);
    res.json(floors);
  }

  async create(req, res) {
    const { nameFloor, shelfId } = req.body;

    const floorService = new FloorService();

    const floor = await floorService.get({ nameFloor });
    if (floor)
      return res
        .status(400)
        .json({ message: "Nome já pertence à outro andar" });

    const newFloor = await floorService.create({
      shelfId,
      nameFloor,
    });

    return res.json(newFloor);
  }

  async get(req, res) {
    const { id } = req.params;

    const floorService = new FloorService();

    const floor = await floorService.findByPk(id);

    if (!floor)
      return res
        .status(400)
        .json({ status: 400, message: "Andar não encontrado" });

    return res.json(floor);
  }

  async delete(req, res) {
    const { id } = req.params;

    const floorService = new FloorService();

    const floor = await floorService.delete(id);
    if (!floor) return res.status(400).json({ message: "Andar não existe" });

    return res.sendStatus(204);
  }

  async update(req, res) {
    const { id } = req.params;
    const { nameFloor } = req.body;

    const floorService = new FloorService();

    const floor = await floorService.findByPk(id);

    if (!floor) return res.status(400).json({ message: "Andar inexistente" });

    if (nameFloor !== floor.nameFloor) {
      const floorName = await floorService.get({ nameFloor });
      if (floorName)
        return res
          .status(400)
          .json({ message: "Outro andar já possui esse nome" });
    }

    await floor.update({
      ...req.body,
    });

    const response = await floorService.findByPk(id);

    return res.json(response);
  }
}

export default new FloorController();
