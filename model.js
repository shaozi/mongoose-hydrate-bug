var mongoose = require('mongoose')
mongoose.Promise = global.Promise

var Schema = mongoose.Schema

//////////////////
var projectSchema = new Schema(
  {
    name: { type: String, default: "Project", required: true, index: true },
    description: { type: String }
  },
  {
    discriminatorKey: 'type'
  }
)

var Project = mongoose.model('Project', projectSchema)

//////////////////
var Poc = Project.discriminator('Poc',
  new Schema(
    {
      poc: { type: String, required: true }
    },
    {
      discriminatorKey: 'type'
    }
  )
)

//////////////////
var Training = Project.discriminator('Training',
  new Schema(
    {
      training: { type: String, required: true }
    },
    {
      discriminatorKey: 'type'
    }
  )
)

module.exports = {
  Project: Project,
  Poc: Poc,
  Training: Training
}

