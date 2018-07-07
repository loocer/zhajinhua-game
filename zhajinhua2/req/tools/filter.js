exports.authorize = function(req, res, next) {
  if (!req.session.user_id) {
   	res.status(401),
 	res.json('请登录！')
  } else {
    next();
  }
}