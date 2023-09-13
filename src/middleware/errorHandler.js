function errorHandler(error, request, response, next){
    console.log('Request At : ',request.originalUrl)
    console.log('Error : ',request.originalUrl)
    response.status(500).json({ message: 'Internal Server Error' });
    next()
}

module.exports = errorHandler