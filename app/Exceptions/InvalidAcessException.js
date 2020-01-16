'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InvalidAcessException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(403).json({
      error: 'Invalid acess and rosource'
    });
  }
}

module.exports = InvalidAcessException
