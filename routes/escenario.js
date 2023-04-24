const express = require ('express');
const router = express.Router();



const Escenario = require ('../models/Escenario');



router.post('/saveEscenario',(req, res)=>{
   
    const {model,name,region,variable,unit,values}=req.body;
    //Validacion escenario


    const key={
        model:model,
        name:name,
        region:region,
        variable:variable
    };

    Escenario.findOne(key)
    .then(escenario=>{
        if(escenario){
        //Existe la key (modelo,escenario,region,varible)
        console.log("El escenario ya existe");    

        }else{
            console.log("El escenario no existe"); 

            const newEscenario =new Escenario({
                model,
                name,
                region,
                variable,
                unit,
                values

            });
        console.log(newEscenario);

        newEscenario.save()
        .then(escenario=>{
            res.send('Data saved successfully');
        })
        .catch(err =>console.log(err));
        };
    
    })

});





module.exports=router;