const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
  const sourceDir = path.join(__dirname, 'files');
  const destinationDir = path.join(__dirname, 'files-copy');

  try {
    await fs.mkdir(destinationDir, { recursive: true });
    const sourceContents = await fs.readdir(sourceDir);

    for (const item of sourceContents) {
      const sourcePath = path.join(sourceDir, item);
      const destinationPath = path.join(destinationDir, item);

      await fs.copyFile(sourcePath, destinationPath);
    }

    console.log('Directory copied successfully.');
  } catch (error) {
    console.error('Error copying directory:', error.message);
  }
}

copyDir();
