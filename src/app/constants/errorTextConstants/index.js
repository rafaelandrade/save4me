module.exports = {
  validationErrors: {
    invalidProp: key => `Propriedade inválida: ${key}.`,
    requiredProp: key => `Propriedade obrigatória não encontrada: ${key}.`,
    failedCall: 'Falha na requisição ao endpoint.'
  },
  authorizationErrors: {
    invalidToken: 'Token inválido.'
  },
  internalServiceErrorMessage: capturedException =>
    `This is a internal server error, sentry captured exception with id ${capturedException}`
}
