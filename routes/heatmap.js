const express = require ('express');
const router = express.Router();


const Heatmap = require ('../models/Heatmap');
const EmisionCost = require ('../models/EmisionCost');
const Escenario = require ('../models/Escenario');


router.post('/createHeatmap',(req, res)=>{
  const {Idheatmap} = req.body;
 
   // const {country,scenario,variable}=req.body;
   
    EmisionCost.find({ IdHeatmap: Idheatmap }, (err, docs) => {
        if (err) {
          console.log('Error: ', err);
        } else {
          const subsectorFactorsMap = new Map();
          docs.forEach((doc) => {
            const subsector = doc.SubSector;
            const factor = doc.Factor;
            if (subsectorFactorsMap.has(subsector)) {
              const factors = subsectorFactorsMap.get(subsector);
              factors.push(factor);
              subsectorFactorsMap.set(subsector, factors);
            } else {
              subsectorFactorsMap.set(subsector, [factor]);
            }
          });
          console.log(subsectorFactorsMap);
        }
        
      });


      Escenario.findOne({IdHeatmap: Idheatmap},(err,esc)=>{
        if (err) {
          console.log('Error: ', err);
        } else {
           const escenariopMap = new Map();
           const steps = esc.steps;
           for (let i = 0; i < steps.length; i++) {
             const year = steps[i].year;
             const rate = steps[i].rate;
             escenariopMap.set(year, rate);
           }
           console.log(escenariopMap);
         }
      });

    
      
    //   function createMatrix(map1, map2) {
    //     const matrix = [];
      
    //     map1.forEach((factors, subsector) => {
    //       const row = [];
      
    //       map2.forEach((rate, escenario) => {
    //         const value = factors.reduce((acc, factor) => acc + factor * rate, 0);
    //         row.push(value);
    //       });
      
    //       matrix.push(row);
    //     });
      
    //     return matrix;
    //   }



     });
module.exports=router;