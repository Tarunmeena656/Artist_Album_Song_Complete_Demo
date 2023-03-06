const {Schema,model, default: mongoose } = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

//Artist schema
const artistSchema = new Schema({
    artistName : {
        type :String,
        required:true,
    }, 
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[isEmail,"Please Enter a correct email"]


    },
    password:{
        type:String,
        require:true

    },
    role :{
        type:String,
        default:"artist"
    },
    isDeleted:{
     type:Boolean
    },
    deletedBy:{
       type:String
    },
    deletedAt:{
        type:Date
    }


},{timestamps:true,versionKey:false})




artistSchema.pre('save',async function(next){
    this.password =  await bcrypt.hash(this.password,10)
    next()
})

artistSchema.methods.isValidate = async function(password){
return await bcrypt.compare(password,this.password)

}
module.exports = artistModel = model("artistdata",artistSchema)