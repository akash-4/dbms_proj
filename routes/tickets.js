const to = require('../utils/to');
const uuidv1 = require('uuid/v1');
const models = require('../model');
const ticket = models.ticket;
const traveller = models.traveller;
const flight = models.flight;

exports.addBooking = async (req, res) => {
  const booking_id = await uuidv1();
  const {passengers, flight_id, user, n} = req.body;
  await to(
    flight.update(
      {
        remaining_tickets: n,
      },
      {
        where: {
          _id:flight_id,
        },
      }
    )
  );
  passengers.forEach(async (passenger) => {
    let [err, oldPassenger] = await to(
        traveller.findOne({
          where:  {email: req.body.email },
          attributes: ['_id'],
        })
      );
      if(oldPassenger){

        const _id = await uuidv1();
    await to(ticket.create({ traveller_id: oldPassenger._id, booking_id ,_id,flight_id,user_id}))
      }
      else
      {
        const _id = await uuidv1();
        const _id2 = await uuidv1();
        let [err, newPassenger] = await to(traveller.create({_id,name: passenger.name, gender: passenger.gender, email: passenger.email}));
        await to(ticket.create({ _id:_id2,traveller_id: newPassenger._id, booking_id ,flight_id,user_id}))
    
      }
  });
  
  return res.sendSuccess('Booking created');
};

exports.myBookings = async (req, res) => {
  const [err, tickets] = await to(
    ticket.findAll({
      where: {
        user_id: req.query.user
      },
    })
  );
  if (err) return res.sendError(err);
  return res.sendSuccess(tickets);
};