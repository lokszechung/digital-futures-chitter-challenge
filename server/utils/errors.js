export class Unauthorised extends Error {
  constructor(message) {
    super(message)
    this.name = 'Unauthorised'
    this.message = message
    this.status = 401
  }
}