document.addEventListener('DOMContentLoaded', function() {
  // Fetch the CSV file
  fetch('data.csv')
    .then(response => response.text())
    .then(data => {
      // Parse CSV data
      const rows = data.split('\n');
      var headers = rows[0].split(',');
      const projects = [];
      headers = headers.map(e => e.trimEnd());
      console.log(headers);
      

      // Create an object for each project
      for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(',');

        // Skip empty lines
        if (values.length === 1 && !values[0]) {
          continue;
        }

        const project = {};

        for (let j = 0; j < headers.length; j++) {
          if (headers[j] === 'sdgs') {
            // Remove quotes from SDG value
            project[headers[j]] = values[j].replace(/'/g, '');
          } else {
            project[headers[j]] = values[j].trim(); // Trim the values
          }
        }

        projects.push(project);
      }

      // Generate HTML content for each project
      const projectContainer = document.getElementById('project-container');
      let html = '';

      for (let i = 0; i < projects.length; i++) {
        const project = projects[i];

        // Retrieve SDGs value and split into array
        // const sdgs = project.sdgs ? project.sdgs.split('/') : [];
        console.log(project.url);

        // Generate project card HTML
        const projectCard = `
        <div class="card">
          <a target="_blank" href="${project.url}">
            <div class="zoom">
              <img class="demo" src="images/${project.image}" alt="${project.name}">
            </div>
          </a>
          <div>
            <h3>
              <a target="_blank" href="${project.url}">${project.name}</a>
            </h3>
            <p class="card-content">${project.content}</p>
            <div class="tags">
              <span class="tag">${project.stage}</span>
              <span class="tag">${project.year}</span>
              <span class="tag">${project.role}</span>
              <span class="tag">SDG: ${project.sdgs}</span>
            </div>
          </div>
        </div>
      `;

      html += projectCard;
      }

      // Insert generated HTML into the project container
      projectContainer.innerHTML = html;
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

// Clear wiggle on mobile
window.addEventListener('load', function() {
  var socialIcons = document.querySelectorAll('.social-icon');

  // Add event listener to each social icon
  socialIcons.forEach(function(icon) {
    icon.addEventListener('mouseover', function() {
      if (window.innerWidth > 768) {
        this.classList.add('wiggle');
      }
    });

    icon.addEventListener('mouseout', function() {
      if (window.innerWidth > 768) {
        this.classList.remove('wiggle');
      }
    });

    icon.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        this.classList.remove('wiggle');
      }
    });
  });
});

// Burgerbar
// JavaScript code
document.querySelector('.burger').addEventListener('click', function() {
  document.querySelector('.menu').classList.toggle('active');
});

// JavaScript to toggle the menu active class
const burgerBar = document.querySelector('.burger-bar');
const menu = document.querySelector('.menu');

burgerBar.addEventListener('click', function() {
  menu.classList.toggle('active');
});

// JavaScript to toggle the active class on the navbar when the burger bar is clicked
var navbar = document.querySelector('.navbar');
var burger = document.querySelector('.burger');

burger.addEventListener('click', function() {
  menu.classList.toggle('active');
});
