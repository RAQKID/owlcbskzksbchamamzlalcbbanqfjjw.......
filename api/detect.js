const Bytez = require("bytez.js");

const sdk = new Bytez(process.env.BYTEZ_API_KEY);
const model = sdk.model("facebook/detr-resnet-50");

module.exports = async (req, res) => {
  try {
    const { imageUrl } = req.query;
    if (!imageUrl) {
      return res
        .status(400)
        .json({ status: false, error: "Missing imageUrl query parameter" });
    }

    const { error, output } = await model.run(imageUrl);

    if (error) {
      return res.status(500).json({ status: false, error });
    }

    const labels = output.map((obj) => obj.label);
    return res.json({ status: true, labels });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, error: err.message });
  }
};
