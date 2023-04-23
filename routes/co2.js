const express = require ('express');
const csv = require('csv-parser');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');

const CO2 = require ('../models/CO2');

// configure multer to handle file uploads
const upload = multer({ dest: 'uploads/' });

router.post('/saveCo2', upload.single('Testco2'),(req, res)=>{

    fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
      //create an object with the data for the new document
      
      const newCo2 =new CO2 ({
        DATAFLOW: row.DATAFLOW,
        LAST_UPDATE: row.LAST_UPDATE,
        freq: row.freq,
        airpol: row.airpol,
        nace_r2: row.nace_r2,
        unit: row.unit,
        geo: row.geo,
        TIME_PERIOD: row.TIME_PERIOD,
        OBS_VALUE: row.OBS_VALUE,
        OBS_FLAG: row.OBS_FLAG
      });



      // save the document to the database
      CO2.findOne(row)
      .then(co2=>{
        if(co2){
            console.log('CO2 ya existe');
        }else{
            newCo2.save()
            .then(co2=>{
                console.log('Data saved successfully');
            })
            .catch(err =>console.log(err));
            };
        });



//       CO2.findOneAndUpdate(key, co2, { upsert: true }, (err) => {
//         if (err) console.error(err);
//       });
     })
     .on('end', () => {
       res.send('Data saved to the database!');
    });


});

module.exports=router;