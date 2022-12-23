// Define a function to convert JSON to HTML
function jsonToHtml(json) {
    // Check if the input is a valid JSON object
    if (typeof json !== 'object') {
      return 'Invalid input';
    }
  
    // Initialize an empty string to store the HTML
    let html = '';
  
    // Loop through each key-value pair in the JSON object
    for (const [key, value] of Object.entries(json)) {
      // Add a div element to the HTML for each key-value pair
      html += `<div class="json-key-value">`;
  
      // Add the key to the HTML
      html += `<span class="json-key">${key}</span>: `;
  
      // Check the type of the value and format it accordingly
      if (typeof value === 'string') {
        // If the value is a string, add it as plain text
        html += `<span class="json-string">${value}</span>`;
      } else if (typeof value === 'number') {
        // If the value is a number, add it as plain text
        html += `<span class="json-number">${value}</span>`;
      } else if (typeof value === 'boolean') {
        // If the value is a boolean, add it as plain text
        html += `<span class="json-boolean">${value}</span>`;
      } else if (Array.isArray(value)) {
        // If the value is an array, add each element as a list item
        html += `<ul class="json-array">`;
        for (const element of value) {
          html += `<li>${element}</li>`;
        }
        html += `</ul>`;
      } else if (typeof value === 'object') {
        // If the value is an object, recursively convert it to HTML
        html += jsonToHtml(value);
      }
  
      // Close the div element
      html += `</div>`;
    }
  
    // Return the generated HTML
    return html;
  }

const jsonStyles = document.createElement('style')
jsonStyles.innerText = `
.json-key-value {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  
  /* Style the keys */
  .json-key {
    font-weight: bold;
  }
  
  /* Style string values */
  .json-string {
    color: blue;
  }
  
  /* Style number values */
  .json-number {
    color: green;
  }
  
  /* Style boolean values */
  .json-boolean {
    color: red;
  }
  
  /* Style arrays */
  .json-array {
    list-style-type: none;
    padding-left: 20px;
  }
  `

  document.head.appendChild(jsonStyles)