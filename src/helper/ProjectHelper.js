export const checkResultMatchTartet = (expect, result) => {
  if (!result) return false // 0, something wrong in backend
  if (expect === result) return true

  if (Array.isArray(expect) && Array.isArray(result)) {
      if (expect.length !== result.length) return false
      // TODO: compare each action
      return true
  }

  return false
}

export const generateSuccessMessage = (target) => {
  return `Congratulations! You completed the ${target.projName} program!`
}

export const generateFailureMessage = (target, result) => {
  // code running error in backend
  if (!result.success) return result.message
  if (target.params) {// string type
      return `expecting '${target.params}' equal to ${target.expect}`
  }
  // actions
  return 'ohoh...almost there, try again!'
}