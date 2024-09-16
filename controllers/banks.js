const Bank = require('../models/Bank')

module.exports = {
   getBanks,
   createMany
}

async function getBanks(req, res, next) {
   try {
      const banks = await Bank.find();
      res.json(banks);
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
}

async function createMany(req, res, next) {
   const { data } = req.body
   console.log(data);

   Bank.insertMany(data).then((d) => {
      console.log('Banks d inserted successfully');
      res.json(d);
   })
      .catch((error) => {
         console.error('Error inserting banks data: ', error);
      });
}