import BaseResponse from '@modules/Errors/BaseResponse'

class Forbidden extends BaseResponse {
  constructor(message: string) {
    super(message, 403)
    Object.setPrototypeOf(this, Forbidden.prototype)
  }
}

export default Forbidden
