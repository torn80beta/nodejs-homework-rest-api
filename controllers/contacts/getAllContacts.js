const { Contact } = require('../../models/contact');

// If you want to return some exact fields - use:
// Contact.find({}, "name email")
// If you don't want to return some field - use:
// Contact.find({}, '-name -email');

// Find and return "name" and "email" from "owner" object
// .populate('owner', 'name email');

const getAllContacts = async (req, res) => {
  // Same as: const owner = req.user._id;
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const allContacts = await Contact.find({ owner }, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'name email');
  res.json(allContacts);
};

module.exports = getAllContacts;
