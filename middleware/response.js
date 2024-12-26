const resolve = {
   error,
   success,
}

module.exports = resolve

function error(err, req, res, next) {
   let { message, statuscode = 500 } = err
   switch (statuscode) {
      case 400:
         message = message.split(':').pop().trim() || 'Not Valid'
         break;
      default: message = 'Server Error'
   }

   res.status(statuscode).json({ success: false, message })
}

function success(res, statuscode = 200, message, data) {
   
   switch (statuscode) {
      // case 205:

      //    break;

      default: res.status(statuscode).json({ success: true, data, message, })
   }
}
