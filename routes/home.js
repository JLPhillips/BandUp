exports.index = function(req, res){
  res.render('home/index', {title: 'Band Up'});
};

exports.dashboard = function(req, res){
  res.render('home/dashboard', {title: 'Band Up | Dashboard'});
};

exports.chat = function(req, res){
  res.render('home/chat', {title: 'Band Up | Chat Page'});
};