import { registerUserService } from "../../services/usersServices/registerUser.service.js"

export const registerUser = async (req, res) => {
  try {
    const newUser = await registerUserService.registerUser(req.body)
    return res.status(201).json(newUser)
  } catch (e) {
    if (e.code === 11000 && e.keyValue) {
      return res.status(400).json({ message: `This ${Object.keys(e.keyValue)[0]} is already in use` })
    } 
    return res.status(422).json({ message: e.message })
  }
}