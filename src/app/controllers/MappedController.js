import MappedService from "../services/MappedService";
// import ProductService from "../product/service";

class SectorController {
  async mapped(req, res) {
    const { productId } = req.params;

    const map = await MappedService.fullMap(productId);

    if (!map)
      return res
        .status(400)
        .json({ status: 400, message: "Falha ao mapear o produto" });

    return res.json(map);
  }
}

export default new SectorController();
