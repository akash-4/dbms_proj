const Joi = require('joi');

const flight = Joi.object({
    body: Joi.object({
      id: Joi.string().guid().required(),
      airline_company_id: Joi.guid().required(),
      destination: Joi.string().trim().required(),
      origin: Joi.string().trim().required(),
      start_time: Joi.string().regex(/\b((1[0-2]|0?[1-9]):([0-5][0-9])([AaPp][Mm]))/),
      end_time: Joi.string().regex(/\b((1[0-2]|0?[1-9]):([0-5][0-9])([AaPp][Mm]))/),
      remaining_tickets:Joi.number().integer().required(),
    }).required()
  });
  

const ticket = Joi.object({
    body: Joi.object({
      id: Joi.string().guid().required(),
      user_id: Joi.string().guid().required(),
      flight_id: Joi.string().guid().required(),
      traveller_id: Joi.string().guid().required(),
      booking_id: Joi.string().guid().required(),
    }).required()
  });
  

const traveller = Joi.object({
  body: Joi.object({
    id: Joi.string().guid().required(),
    name: Joi.string().trim().max(40).required(),
    email: Joi.string().trim().email().required(),
    gender: Joi.string().trim().required(),
  }).required()
});


const company = Joi.object({
  body: Joi.object({
    id: Joi.string().guid().required(),
    name: Joi.string().trim().max(40).required(),
  }).required()
});



module.exports = {
 company,
 traveller,
 ticket,
 flight,
 
};
