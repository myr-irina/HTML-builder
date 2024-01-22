const fs = require('fs').promises;
const path = require('path');

async function mergeStyles() {
  const stylesFolderPath = path.join(__dirname, 'styles');
  const outputFolderPath = path.join(__dirname, 'project-dist');
  const outputFile = path.join(outputFolderPath, 'bundle.css');

  try {
    await fs.mkdir(outputFolderPath, { recursive: true });
    const stylesFiles = await fs.readdir(stylesFolderPath);
    const cssFiles = stylesFiles.filter(
      (file) => path.extname(file) === '.css',
    );


    const stylesArray = await Promise.all(
      cssFiles.map(async (file) => {
        const filePath = path.join(stylesFolderPath, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return fileContent;
      }),
    );

  
    const combinedStyles = stylesArray.join('\n');

    await fs.writeFile(outputFile, combinedStyles);

    console.log('Styles merged successfully.');
  } catch (error) {
    console.error('Error when merging styles:', error.message);
  }
}


mergeStyles();
