

const to = require('../utils/to');


const models = require('../model');
var flight = models.flight;


exports.getFlights = async (req, res) => {
  const [err, flightData] = await to(
    flight.findAll({
      where: {origin: req.query.origin , destination: req.query.destination},
      attributes: [
        '_id',
        'airline_company_id',
        'destination',
        'origin',
        'start_time',
        'end_time',
        'remaining_tickets'
      ],
    })
  );
  if (err) return res.sendError(err);
  if (!flightData) return res.sendError(null, 'Flights not found', 404);
 
  return res.sendSuccess(flightData);
};
