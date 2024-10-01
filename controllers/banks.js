const Bank = require('../models/Bank')

module.exports = {
   get,
   createMany,
   create,
   update,
   remove
}

async function get(req, res, next) {
   try {
      const banks = await Bank.find();
      res.json(banks);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}

async function createMany(req, res, next) {
   const { data } = req.body;
   console.log(data);

   Bank.insertMany(data)
      .then((d) => {
         console.log('Banks inserted successfully');
         res.json(d);
      })
      .catch((error) => {
         console.error('Error inserting banks data: ', error);
         res.status(500).json({ message: 'Error inserting banks data' });
      });
}

async function create(req, res, next) {
   const bankData = req.body;
   try {
      const newBank = new Bank(bankData);
      await newBank.save();
      res.status(201).json(newBank);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

async function update(req, res, next) {
   const { id } = req.params;
   const updateData = req.body;
   try {
      const updatedBank = await Bank.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedBank) return res.status(404).json({ message: 'Bank not found' });
      res.json(updatedBank);
   } catch (err) {
      res.status(400).json({ message: err.message });
   }
}

async function remove(req, res, next) {
   const { id } = req.params;
   try {
      const deletedBank = await Bank.findByIdAndDelete(id);
      if (!deletedBank) return res.status(404).json({ message: 'Bank not found' });
      res.json({ message: 'Bank deleted successfully' });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}
