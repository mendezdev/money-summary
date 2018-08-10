const mongoose = require('mongoose');
const { Schema } = mongoose;

const summarySchema = new Schema({
  totalAccount: {
    type: Number
  },
  createdDate: {
    type: Date,
    default: new Date()    
  }
});

mongoose.model('summaries', summarySchema);