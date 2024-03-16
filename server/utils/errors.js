export class Unauthorised extends Error {
  constructor(message) {
    super(message)
    this.name = 'Unauthorised'
    this.message = 'Unauthorised'
    this.status = 401
  }
}