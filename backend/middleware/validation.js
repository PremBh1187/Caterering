const validateCaterer = (req, res, next) => {
  const { name, location, pricePerPlate, cuisines, rating } = req.body;

  const errors = [];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('Name is required and must be a non-empty string');
  }

  if (!location || typeof location !== 'string' || location.trim() === '') {
    errors.push('Location is required and must be a non-empty string');
  }

  if (pricePerPlate === undefined || typeof pricePerPlate !== 'number' || pricePerPlate <= 0) {
    errors.push('Price per plate is required and must be a positive number');
  }

  if (!cuisines || !Array.isArray(cuisines) || cuisines.length === 0) {
    errors.push('Cuisines is required and must be a non-empty array');
  } else {
    for (let cuisine of cuisines) {
      if (typeof cuisine !== 'string' || cuisine.trim() === '') {
        errors.push('Each cuisine must be a non-empty string');
        break;
      }
    }
  }

  if (rating === undefined || typeof rating !== 'number' || rating < 0 || rating > 5) {
    errors.push('Rating is required and must be a number between 0 and 5');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = { validateCaterer };