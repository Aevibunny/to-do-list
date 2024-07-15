import './style.css'

// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `

// `

const projectContainer = document.getElementById('project-container');
const createProjectBtn = document.getElementById('create-project-button');
const submitProjectForm = document.getElementById('project-submit');
const popUpContainer = document.getElementById('popup-container');
const cancelBtn = document.getElementById('cancel');
const projectTitle = document.getElementById('project-title');
const projectDueDate = document.getElementById('project-due-date');

const projectArr = [];
const currentProject = {};

const showProjectForm = () => {
  
}
 // Pop up form
createProjectBtn.addEventListener('click', () => {
  popUpContainer.classList.add('popup-open')  
})

cancelBtn.addEventListener('click', () => {
  popUpContainer.classList.remove('popup-open')
})


//constructor
class Project {
    constructor(title, dueDate, id) {
        this.id = id;
        this.title = title;
        this.dueDate = dueDate;
        this.tasks = [];
    }
  }

//pop up form submit
submitProjectForm.addEventListener('click', () => {
  let newProject = new Project(projectTitle.value, projectDueDate.value)
  projectArr.push(newProject);
  newProject.id = projectArr.indexOf(newProject) + newProject.title;
  clearForm();
  popUpContainer.classList.remove('popup-open');
  renderProjects();
  console.log(projectArr);  
})

// Clear Form
let clearForm = () => {
  projectTitle.value = '';
  projectDueDate.value = '';
}

// Cancel Form

cancelBtn.addEventListener('click', () => {
  popUpContainer.classList.remove('popup-open')
})

const renderProjects = () => {
    projectContainer.innerHTML = '';

    projectArr.map((project) => projectContainer.innerHTML += 
    `<div class="project" id="${project.id}">
        <h6 class="project-title">${project.title} ${project.dueDate}<button class="edit-button">Edit</button> <button class="add-button">+</button></h6>
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
