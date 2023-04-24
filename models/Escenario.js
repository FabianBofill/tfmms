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
  "name": "Delayed transition",
  "region": [
    {
      "regionName": "NiGEM NGFS v1.22|Europe"
    }

  ],
  "variable": "NiGEM|Domestic demand|Transition",
  "unit": "% difference,  2015 prices; local currency ( Euro Bn)",
   "values": [
      { "year": 2022, "value": -0.000342021 },
      { "year": 2023, "value": -0.016884593 },
      { "year": 2024, "value": -0.110369388 },
      { "year": 2025, "value": -0.142814934 },
      { "year": 2026, "value": -0.161475152 },
      { "year": 2027, "value": -0.176565498 },
      { "year": 2028, "value": -0.188945979 },
      { "year": 2029, "value": -0.200106665 },
      { "year": 2030, "value": -0.208601445 },
      { "year": 2031, "value": -0.219182849 },
      { "year": 2032, "value": -0.235292166 },
      { "year": 2033, "value": -0.255108684 },
      { "year": 2034, "value": -0.269741148 },
      { "year": 2035, "value": -0.275868028 },
      { "year": 2036, "value": -0.278944135 },
      { "year": 2037, "value": -0.280476779 },
      { "year": 2038, "value": -0.27656135 },
      { "year": 2039, "value": -0.261042178 },
      { "year": 2040, "value": -0.240342081 },
      { "year": 2041, "value": -0.218814492 },
      { "year": 2042, "value": -0.198520482 },
      { "year": 2043, "value": -0.17965883 },
      { "year": 2044, "value": -0.159804404 },
      { "year": 2045, "value": -0.140861273 },
      { "year": 2046, "value": -0.124091744 },
      { "year": 2047, "value": -0.108449697 },
      { "year": 2048, "value": -0.095163226 },
      { "year": 2049, "value": -0.083203793 },
      { "year": 2050, "value": -0.069352984 }
    ]
}

*/