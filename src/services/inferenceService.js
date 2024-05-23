const tf = require('@tensorflow/tfjs-node');
 
async function predictClassification(model, image) {
  try {
    const tensor = tf.node
    .decodeJpeg(image)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat()

    const prediction = model.predict(tensor);
    const predictionArray = await prediction.array();
   
    const predictedValue = predictionArray[0][0];
    const classification = predictedValue > 0.5 ? 'Cancer' : 'Non-cancer';

    let suggestion;
 
  if (classification === 'Cancer') { 
    result = "Cancer";
    suggestion = "Segera kunjungi dokter untuk konsultasi!"
  }
 
  if (classification === 'Non-cancer') {
    result = "Non-cancer"
    suggestion = "Selamat, anda tidak memiliki kanker!"
  }

  return {suggestion, classification, result };
} catch (error) {
  throw new InputError(`Terjadi kesalahan input: ${error.message}`)
}
 
}
module.exports = predictClassification;