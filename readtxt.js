import fs from 'fs';

// Read the file as text
fs.readFile('references.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Split content by line breaks or another delimiter
  const array = data.split(/\r?\n/);  // Adjust the delimiter if needed

  console.log(array.length);  // Output the array

});

