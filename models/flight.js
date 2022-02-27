import mongoose from "mongoose";

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: {
   type: String,
   enum: ['American', 'Southwest', 'United']
  },  
  airport: {
    type :String,
    enum: ['AUS','DFW', 'DEN', 'LAX', 'SAN'],
    default: function (){
      return 'DEN'
    }
  },
  flightNo: {
    type: Number,
    //need to add requiredBetween validation
    required: true,

  },
  departs: {
    type: Date, 
  }
})

const Flight = mongoose.model('FLIght', flightSchema)

export {
  Flight
}
