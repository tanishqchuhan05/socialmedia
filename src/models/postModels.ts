import { DataTypes } from 'sequelize';
import { dbConnect } from '../config/dbConnect.js';
import { nanoid } from 'nanoid';
import User from './userModels.js';
import logger from '../utils/logger/logger.js';

const Posts = dbConnect.define(
  'Posts',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => nanoid(6),
    },

    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
);

User.hasMany(Posts, { foreignKey: 'user_id' });
Posts.belongsTo(User, { foreignKey: 'user_id' });

Posts.sync()
  .then(() => {
    logger.info('Posts Table created successfully');
  })
  .catch((error: any) => {
    logger.error('Error creating table', error);
  });

export default Posts;
