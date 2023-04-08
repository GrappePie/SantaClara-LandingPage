import {Schema,model,models} from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true,
        trim: true,
        maxlength: [50, 'El nombre de usuario no puede tener más de 50 caracteres'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        unique: false,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        trim: true,
        maxlength: [50, 'El email no puede tener más de 50 caracteres'],
    },
},{
    timestamps: true,
    versionKey: false
})

export default models.User || model('User',userSchema)