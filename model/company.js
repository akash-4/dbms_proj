module.exports = (sequelize, DataTypes) => {
    let Company = sequelize.define('company', {
      _id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
    Company.associate = models => {
      models.company.hasMany(models.flight, {
        foreignKey: 'airline_company_id',
        sourceKey: '_id'
      });
    }
    return Company;
  };
  