import User from '../../models/user.model.js'

export const registerUserService = {
  registerUser: async (requestBody) => {
    const newUser = await User.create(requestBody)
    return newUser
  }
}