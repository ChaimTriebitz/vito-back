
module.exports = {
   getPrivateData,
}

function getPrivateData(req, res, next) {
   res.status(200).json({ success: true, user: req.user })
}




