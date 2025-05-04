import { IComments } from './CommentInterface/IComments.js';

export interface IUpdateComment {
  comment_id: string;
  updatedData: Partial<IComments>;
}
