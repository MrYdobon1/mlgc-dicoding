const predictClassification = require('../services/inferenceService');
const storeData = require('../services/storeData');
const crypto = require('crypto');
async function postPredictHandler(request, h) {
    try {
        // Check if payload size exceeds the limit
        if (request.payload.length > 1000000) {
            return h.response({
                status: "fail",
                message: "Payload content length greater than maximum allowed: 1000000"
            }).code(413);
        }
    const { image } = request.payload;
    const { model } = request.server.app;

    const {clasification, suggestion, result} = await predictClassification(model, image);

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
   
    const data = {
      "id": id,
      "result": result,
      "suggestion": suggestion,
      "createdAt": createdAt
    }

    await storeData(id, data);

    const response = h.response({
        status: 'success',
        message: 'Model is predicted successfully.',
        data
      })
      response.code(201);
      return response;
    } catch (err) {
        console.error(err);
        return h.response({
            status: "fail",
            message: "Terjadi kesalahan dalam melakukan prediksi"
        }).code(400);
    }
}
  module.exports = postPredictHandler;