export interface IComments {
  id?: string;
  post_id: string;
  user_id: string;
  comment: string;
  reply_id?: string | null;
  isDelete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
