import * as yup from 'yup';

export const addCommentSchema = yup.object({
  user_id: yup.string().required('User ID is required'),
  post_id: yup.string().required('Post ID is required'),
  comment: yup.string().required('Comment is required'),
  reply_id: yup.string().nullable(),
});

export const getCommentSchema = yup.object({
  post_id: yup.string().required('Post ID is required'),
});

export const deleteCommentSchema = yup.object({
  comment_id: yup.string().required('Comment ID is required'),
});

export const updateCommentSchema = yup.object({
  comment_id: yup.string().required('Comment ID is required'),
  updatedData: yup
    .object()
    .required()
    .test({
      name: 'not-empty',
      message: 'Updated data must not be empty',
      test: (val) => val && Object.keys(val).length > 0,
    }),
});
