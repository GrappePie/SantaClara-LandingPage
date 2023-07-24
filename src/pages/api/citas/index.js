import {dbConnect} from "@/utils/mongoose"
import Cita from "@/models/Cita";

dbConnect()

export default async function handler(req, res) {

    const { method, body } = req

    switch (method) {
        case 'GET':
            try {
                const citas = await getCitas()
                res.status(200).json({ success: true, data: citas })
            } catch (error) {
                res.status(500).json({ success: false, error: error.message })
            }
            break
        case 'POST':
            try {
                const cita = await createCita(body)
                res.status(201).json({ success: true, data: cita })
            } catch (error) {
                if (error.message.includes('duplicate key error collection') && error.message.includes('email')) {
                    res.status(400).json({ success: false, error: 'Este e-mail ya estaba registrado' })
                    return
                } else if (error.message.includes('duplicate key error collection') && error.message.includes('telefono')) {
                    res.status(400).json({ success: false, error: 'Este teléfono ya estaba registrado' })
                    return
                } else {
                    res.status(500).json({ success: false, error: error.message })
                    return
                }
            }
            break
        default:
            res.status(400).json({ success: false, error: error.message })
            break
    }

    function createCita(body) {
        const cita = new Cita(body)
        return cita.save()
    }

    async function getCitas() {
        return await Cita.find({})
    }
}