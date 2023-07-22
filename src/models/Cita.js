import {Schema,model,models} from 'mongoose';

const citaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: false,
        trim: true,
        maxlength: [50, 'El nombre no puede tener más de 50 caracteres'],
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        trim: true,
        maxlength: [50, 'El email no puede tener más de 50 caracteres'],
    },
    telefono: {
        type: String,
        required: [true, 'El teléfono es obligatorio'],
        unique: true,
        trim: true,
        maxlength: [10, 'El teléfono no puede tener más de 10 caracteres'],
    },
    fecha: {
        type: String,
        required: [true, 'La fecha es obligatoria'],
        unique: false,
        trim: true,
        maxlength: [50, 'La fecha no puede tener más de 50 caracteres'],
    },
    hora: {
        type: String,
        required: [true, 'La hora es obligatoria'],
        unique: false,
        trim: true,
        maxlength: [50, 'La hora no puede tener más de 50 caracteres'],
    },
    },
{
    timestamps: true,
    versionKey: false
})

export default models.Cita || model('Cita',citaSchema)