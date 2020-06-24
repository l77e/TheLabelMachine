var express = require('express');
var router = express.Router();

var LabelMachine = require('./labelmachine')


let labeler = new LabelMachine()
const title = 'TheLabelMachine'
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: title, currentFile: labeler.currentFile});
});

router.get('/label', function(req, res) {
  let rawLabels = req.query.rawLabels
  let currentFile = req.query.currentFile
  labeler.currentFile = currentFile
  res.render('tinder', { title: title , 
    currentFile: "/images/trainingImages/" + labeler.currentFile, 
    currentFileName: labeler.currentFile, 
    labels : rawLabels.split(','),
    rawlabels : rawLabels
 });
});

router.get('/performlabel', function(req, res) {
  let labels = req.query.tickedlabels;
  if (labels === undefined) {
    labels = [];
  }
  labeler.applyLabel(labels);
  replaceAll(req.query.rawlabels, ',', "%2C");
  replaceAll(req.query.rawlabels, '+', "%20");
  res.redirect("/label?rawLabels="+req.query.rawlabels+"&currentFile="+labeler.getNext())
});

function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}
module.exports = router;
