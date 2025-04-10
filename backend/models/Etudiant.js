const mongoose= require('mongoose')

const etudiantSchema= new mongoose.Schema({
    nom: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    mdp: {type: String, required: true},
    departement: {type: mongoose.Schema.Types.ObjectId, ref: 'Departement', required: true},
    formations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Formation'}]
})

module.exports= mongoose.model('Etudiant', etudiantSchema)