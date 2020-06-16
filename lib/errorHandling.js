const { notFound, unauthorized, duplicate } = require('./errorMessages')

function errorHandler(err, req, res, next) {
  if (err.name === 'ValidationError') {
    
    const newErrors = {}
    for (const key in err.errors) {
      newErrors[key] = err.errors[key].message
    }
    console.log(newErrors)
    return res.status(422).json(newErrors)
  }

  if (err.message === notFound) {
    return res.status(404).json({ message: notFound })
  }

  if (err.message === duplicate) {
    return res.status(422).json({ message: duplicate })
  }

  if (err.message === unauthorized) {
    console.log('entered')
    return res.status(401).json({ message: unauthorized })
  }

  res.sendStatus(500)
  next(err)
}

module.exports = errorHandler