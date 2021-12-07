module.exports = (sequelize, DataTypes) => {
  let Ticket = sequelize.define('ticket', {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    flight_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    traveller_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    booking_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    
  });
  
  return Ticket;
};
