export interface ILikes {
  user_id: string;
  post_id?: string;
  comment_id?: string;
  type: 'post' | 'comment';
}
