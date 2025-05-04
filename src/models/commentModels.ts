import { DataTypes } from 'sequelize';
import { dbConnect } from '../config/dbConnect.js';
import { nanoid } from 'nanoid';

import Posts from './postModels.js';
import User from './userModels.js';
import logger from '../utils/logger/logger.js';

const Comments = dbConnect.define(
  'Comments',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => nanoid(6),
    },
    post_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Posts,
        key: 'id',
      },
    },

    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },

    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    reply_id: {
      type: DataTypes.STRING,
      defaultValue: null,
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

Posts.hasMany(Comments, { foreignKey: 'post_id' });
Comments.belongsTo(Posts, { foreignKey: 'post_id' });

User.hasMany(Comments, { foreignKey: 'user_id' });
Comments.belongsTo(User, { foreignKey: 'user_id' });

//self-referencing for replies
Comments.hasMany(Comments, { foreignKey: 'reply_id', as: 'replies' });
Comments.belongsTo(Comments, {
  foreignKey: 'reply_id',
  as: 'parentComment',
});

Comments.sync()
  .then(() => {
    logger.info('Comments Table created successfully');
  })
  .catch((error: any) => {
    logger.error('Error creating table', error);
  });

export default Comments;
