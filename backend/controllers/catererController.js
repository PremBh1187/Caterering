const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/caterers.json');

const readData = () => {
  const jsonData = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(jsonData);
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
};


const getAllCaterers = (req, res) => {
  try {
    const caterers = readData();
    res.json(caterers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
};


const getCatererById = (req, res) => {
  try {
    const caterers = readData();
    const caterer = caterers.find(c => c.id === req.params.id);
    if (!caterer) {
      return res.status(404).json({ error: 'Caterer not found' });
    }
    res.json(caterer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
};


const createCaterer = (req, res) => {
  try {
    const caterers = readData();
    const newCaterer = {
      id: Date.now().toString(), // simple unique ID
      ...req.body
    };
    caterers.push(newCaterer);
    writeData(caterers);
    res.status(201).json(newCaterer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
};

module.exports = { getAllCaterers, getCatererById, createCaterer };