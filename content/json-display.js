function jsonToHtml(json) {
    // Create a container for the HTML elements
    let html = '<div>';
  
    // Iterate over the keys in the JSON object
    for (let key in json) {
      // Get the value of the current key
      let value = json[key];
  
      // Check the type of the value
      if (typeof value === 'object') {
        // The value is an object, so recursively convert it to HTML
        html += '<b>' + key + '</b>: ' + jsonToHtml(value);
      } else if (typeof value === 'string') {
        // The value is a string, so create a text node
        html += '<b>' + key + '</b>: ' + value;
      } else if (typeof value === 'number') {
        // The value is a number, so create a text node
        html += '<b>' + key + '</b>: ' + value;
      } else if (typeof value === 'boolean') {
        // The value is a boolean, so create a text node
        html += '<b>' + key + '</b>: ' + value;
      } else {
        // The value is something else, so handle it as needed
        html += '<b>' + key + '</b>: ' + value;
      }
    }
  
    // Close the container element
    html += '</div>';
  
    // Return the resulting HTML
    return html;
  }


  // Define the JSON object
let json = {
    name: 'John Doe',
    age: 35,
    married: true,
    children: [
      {
        name: 'Jane Doe',
        age: 10
      },
      {
        name: 'Jack Doe',
        age: 5
      }
    ]
  };
  
  // Define the CSS styles
  let styles = `
    .json-container {
      font-family: sans-serif;
      color: #ddd;
      background-color: #333;
      padding: 20px;
      border-radius: 10px;
    }
  
    .json-key {
      font-weight: bold;
    }
  `;
  
  // Convert the JSON object to HTML
  let html = '<style>' + styles + '</style><div class="json-container">' + jsonToHtml(json) + '</div>';
  
  // Insert the HTML into the page
  document.getElementById('output').innerHTML = html;
  