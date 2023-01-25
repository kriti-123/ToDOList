const { urlencoded } = require('express');
const express = require('express');
const { url } = require('inspector');
const path = require('path');
const port = 8000;
const app = express();
//importing database

const db = require('./config/mongoose');
//schema-----
const Task = require('./models/task');


//setup the view engine
app.set('view engine','ejs');
app.set('views', './views');
app.use(express.static('assets'));
app.set('views',path.join(__dirname,'views'));
//for url encryption
app.use(express.urlencoded());

app.get('/', function(req, res){
    Task.find({}, function(err, task){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home', {
            tittle: "Home",
            task: task
        });
    }
)});
//------------to create task-----------------------------
app.post('/create-task', function(req, res)
{
      Task.create({
          description: req.body.description,
          category: req.body.category,
          date: req.body.date
          }, function(err, newtask){
          if(err)
          {
            console.log('error in creating task', err);
             return;
          }
          return res.redirect('back');
  
      });
  });
  //--------delete task--------------------------------
  app.get('/delete-task', function(req, res){
    // geting the id from  the selected task
    var id = req.query;
    //console.log(id);

    //count the total number of ids to be deleted
    var count = Object.keys(id).length;
     //console.log(count);
    for(let i=0; i < count ; i++)
    {
        Task.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
            console.log('error while deleting task');
            }
        })
    }
    return res.redirect('back'); 
});

app.listen(port,function(err){
    if(err)
    {
        console.log("error while running server");
    }
    console.log('successful');
});

