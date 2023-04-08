import { dbConnect } from "@/utils/mongoose"
import Cliente from "@/models/Cliente"

dbConnect()

export default async function handler(req, res) {
    const { method, body } = req
    const { id } = req.query
    switch (method) {
        case 'GET':
            try {
                const cliente = await getCliente(id)
                if (!cliente) return res.status(400).json({ success: false, error: 'No se encontró el cliente' })
                res.status(200).json({ success: true, data: cliente })
            } catch (error) {
                res.status(500).json({ success: false, error: error.message })
            }
            break
        case 'PUT':
            try {
                const cliente = await updateCliente(id, body)
                if (!cliente) return res.status(400).json({ success: false, error: 'No se encontró el cliente' })
                res.status(200).json({ success: true, data: cliente })
            } catch (error) {
                res.status(500).json({ success: false, error: error.message })
            }
            break
        case 'DELETE':
            try {
                const cliente = await deleteCliente(id)
                if (!cliente) return res.status(400).json({ success: false, error: 'No se encontró el cliente' })
                res.status(200).json({ success: true, data: cliente })
            } catch (error) {
                res.status(500).json({ success: false, error: error.message })
            }
            break
        default:
            res.status(400).json({ success: false, error: error.message })
            break
        }

    async function getCliente(id) {
        return await Cliente.findById(id)
    }

    async function updateCliente(id, body) {
        return await Cliente.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        })
    }

    async function deleteCliente(id) {
        return await Cliente.findByIdAndRemove(id)
    }
}