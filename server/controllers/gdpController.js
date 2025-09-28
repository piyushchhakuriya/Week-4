const GdpRecord = require('../models/GdpRecord');

const asyncHandler = fn => (req,res,next) => Promise.resolve(fn(req,res,next)).catch(next);

exports.create = asyncHandler(async (req,res)=>{
  const { country, year, gdpValue, currency, notes } = req.body;
  const doc = new GdpRecord({ country, year, gdpValue, currency, notes });
  await doc.save();
  res.status(201).json(doc);
});

exports.list = asyncHandler(async (req,res)=>{
  const { country, year, page = 1, limit = 100 } = req.query;
  const filter = {};
  if(country) filter.country = country;
  if(year) filter.year = Number(year);
  const docs = await GdpRecord.find(filter).sort({ country:1, year:-1 }).skip((page-1)*limit).limit(Number(limit));
  res.json(docs);
});

exports.get = asyncHandler(async (req,res)=>{
  const doc = await GdpRecord.findById(req.params.id);
  if(!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
});

exports.update = asyncHandler(async (req,res)=>{
  const doc = await GdpRecord.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if(!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
});

exports.remove = asyncHandler(async (req,res)=>{
  const doc = await GdpRecord.findByIdAndDelete(req.params.id);
  if(!doc) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});
