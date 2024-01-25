const fs = require('fs').promises;
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const destinationDir = path.join(__dirname, 'files-copy');

async function deleteDir(src) {
  try {
    const dirExists = await fs
      .access(src, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (dirExists) {
      await fs.rm(src, { recursive: true });
      console.log('Directory deleted successfully.');
    } else {
      console.log('Directory does not exist.');
    }
  } catch (err) {
    console.error('Error deleting directory:', err.message);
  }
}

async function copyDir(sourceDir, destinationDir) {
  try {
    await fs.mkdir(destinationDir, { recursive: true });
    const sourceContents = await fs.readdir(sourceDir);

    for (const item of sourceContents) {
      const sourcePath = path.join(sourceDir, item);
      const destinationPath = path.join(destinationDir, item);

      const stat = await fs.stat(sourcePath);

      if (stat.isFile()) {
        const content = await fs.readFile(sourcePath, 'utf-8');
        await fs.writeFile(destinationPath, content, 'utf-8');
      } else if (stat.isDirectory()) {
        await copyDir(sourcePath, destinationPath);
      }
    }

    console.log('Directory updated successfully.');
  } catch (error) {
    console.error('Error copying directory:', error.message);
  }
}

(async () => {
  await deleteDir(destinationDir);
  await copyDir(sourceDir, destinationDir);
})();
