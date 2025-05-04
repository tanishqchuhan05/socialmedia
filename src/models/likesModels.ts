import { DataTypes } from 'sequelize';
import { dbConnect } from '../config/dbConnect.js';
import { nanoid } from 'nanoid';
import User from './userModels.js';
import Posts from './postModels.js';
import Comments from './commentModels.js';
import logger from '../utils/logger/logger.js';

const Likes = dbConnect.define(
  'Likes',
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

    post_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: Posts,
        key: 'id',
      },
    },

    comment_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: Comments,
        key: 'id',
      },
    },

    type: {
      type: DataTypes.ENUM('post', 'comment'),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
);

// Associations
User.hasMany(Likes, { foreignKey: 'user_id' });
Likes.belongsTo(User, { foreignKey: 'user_id' });

Posts.hasMany(Likes, { foreignKey: 'post_id' });
Likes.belongsTo(Posts, { foreignKey: 'post_id' });

Comments.hasMany(Likes, { foreignKey: 'comment_id' });
Likes.belongsTo(Comments, { foreignKey: 'comment_id' });

Likes.sync({ alter: true })
  .then(() => {
    logger.info('Likes table created successfully');
  })
  .catch((error: any) => {
    logger.error('Error creating or altering Likes table', error);
  });

export default Likes;
