const models = require("./model.js")

const Project = models.Project
const Training = models.Training
const Poc = models.Poc

const mongoose = require('mongoose')
mongoose.Promise = Promise

mongoose.connect('mongodb://localhost/test')

Project.findOneAndRemove({ name: 'test' }).exec().then(() => {
  var poc = new Poc({ name: 'test', description: "a poc", poc: 'poc' })
  poc.save().then((obj) => {
    console.log(`before: ${JSON.stringify(obj, null, 2)}`)
    obj = obj.toObject()
    obj.type = 'Training'
    delete obj.poc
    obj.description = "a training converted from a poc"
    obj.training = 'training'
    const training = Training.hydrate(obj)
    return training.save({ validateBeforeSave: true })
  }).then((obj) => {
    console.log(`after: ${JSON.stringify(obj, null, 2)}`)
    mongoose.connection.close()
  }).catch(error => {
    console.log(error.message)
    mongoose.connection.close()
  })
})
