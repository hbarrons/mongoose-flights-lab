import { Meal } from "../models/meal.js"

function newMeal (req,res){
  Meal.find({}, function(error, meals){
    res.render('meals/new', {
      title: 'Add Meal',
      meals: meals,
    })
  })
}

function create(req,res){
  Meal.create(req.body, function(error, meal){
    res.redirect('/meals/new')
  })
}

export {
  newMeal as new,
  create,
}