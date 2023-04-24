const express = require ('express');
const router = express.Router();

const Heatmap = require ('../models/Heatmap');
const EmisionCost = require ('../models/EmisionCost');


router.post('/createHeatmap',(req, res)=>{
   
    const {country,scenario,variable}=req.body;

    
    EmisionCost.find({ Country: country }, (err, docs) => {
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


   

});



module.exports=router;