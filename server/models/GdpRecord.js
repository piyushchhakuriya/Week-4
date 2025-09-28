const mongoose = require('mongoose');

const GdpSchema = new mongoose.Schema({
  country: { type: String, required: true, trim: true },
  year: { type: Number, required: true, min: 1900, max: 2100 },
  gdpValue: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'USD' },
  notes: { type: String }
}, { timestamps: true });

GdpSchema.index({ country: 1, year: 1 }, { unique: true });

module.exports = mongoose.model('GdpRecord', GdpSchema);
