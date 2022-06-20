import {Flight} from '../models/flight.js'

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
    res.render('flights/new', {
        title: 'Add Flight'
    })
}

function create(req,res) {
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
    .then (flight => {
        res.render('flights/show', {
            flight:flight
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/flights')
    })
}

function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.id)
    .then(flight => {
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
            flight:flight
        })
    })
    .catch(error => {
        console.log(error)
        res.redirect('/flights')
    })
}

export {
    index, 
    newFlight as new,
    create,
    deleteFlight as delete,
    show,
    edit
}