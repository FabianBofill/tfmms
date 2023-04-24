const express = require('express');
const router = express.Router();
const multer = require('multer');

const Escenario = require('../models/Escenario');

let upload = multer();
router.post('/saveEscenario', upload.single('csvFile'), (req, res) => {
    let myCSV = req.file.buffer.toString('utf8');
    let jsonFile = convertCsvToJson(myCSV);
    const { model, name, region, variable, unit, values } = jsonFile;

    //Validacion escenario
    const key = {
        model: model,
        name: name,
        region: region,
        variable: variable
    };

    Escenario.findOne(key)
        .then(escenario => {
            if (escenario) {
                //Existe la key (modelo,escenario,region,varible)
                console.log("El escenario ya existe");

            } else {
                console.log("El escenario no existe");

                const newEscenario = new Escenario({
                    model,
                    name,
                    region,
                    variable,
                    unit,
                    values

                });
                console.log(newEscenario);

                newEscenario.save()
                    .then(escenario => {
                        res.send('Data saved successfully');
                    })
                    .catch(err => console.log(err));
            };
        })
});

const convertCsvToJson = (csvText) => {
    const csvSplitted = csvText.split('\r\n');
    const headerSplitted = csvSplitted[0].split(/;(?=(?:(?:[^\"]*\"){2})*[^\"]*$)/);
    const rowSplitted = csvSplitted[1].split(/;(?=(?:(?:[^\"]*\"){2})*[^\"]*$)/);

    let yearsJSON = convertYearsToJson(headerSplitted, rowSplitted);
    return {
        "model": rowSplitted[0],
        "name": rowSplitted[1],
        "region": [{ "regionName": rowSplitted[2] }],
        "variable": rowSplitted[3],
        "unit": rowSplitted[4],
        ...yearsJSON
    };
}

const convertYearsToJson = (headerSplitted, rowSplitted) => {
    let columnNames = headerSplitted.slice(5, headerSplitted.length);
    let fields = rowSplitted.slice(5, rowSplitted.length);

    return columnNames.reduce((acc, currentValue, idx) => {
        return {
            "values": [
                ...acc["values"],
                { "year": currentValue, "value": fields[idx] }
            ]
        }
    }, { "values": [] })
};

module.exports = router;