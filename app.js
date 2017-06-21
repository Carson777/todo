const express = require('express');
const app = express()
const mustache = require('mustache-express');
const bodyParser = require('body-parser');

app.engine("mustache", mustache())
app.set('view engine', 'mustache');
app.set('views', './views');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.listen(3000, function(){})

const tasks = [];
const done = [];

app.get('/', function (req, res){
	res.render("home", {
		tasks: tasks,
		done
	})

});
app.post('/', function(req, res){
	if(req.body.done){
		for (i = 0; i < tasks.length; i++) {
    		if(tasks[i]===req.body.done){
    			tasks.splice(tasks[i]-1, 1)
    		}
		}
		done.push(req.body.done)
	} else if ( req.body.task){
		tasks.push(req.body.task)
	 }
	 res.redirect('/')
});