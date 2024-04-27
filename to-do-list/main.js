import './style.css'

// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `

// `

const projectContainer = document.getElementById('project-container');

const projectArr = [];
const currentProject = {};

const createProject = () => {

};

const renderProjects = () => {
    projectContainer.innerHTML = '';

    projectArr.forEach((project) => projectContainer.innerHTML += 
    `<div class="project" id="${project.id}">
        <h6 class="project-title">${project.title}<button class="edit-button">Edit</button> <button class="add-button">+</button></h6>
        <ul>
          <li><input type="radio"> Wash Dishes</li>
          <li><input type="radio"> Wash Laundry</li>
        </ul>
     </div>
    `)
};

const editProject = () => {
    
};

const createTask = () => {

};

const deleteTask = () => {
    
};
