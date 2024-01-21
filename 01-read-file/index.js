const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

async function readTxtFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    process.stdout.write(data);
  } catch (error) {
    console.error('Error reading a file: ', error);
  }
}

readTxtFile(filePath);
