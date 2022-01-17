module.exports = (options) => {
  return async (ctx, next) => {
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = { data: 'You did not login!' };
    }
  };
};
