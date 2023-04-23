const mongoose = require('mongoose');
Schema = mongoose.Schema;


const Co2Schema = new mongoose.Schema({
//DATAFLOW,LAST_UPDATE,freq,airpol,nace_r2,unit,geo,TIME_PERIOD,OBS_VALUE,OBS_FLAG
DATAFLOW: String,
LAST_UPDATE: String,
freq: String,
airpol: String,
nace_r2: String,
unit: String,
geo: String,
TIME_PERIOD: String,
OBS_VALUE: String,
OBS_FLAG: String
});




const CO2=mongoose.model('Co2', Co2Schema);
module.exports =CO2;
