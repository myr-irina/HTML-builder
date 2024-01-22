const fs = require('fs');
const readline = require('readline');
const path = require('path');

const filePath = path.join(__dirname, 'output.txt');

const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

console.log('Welcome! Enter text (type "exit" to quit):');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Goodbye! And have a nice day!');
    rl.close();
  } else {
    writeStream.write(`${input}\n`);

    rl.prompt();
  }
});

rl.on('close', () => {
  writeStream.end();

  console.log('Process terminated.');
});
