import { dbConnect } from "@/utils/mongoose"
import Cliente from "@/models/Cliente"

dbConnect()

export default async function handler(req, res) {

    const { method, body } = req

    switch (method) {
        case 'GET':
            try {
                const clientes = await getClientes()
                res.status(200).json({ success: true, data: clientes })
            } catch (error) {
                res.status(500).json({ success: false, error: error.message })
            }
            break
        case 'POST':
            try {
                const cliente = await createCliente(body)
                res.status(201).json({ success: true, data: cliente })
            } catch (error) {
                res.status(500).json({ success: false, error: error.message  })
            }
            break
        default:
            res.status(400).json({ success: false, error: error.message })
            break
    }

    function createCliente(body) {
        const cliente = new Cliente(body)
        return cliente.save()
    }

    async function getClientes() {
        return await Cliente.find()
    }
  }