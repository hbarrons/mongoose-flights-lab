import { Flight } from "../models/flight.js";


function index(req,res){
  Flight.find({}, function(error, flights){
    res.render('flights/index.ejs', {
      flights: flights,
      error: error,
    })
  })
}

function newFlight (req,res){
  res.render('flights/new.ejs')
}

function create (req,res){
  const flight = new Flight(req.body)
  flight.save((err) => {
    if (err) return res.redirect('/flights/new')
    res.redirect('/flights')
  })
  console.log(req.body)
}

export {
  index,
  newFlight as new,
  create
}