const xlsx = require('xlsx');
const path = require('path');

// Define the path to the Excel file in the 'data' folder
const excelFilePath = path.join(__dirname, '../data/Lenders.xlsx');

// Load the Excel file
const workbook = xlsx.readFile(excelFilePath);

// Select the first sheet
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert the sheet to JSON
const jsonData = xlsx.utils.sheet_to_json(sheet);

console.log(jsonData);
// Define the output path for the JSON file
const outputJsonPath = path.join(__dirname, '../data.json');

// Save the data to a JSON file
// fs.writeFileSync(outputJsonPath, JSON.stringify(jsonData, null, 2));

console.log('Excel file successfully converted to JSON!');
