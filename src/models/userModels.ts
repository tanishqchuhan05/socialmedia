import DataTypes from 'sequelize';
import { dbConnect } from '../config/dbConnect.js';
import { nanoid } from 'nanoid';
import logger from '../utils/logger/logger.js';

const User = dbConnect.define(
  'User',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => nanoid(6),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
);

User.sync()
  .then(() => {
    logger.info('Table created successfully');
  })
  .catch((error) => {
    logger.error('Error creating table', error);
  });

export default User;
