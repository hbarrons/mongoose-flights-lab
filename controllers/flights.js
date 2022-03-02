import methodOverride from "method-override";
import { Flight } from "../models/flight.js";
import { Meal } from "../models/meal.js"


function index(req,res){
  Flight.find({}).sort('departs').exec(function(error, flights){
    res.render('flights/index.ejs', {
      flights: flights,
      error: error,
      title: 'All Flights',
    })
  })
}

function newFlight (req,res){
  // res.render('flights/new.ejs')
  const newFlight = new Flight();
  // Obtain the default date
  const dt = newFlight.departs;
  // Format the date for the value attribute of the input
  const departsDate = dt.toISOString().slice(0, 16);
  res.render('flights/new', {
    title: 'Add Flight'
  });
}

const create = (req, res) => {
  if(req.body.flightNo === '') { req.body.flightNo = undefined }
  if(req.body.departs === '') { req.body.departs = undefined }
  const flight = new Flight(req.body)
  flight.save(err=> {
      if(err) return res.redirect('/flights/new')
  })
  res.redirect(`/flights/${flight._id}`)
}

function show(req,res){
  Flight.findById(req.params.id)
  .populate('meals')
  .exec(function(error, flight){
    Meal.find({_id: {$nin: flight.meal}}, function(error, meals){
      res.render("flights/show",{
        flight: flight,
        title: "Flight Information",
        meals: meals,
      })
    })
  })
}

function edit(req,res){
  Flight.findById(req.params.id, function(error, flight){
    res.render("flights/edit", {
      flight: flight,
      error: error,
      title: "Edit Flight"
    })
  })
}

function update(req,res){
  Flight.findByIdAndUpdate(req.params.id, req.body, function(err, flight){
    res.redirect(`/flights/${flight._id}`)
  })
}

function deleteFlight (req,res){
  Flight.findByIdAndDelete(req.params.id, function(error,flight){
    res.redirect("/flights")
  })
}

function createTicket (req,res){
  Flight.findById(req.params.id, function(error,flight){
    flight.tickets.push(req.body)
    flight.save(function(err){
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

// function deleteTicket (req,res){
//   Flight.findByIdAndDelete(req.params.id, function(error,flight){
//     res.redirect(`/flights/${flight._id}`)
//   })
// }

function addToFlight(req,res){
  Flight.findById(req.params.id, function(error, flight){
    flight.meals.push(req.body.mealId)
    flight.save(function(error){
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export {
  index,
  newFlight as new,
  create,
  show,
  edit,
  update,
  deleteFlight as delete,
  createTicket,
  // deleteTicket,
  addToFlight,
}