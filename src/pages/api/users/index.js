import { dbConnect } from "@/utils/mongoose"
import bcrypt from "bcrypt";
import User from "@/models/User"

dbConnect()

export default async function handler(req, res) {

    const { method, body } = req

    switch (method) {
        case 'GET':
            try {
                const users = await getUsers()
                res.status(200).json({ success: true, data: users })
            } catch (error) {
                res.status(500).json({ success: false, error: error.message })
            }
            break
        case 'POST':
            try {
                const user = await createUser(body)
                res.status(201).json({ success: true, data: user })
            } catch (error) {
                res.status(500).json({ success: false, error: error.message  })
            }
            break
        default:
            res.status(400).json({ success: false, error: error.message })
            break
    }

    async function createUser(body) {
        const user = new User(body)
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return await user.save()
    }

    async function getUsers() {
        return await User.find()
    }
  }