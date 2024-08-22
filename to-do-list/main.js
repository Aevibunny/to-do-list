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

const showProjectForm = () => {
  
}
 // Pop up form
createProjectBtn.addEventListener('click', () => {
  popUpContainer.classList.add('popup-open')  
})

cancelBtn.addEventListener('click', () => {
  popUpContainer.classList.remove('popup-open');
  clearForm();
})

// Clear Form
let clearForm = () => {
  projectTitle.value = '';
  projectDueDate.value = '';
}

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

const renderProjects = () => {
    projectContainer.innerHTML = '';

    projectArr.forEach((project) => {
      projectContainer.innerHTML += 
      `<div class="project" id="${project.id}">
        <h6 class="project-title">${project.title} ${project.dueDate} <button class="add-button">+</button> <button class="delete-button">X</button></h6>
        <ul class="ul-container" id="ul-container-${project.id}">
        </ul>
      </div>
      `;
    });
};

const deleteTask = () => {
    
};

// Add Task Button
const addTask = (e) => {
    const task = document.createElement('li');
    task.textContent = "test";
    document.getElementById('ul-container-' + e.target.parentElement.parentElement.id).append(task);
};


document.addEventListener('click', e => {
  if (e.target.matches(".add-button")) {
    addTask(e);
  }
})

// Delete Project Button
document.addEventListener('click', e => {
  if (e.target.matches(".delete-button")) {
    deleteProject(e);
  }
})

const deleteProject = (e) => {
    let indexToRemove = projectArr.findIndex((project) => project.id === e.target.parentElement.parentElement.id);
    projectArr.splice(indexToRemove, 1);
    renderProjects();
    console.log(projectArr);
}

renderProjects();