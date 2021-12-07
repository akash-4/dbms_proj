module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('user', {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
  });
  User.associate = models => {
    models.user.hasMany(models.ticket, {
      foreignKey: 'user_id',
      sourceKey: '_id'
    });
  };
  return User;
};
