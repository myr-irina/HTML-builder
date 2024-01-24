const fs = require('fs').promises;
const path = require('path');
const constants = require('fs');

const sourceDir = path.join(__dirname, 'files');
const destinationDir = path.join(__dirname, 'files-copy');

async function deleteDir(src) {
  try {
    await fs.access(src, constants.F_OK);
    // console.log("File found");
    await fs.rm(src, { recursive: true });
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

      await fs.copyFile(sourcePath, destinationPath);
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
