const mongoose = require('mongoose');
Schema = mongoose.Schema;

const EscenarioSchema = new mongoose.Schema({
    model:{
        type: String,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    region:[{
        regionName:{
            type: String,
            required:true
        }  
    }],
    variable:{
        type: String,
        required:true
    },
    unit:{
        type: String
    },
    values: [{
        year: {
          type: Number
        },
        value: {
          type: Number
        }
      }]
});

const Escenario=mongoose.model('Escenario', EscenarioSchema);
module.exports =Escenario;

/*
EJEMPLO JSON
{
  "model": "NiGEM NGFS v1.22 [REMIND-MAgPIE 3.0-4.4]",
  "name": "Net Zero 2050",
  "region": [
    {
      "regionName": "NiGEM NGFS v1.22|Europe"
    }

  ],
  "variable": "Price of carbon",
  "unit": "US$2010/t CO2",
   "values": [
      { "year": 2020, "value": 30.4372842052246 },
      { "year": 2025, "value": 226.169581288743 },
      { "year": 2030, "value": 301.57348772872 },
      { "year": 2040, "value": 448.503265736212 },
      { "year": 2050, "value": 595.429850504052 } 
    ]
}
*/