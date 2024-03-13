import { getAllPeepsService } from "../../services/peepsServices/getAllPeeps.service.js"

export const getAllPeeps = async (_req, res) => {
  try {
    const peeps = await getAllPeepsService()
    return res.end("getting peeps")
  } catch (e) {
    console.log(e)
  }
}