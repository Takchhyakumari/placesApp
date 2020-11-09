var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	Blog = require("./models/blog"),
	mongoose = require("mongoose");

//connection
mongoose.connect('mongodb://localhost:27017/yelpCamp1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.get("/", function(req,res){
	Blog.find({},function(err,allBlog){
		if(err){
			console.log(err);
		}else{
			res.render("index",{blog:allBlog});
		}
	})
});

app.get("/blog",function(req,res){
	res.render("create");
});

app.post("/blog",function(req,res){
	var name = req.body.name;
	var img = req.body.img;
	var description = req.body.description;
	var newblog = {name: name, img: img, description: description};
	// campground.push(newCampground);
    // Create new campground and save to db
	Blog.create(newblog,function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			res.redirect("/");
		}
	});
});

app.get("/:id/edit",function(req,res){
	Blog.findById(req.params.id, function(err, blogfound){
		if(err){
			res.redirect("/");
		}else{
			res.render("edit",{blog: blogfound});
		}
	});
});

app.put("/:id",function(req,res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,updatedBlog){
		if(err){
				res.redirect("/");
		}else{
			res.redirect("/");
		}
	});
});

app.delete("/:id",function(req,res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/");
		}else{
			res.redirect("/");
		}
	})
})

app.listen(3000, function(){
	console.log("Its working!!");
});