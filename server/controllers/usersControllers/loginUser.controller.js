import { loginUserService } from '../../services/usersServices/loginUser.service.js'
import { Unauthorised } from '../../utils/errors.js'

export const loginUser = async (req, res) => { 
  try {
    const { user, token } = await loginUserService.loginUser(req.body)

    // const { user, token } = userAndToken
    return res.status(200).json({ user, token })
  } catch (e) {
    if (e instanceof Unauthorised) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    return res.status(422).json({ message: e.message })
  }
}