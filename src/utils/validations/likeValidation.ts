import * as yup from 'yup';

export const addLikeSchema = yup.object({
  user_id: yup.string().required('User ID is required'),

  type: yup
    .string()
    .oneOf(['post', 'comment'], 'Type must be either post or comment')
    .required('Type is required'),

  post_id: yup
    .string()
    .nullable()
    .when('type', ([type], schema) =>
      type === 'post'
        ? schema.required('Post ID is required for type "post"')
        : schema,
    ),

  comment_id: yup
    .string()
    .nullable()
    .when('type', ([type], schema) =>
      type === 'comment'
        ? schema.required('Comment ID is required for type "comment"')
        : schema,
    ),
});

export const getLikesSchema = yup
  .object({
    post_id: yup.string().nullable(),
    comment_id: yup.string().nullable(),
  })
  .test(
    'at-least-one',
    'Either post_id or comment_id must be provided',
    function (value) {
      return Boolean(value.post_id || value.comment_id);
    },
  );
