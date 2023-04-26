const express = require ('express');
const csv = require('csv-parser');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');

const EmisionCost = require ('../models/EmisionCost');

// configure multer to handle file uploads
const upload = multer({ dest: 'uploads/' });

router.post('/saveEmision', upload.single('EmisionCost'), (req, res) => {
  const idHeatmap = req.body.Idheatmap;


    fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
      //create an object with the data for the new document
      
      const newEmision =new EmisionCost ({
        Country: row.Country,
        Assumption: row.Assumption,
        SubSector: row.SubSector,
        Factor: row.Factor,
        IdHeatmap:idHeatmap
      });

      // save the document to the database
      EmisionCost.findOne(row)
      .then(emision=>{
        if(emision){
            console.log('Emision ya existe');
        }else{
            newEmision.save()
            .then(emision=>{
                console.log('Data saved successfully');
            })
            .catch(err =>console.log(err));
            };
        });

     })
     .on('end', () => {
       res.send('Data saved to the database!');
      });


});

module.exports=router;