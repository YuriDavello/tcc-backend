import FloorService from "./service";
import Sector from "../../models/Sector";
class FloorController {
  async list(req, res) {
    const { shelfId } = req.query;
    const floorService = new FloorService();
    const floors = await floorService.list(shelfId);
    res.json(floors);
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

    const sectors = await Sector.findAll({
      where: {
        floorId: id,
      },
    });

    if (sectors && sectors.length > 0)
      return res.status(400).json({
        message: "Não é possível excluir andar com setor incluído",
      });

    const floor = await floorService.delete(id);

    if (!floor) return res.status(400).json({ message: "Andar não existe" });

    return res.sendStatus(204);
  }
}

export default new FloorController();
