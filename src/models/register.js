const mg = require('mongoose')
const jwt = require('jsonwebtoken')
const userschm = new mg.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

userschm.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({_id:this._id.toString()},'iamabhijitrajputandiamawebdeveloper');
        // console.log(token)
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        return token
    } catch (e) {
        res.send(e)
    }
}

const usrmod = new mg.model("todoregister", userschm)
module.exports = usrmod;
