/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
  const id = req.params.id
  const error = ({ status: 404 })
  if (!id) {
    error.message = `scheme with scheme_id ${id} not found`
    next(error)
  } else {
    req.id = id
    next()
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const name = req.body.scheme_name;
  const error = ({ status: 404 })
  if(!name) {
    error.message = "invalid scheme_name"
    next(error)
  } else {
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
 // missing, empty, or not a string?
  const instructions = req.body.instructions;
  const stepNumber = req.body.step_number
  const error = ({ status: 400 })
  if(!instructions || instructions.length === 0 || typeof instructions !== "string" || typeof stepNumber !== "number" || stepNumber < 1) {
    error.message = "invalid step"
    next(error)
  } else {
    next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
