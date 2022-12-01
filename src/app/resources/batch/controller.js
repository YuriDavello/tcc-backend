import BatchService from "./service";
import ProductService from "../product/service";
import ShelfService from "../shelf/service";
import SectorService from "../sector/service";

class BatchController {
  async list(req, res) {
    const batchService = new BatchService();
    const batches = await batchService.list();
    res.json(batches);
  }

  async create(req, res) {
    const { batch } = req.body;
    const { code, productId } = batch;

    const batchService = new BatchService();
    const productService = new ProductService();

    const productExists = await productService.findByPk(productId);

    if (!productExists)
      return res.status(400).json({ message: "Produto do lote não existe" });

    const batchExists = await batchService.getByCode({ code });

    if (batchExists.length > 0)
      return res
        .status(400)
        .json({ message: "Outro lote já possui esse código" });

    const newBatch = await batchService.create({
      batch,
    });

    return res.json(newBatch);
  }

  async get(req, res) {
    const { id } = req.params;

    const batchService = new BatchService();
    const shelfService = new ShelfService();
    const sectorService = new SectorService();

    const batch = await batchService.findByPk(id);

    if (!batch)
      return res
        .status(400)
        .json({ status: 400, message: "Lote não encontrado" });

    const existsBatchProductSector = await sectorService.productSectorExists({
      productId: batch.productId,
    });

    const shelfInfo = await shelfService.getByProductId({
      productId: batch.productId,
    });

    if (
      !shelfInfo ||
      shelfInfo.length === 0 ||
      !existsBatchProductSector ||
      existsBatchProductSector.length === 0
    )
      return res.json({ batch });

    return res.json({
      batch,
      shelfInfo,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const batchService = new BatchService();

    const batch = await batchService.findByPk(id);

    const { status } = batch;

    if (status && status.toUpperCase() === "ATIVO")
      return res
        .status(400)
        .json({ message: "Não é possível deletar lote ativo em algum setor" });

    if (!batch) return res.status(400).json({ message: "Lote não existe" });

    const response = await batchService.delete(id);

    if (response) return res.sendStatus(204);

    return res.status(400).json({ message: "Não foi possível deletar lote" });
  }

  async update(req, res) {
    const { id } = req.params;
    const { isQRCodeEmitted } = req.body;

    if (isQRCodeEmitted)
      return res.status(400).json({
        message: "Não é possível atualizar o produto, QR code já foi emitido",
      });

    const batchService = new BatchService();

    const batch = await batchService.findByPk(id);

    if (!batch) return res.status(400).json({ message: "Lote inexistente" });

    await batch.update({
      ...req.body,
    });

    const response = await batchService.findByPk(id);

    return res.json(response);
  }

  async updateStatus(req, res) {
    const { status } = req.body;
    const { id } = req.params;

    const batchService = new BatchService();

    const batch = await batchService.findByPk(id);

    if (!batch) return res.status(400).json({ message: "Lote inexistente" });

    if (status.toUpperCase() === "Ativo".toUpperCase()) {
      const updatedBatchAndSector = await batchService.insertBatch({ batch });
      if (!updatedBatchAndSector)
        return res.status(400).json({
          message:
            "Não foi possível inserir o lote, não existe setor correspondente ao produto do lote",
        });

      if (updatedBatchAndSector === 500)
        return res.status(400).json({
          message: "Não foi possível inserir o lote, o setor está cheio",
        });

      return res.json(updatedBatchAndSector);
    }

    const updatedBatchAndSector = await batchService.removeBatch({ batch });

    if (!updatedBatchAndSector)
      return res.status(400).json({
        message: "Erro ao remover lote",
      });

    return res.json(updatedBatchAndSector);
  }
}

export default new BatchController();
