export function NoAccessTokenError(baseResponse, message) {
  this.name = 'BadRequestError';
  this.message = message || 'Bad request';
  this.baseResponse = baseResponse;
  this.stack = new Error().stack;
}
NoAccessTokenError.prototype = Object.create(Error.prototype);
NoAccessTokenError.prototype.constructor = NoAccessTokenError;
