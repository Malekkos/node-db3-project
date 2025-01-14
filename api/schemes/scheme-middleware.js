/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/

const db = require("../../data/db-config")


const checkSchemeId = async (req, res, next) => {
  const id = await db("schemes").where("scheme_id", req.params.scheme_id).first()
  const error = ({ status: 404 })
  if (!id) {
    error.message = `scheme with scheme_id ${req.params.scheme_id} not found`
    next(error)
  } else {
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
  const error = ({ status: 400 })
  if(name === undefined || typeof name !== "string" || !name.trim()) {
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
  if(instructions === undefined || typeof instructions !== "string" || !instructions.trim() ||  typeof stepNumber !== "number" || stepNumber < 1) {
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
