const mongoose = require('mongoose');
Schema = mongoose.Schema;


const heatmapSchema = new mongoose.Schema({
    year: {
      type: Number,
      required: true,
    },
    sectors: [{
      type: Number,
      required: true,
    }],
    data: [[{
      type: Number,
      required: true,
    }]]
  });
  
  // Create the Mongoose model for the heatmap
  const Heatmap = mongoose.model('Heatmap', heatmapSchema);
  
  // Export the model
  module.exports = Heatmap;