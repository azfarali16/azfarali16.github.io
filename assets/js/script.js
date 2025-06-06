'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    const targetPage = navLink.textContent.trim().toLowerCase();

    pages.forEach((page) => {
      const isMatch = page.dataset.page === targetPage;
      page.classList.toggle("active", isMatch);
    });

    navigationLinks.forEach((link) => {
      const isActive = link === navLink;
      link.classList.toggle("active", isActive);
    });

    window.scrollTo(0, 0);
  });
});


// Dynamic content

//Projects
fetch('assets/data/projects.json')
  .then(response => response.json())
  .then(data => {
    const projectList = document.getElementById('project-list');

    data.forEach(project => {
      const li = document.createElement('li');
      li.className = 'project-item active';
      li.setAttribute('data-filter-item', '');
      li.setAttribute('data-category', project.dataCategory);

      // Auto-build full image path
      const imagePath = `assets/images/projects/${project.image}`;

      li.innerHTML = `
        <a href="${project.link}" target="_blank">
          <figure class="project-img">
            <div class="project-item-icon-box">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
            <img src="${imagePath}" alt="${project.alt}" loading="lazy">
          </figure>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-category">${project.category}</p>
        </a>
      `;

      projectList.appendChild(li);
    });
  })
  .catch(error => console.error('Error loading projects:', error));



  // Experiences
  fetch('assets/data/experience.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('timeline-list');

      data.forEach(exp => {
        const li = document.createElement('li');
        li.className = 'timeline-item';

        // Build bullet points
        const pointsHTML = exp.points.map(point => `<li>${point}</li>`).join('');

        // Add content
        li.innerHTML = `
          <h4 class="h4 timeline-item-title">${exp.title}</h4>
          <span>${exp.date}</span>
          <ul class="timeline-text">${pointsHTML}</ul>
        `;

        container.appendChild(li);
      });
    })
    .catch(err => console.error('Error loading experience:', err));