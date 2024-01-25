const fs = require('fs').promises;
const path = require('path');

async function displayFileInformation() {
  const folderPath = path.join(__dirname, 'secret-folder');

  try {
    const folderContents = await fs.readdir(folderPath, {
      withFileTypes: true,
    });

    for (const item of folderContents) {
      const itemPath = path.join(folderPath, item.name);

      if (item.isFile()) {
        const fileExtension = path.extname(item.name).slice(1);
        const fileName = path.parse(item.name).name;

        const stats = await fs.stat(itemPath);
        const fileSizeKB = (stats.size / 1024).toFixed(3);

        console.log(`${fileName} - ${fileExtension} - ${fileSizeKB}kb`);
      }
    }
  } catch (error) {
    console.error('Error reading folder contents:', error.message);
  }
}

displayFileInformation();
