const MwedibuddyTest = require('../models/mwedibuddytestmodels');

exports.createTest = async (req, res) => {
  try {
    const test = new MwedibuddyTest(req.body);
    await test.save();
    res.status(201).json(test);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTests = async (req, res) => {
  try {
    const tests = await MwedibuddyTest.find().populate('patient');
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTestById = async (req, res) => {
  try {
    const test = await MwedibuddyTest.findById(req.params.id).populate('patient');
    if (!test) return res.status(404).json({ error: 'Test not found' });
    res.json(test);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTest = async (req, res) => {
  try {
    const test = await MwedibuddyTest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!test) return res.status(404).json({ error: 'Test not found' });
    res.json(test);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTest = async (req, res) => {
  try {
    const test = await MwedibuddyTest.findByIdAndDelete(req.params.id);
    if (!test) return res.status(404).json({ error: 'Test not found' });
    res.json({ message: 'Test deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
