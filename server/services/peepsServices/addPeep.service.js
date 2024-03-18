import Peep from '../../models/peep.model.js'

export const addPeepService = {
  addPeep: async (req) => {
    const peepToAdd = await Peep.create({ ...req.body, author: req.currentUser._id })
    return peepToAdd
  }
}