const express = require('express');
const router = express.Router();


const Heatmap = require('../models/Heatmap');
const EmisionCost = require('../models/EmisionCost');
const Escenario = require('../models/Escenario');


router.get('/createHeatmap/:Idheatmap', (req, res) => {
    const { Idheatmap } = req.params;

    EmisionCost.find({ IdHeatmap: Idheatmap }, (err, docs) => {
        if (err) {
            console.log('Error: ', err);
        } else {
            /*VARIABLES*/
            const subsectorFactorsMap = new Map();
            let totalFactor = 0;
            const escenariopMap = new Map();
            /*FIND SCENARIO*/
            Escenario.findOne({ IdHeatmap: Idheatmap }, (err, esc) => {
                if (err) {
                    console.log('Error: ', err);
                } else {
                    const steps = esc.steps;
                    for (let i = 0; i < steps.length; i++) {
                        const year = steps[i].year;
                        const rate = steps[i].rate;
                        escenariopMap.set(year, rate);
                    }
                }

                /*FIND SECTORS*/
                docs.forEach((doc) => {
                    const subsector = doc.SubSector;
                    const factor = doc.Factor;
                    if (subsectorFactorsMap.has(subsector)) {
                        const factors = subsectorFactorsMap.get(subsector);
                        //factors.push(factor);
                        factors.percentage = factor; // Store the new factor as the second value
                        subsectorFactorsMap.set(subsector, factors);
                    } else {
                        subsectorFactorsMap.set(subsector, { factor: factor }); // Store the first factor as a property of an object
                        //subsectorFactorsMap.set(subsector, [factor]);
                        totalFactor += factor;
                    }
                });
                /*END FIND SECTORS*/
                const yearsSet = [];

                subsectorFactorsMap.forEach(function(key, value) {
                    key.percentage = key.factor / totalFactor;
                    // const newValue=value;
                    escenariopMap.forEach(function(rate, year) {
                        if (!yearsSet.includes(year)) {
                            yearsSet.push(year);
                        }
                        key[year] = rate * key.factor;
                    });

                });

                let resHeat = {};
                subsectorFactorsMap.forEach(function(key, value) {
                    for (let i = yearsSet.length - 1; i > 0; i--) {
                        key[yearsSet[i]] = (((key[yearsSet[i]] - key[yearsSet[i - 1]]) / key[yearsSet[i - 1]]) * key.percentage) * 100;
                    }

                });

                for (let [key, value] of subsectorFactorsMap) {
                    let dataArray = [];
                    for (let i = 1; i < yearsSet.length; i++) {
                        let dataObject = { 'scenario': yearsSet[i], 'value': value[yearsSet[i]] };

                        dataArray.push(dataObject);
                    }
                    resHeat[key] = dataArray;
                }

                // console.log(resHeat);
                res.json(resHeat);

            });
        }
    });






});
module.exports = router;