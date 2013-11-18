exports.index = function(req, res){
  res.render('home/index', {title: 'Band Up'});
};

exports.landing = function(req, res){
  res.render('home/landing', {title: 'Band Up | Landing Page'});
};