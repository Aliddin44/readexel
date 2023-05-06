const express = require('express');
const app = express();
// const ExcelJS = require('exceljs');
const path = require('path');
const { log } = require('console');

var XLSX = require("xlsx");
app.use("/", async (req,res)=>{

let filename = path.join(__dirname, "exel2.xlsx")
 
var workbook = XLSX.readFile(filename);
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
xlData = xlData.map(el=>{
    el.phone = el.phone.split('-').join("").split("(").join("").split(")").join("").split(" ").join("").split("+").join("")
    
    return el
})


let workBook = XLSX.utils.book_new();

const workSheet = XLSX.utils.json_to_sheet(xlData);

XLSX.utils.book_append_sheet(workBook, workSheet, `response`);
            let exportFileName = `response2.xls`;
            XLSX.writeFile(workBook, exportFileName);
})
app.listen(3000, ()=>{
    console.log('server running');
})