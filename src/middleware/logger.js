

function logger(request,response,next){
    console.log('Request At : ',request.originalUrl)
    next()
}

module.exports = logger