const Lender = require('../models/Lender.js')

module.exports = {
   get,
   createMany,
   create,
   update,
   remove
}

async function get(req, res, next) {
   try {
      const lenders = await Lender.find();
      res.json(lenders);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}

async function createMany(req, res, next) {
   const { data } = req.body;
   console.log(data);

   Lender.insertMany(data)
      .then((d) => {
         console.log('lenders inserted successfully');
         res.json(d);
      })
      .catch((error) => {
         console.error('Error inserting lenders data: ', error);
         res.status(500).json({ message: 'Error inserting lenders data' });
      });
}

async function create(req, res, next) {
   const lenderData = req.body;
   try {
      const newLender = new Lender(lenderData);
      await newLender.save();
      res.status(201).json({ message: `${newLender.lender} created successfully`, newLender });
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

async function update(req, res, next) {
   const { id } = req.params;
   const updateData = req.body;

   try {
      const updatedLender = await Lender.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedLender) return res.status(404).json({ message: 'Lender not found' });
      res.json({ message: `${updateData.lender} updated successfully`, updateData });
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

async function remove(req, res, next) {
   const { id } = req.params;
   try {
      const deletedLender = await Lender.findByIdAndDelete(id);
      if (!deletedLender) return res.status(404).json({ message: 'Lender not found' });
      res.json({ message: 'Lender deleted successfully' });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}
