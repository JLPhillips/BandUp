var moment = require("moment");
var mongoose = require("mongoose");
var Lyric = mongoose.model("Lyric");

// -----------------------------------------------[GET /lyrics]----------------->

exports.index = function(req, res){
  Lyric.find(function(err, lyrics){
    res.render('lyrics/index', {title: 'Band Up | Lyrics', lyrics: lyrics});
  });
};

// -----------------------------------------------[GET /lyrics/new]----------------->

exports.new = function(req, res){
  var date = moment().format("MMM Do YYYY, h:mm a");
  res.render('lyrics/new', {title: 'Band Up | New Lyric', date:date});
};

// -----------------------------------------------[POST /lyrics]----------------->

exports.create = function(req, res){
  // console.log("before save");
  // console.log(req.body);
  new Lyric(req.body).save(function(err, lyric, count){
    // console.log("after save");
    // console.log(lyric);
    res.redirect("/lyrics");
  });
};

// -----------------------------------------------[GET /lyrics/:id/edit]----------------->

exports.edit = function(req, res){
  res.render('lyrics/edit', {title: 'Blog | Edit Lyric'});
};

// -----------------------------------------------[PUT /lyrics/:id]----------------->

exports.update = function(req, res){
  res.redirect("/lyrics/" + req.params.id);
};

// -----------------------------------------------[GET /lyrics/:id]----------------->

exports.show = function(req, res){
  Lyric.findById(req.params.id, function(err,lyric){
    res.render('lyrics/show', {title: 'Blog | Show Lyric', lyric: lyric});
  });
};

// -----------------------------------------------[DELETE /lyrics/:id]----------------->

exports.delete = function(req, res){
  Lyric.findByIdAndRemove(req.params.id, function(err,lyric){
    res.redirect("/lyrics");
  });

  // var title = req.params.title;
  // var movies = db.read(file);
  // movies = _.reject(movies, function(movie){return movie.TITLE === title;});
  // db.write(file, movies);
};

