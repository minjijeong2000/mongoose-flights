import {Flight} from '../models/flight.js'
import { Meal } from '../models/meal.js'

function index (req, res) {
    Flight.find({})
    .then(flights => {
        res.render('flights/index', {
            title: 'List of Flights',
            flights: flights
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/')
    })
}

function newFlight (req, res) {
    const newFlight = new Flight ()
    const defaultDate = newFlight.departs
    const formattedDate = defaultDate.toISOString().slice(0,16)
    res.render('flights/new', {
        title: 'Add Flight',
        departs: formattedDate
    })
}

function create(req,res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    Flight.create(req.body)
    .then(flight => {
        console.log('CREATED FLIGHT: ', flight)
        res.redirect('/flights')
    })
    .catch(error => {
        console.log(error)
        res.redirect('/flights')
    })
}

function show(req,res) {
    Flight.findById(req.params.id)
    .populate('meals')
    .then (flight => {
        Meal.find({_id:{$nin: flight.meals}})
        .then (meals => {
            res.render('flights/show', {
                flight:flight,
                title:`${flight.airline}'s Details`,
                meals
            })
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/flights')
    })
}

function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect('/flights')
    })
    .catch(error => {
        console.log(error)
        res.redirect('/flights')
    })
}

function edit(req,res){
    Flight.findById(req.params.id)
    .then(flight => {
        res.render('flights/edit', {
            flight:flight,
            title: 'Edit Flight'
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/flights')
    })
}

function update (req, res) {
    for (let key in req.body) {
        if (req.body[key]==='') delete req.body[key]
    }
    Flight.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(flight => {
        res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
        console.log(error)
        res.redirect('/flights')
    })
}

function createTicket (req, res) {
    Flight.findById(req.params.id)
    .then(flight => {
        flight.tickets.push(req.body)
        flight.save()
        .then(() => {
            res.redirect(`/flights/${flight._id}`)
        })
    })
    .catch(err => {
        console.log(err)
        res.redirect("/")
      })
  }

  function addForMeal (req, res) {
      Flight.findById(req.params.id)
      .then(flight => {
          flight.meals.push(req.body.mealId)
          flight.save()
            .then(() => {
                res.redirect(`/flights/${flight._id}`)
            })
      })
  }

export {
    index, 
    newFlight as new,
    create,
    deleteFlight as delete,
    show,
    edit,
    update,
    createTicket,
    addForMeal
}