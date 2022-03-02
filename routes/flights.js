import { Router } from 'express'
const router = Router()
import * as flightsCtrl from '../controllers/flights.js'

router.get('/new', flightsCtrl.new)
router.post('/', flightsCtrl.create)
router.get('/', flightsCtrl.index)
router.get('/:id', flightsCtrl.show)
router.get('/:id/edit', flightsCtrl.edit)
router.put('/:id', flightsCtrl.update)
router.delete('/:id', flightsCtrl.delete)
router.post('/:id/tickets', flightsCtrl.createTicket)
// router.delete('/:id/tickets', flightsCtrl.deleteTicket)
router.post('/:id/meals', flightsCtrl.addToFlight)

export {
  router
}
