import Joi from "joi";

export default Joi.object({
  title: Joi.string().required(),
  isCompleted: Joi.boolean().required(),
  userId: Joi.string().required(),
});
