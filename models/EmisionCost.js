const { Timestamp } = require('bson');
const mongoose = require('mongoose');
Schema = mongoose.Schema;


const emisisionCostSchema = new mongoose.Schema({
    Country: String,
    Assumption: String,
    SubSector: String,
    Factor: Number,
    IdHeatmap:String
});


const EmisionCost=mongoose.model('emisisionCost', emisisionCostSchema);
module.exports =EmisionCost;

/*
CSV Example

Country,Asumptions,SubSector,Factor
Slovenia,,D35,4.437115249
Slovenia,,C23,3.057319971
Slovenia,,A1,2.992020937
Slovenia,,B8,2.308793881
Slovenia,,C17,1.381622702
Slovenia,,C24,1.11065935
Slovenia,,H49,0.817186962
Slovenia,,C10-12,0.338907799
Slovenia,0.517835625,F43,0.181032967
Slovenia,,G46,0.179184236
Slovenia,,C25,0.151687032
Slovenia,0.671114761,I56,0.146685875
Slovenia,,A2,0.119354639
Slovenia,,H52,0.11270831
Slovenia,,G47,0.100729769
Slovenia,0.277100081,F41,0.,096872921
Slovenia,0.328885239,I55,0.071884604
Slovenia,,L68,0.016320268


*/
