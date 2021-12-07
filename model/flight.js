module.exports = (sequelize, DataTypes) => {
  let Flight = sequelize.define('flight', {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    flight_id: {
      type: DataTypes.STRING,
    },
    airline_company_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    remaining_tickets: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
  });
  Flight.associate = models => {
    models.flight.hasMany(models.ticket, {
      foreignKey: 'flight_id',
      sourceKey: '_id'
    });
  }
  return Flight;
};
