import './style.css'
import { parseISO, startOfDay } from "date-fns";
import { calculateDueDate } from './calculate-due-date';


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
 // Opoen Popup form
createProjectBtn.addEventListener('click', () => {
  popUpContainer.classList.add('popup-open')  
})
 
// Close Popup form
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
  let newProject = new Project(projectTitle.value, startOfDay(parseISO(projectDueDate.value)))
  projectArr.push(newProject);
  newProject.id = projectArr.indexOf(newProject) + newProject.title;
  clearForm();
  popUpContainer.classList.remove('popup-open');
  renderProjects();
  console.log(projectArr);  
})

// Render Projects
const renderProjects = () => {
    projectContainer.innerHTML = '';
    
    projectArr.forEach((project) => {
      projectContainer.innerHTML += 
      `<div class="project" id="${project.id}">
        <h6 class="project-title">${project.title}<input type="text" class="task-input" id="task-input-${project.id}"><button class="add-button">+</button> <button class="delete-button">X</button><br></h6>
        <h7 class="due-date">${calculateDueDate(project.dueDate)}</h7>
        <ul class="ul-container" id="ul-container-${project.id}">
        </ul>
      </div>
      `;
      // Render Tasks
      project.tasks.forEach((task) => {
        document.querySelector(`#ul-container-${project.id}`).innerHTML += 
        `<li>
            <input type="checkbox" class="check-box" id="test1">
            <label for="test1">${task}</label>
         </li>
        `;
      })
      saveData();
    });
};

// Add Task Button
const addTask = (e) => {
  let projectId = e.target.parentElement.parentElement.id;
  let projectIndex = projectArr.findIndex((project) => project.id === projectId);
  let taskInput = document.getElementById('task-input-' + projectId).value;
  projectArr[projectIndex].tasks.push(taskInput);
  renderProjects();
  saveData();
}

document.addEventListener('click', (e) => {
  if (e.target.matches(".add-button")) {
    addTask(e);
  }
})

// Delete Project Button
const deleteProject = (e) => {
  let indexToRemove = projectArr.findIndex((project) => project.id === e.target.parentElement.parentElement.id);
  projectArr.splice(indexToRemove, 1);
  renderProjects();
  saveData();
}

document.addEventListener('click', (e) => {
  if (e.target.matches(".delete-button")) {
    deleteProject(e);
  }
})

//save local storage
const saveData = () => {
  // localStorage.setItem('data', projectContainer.innerHTML);
  localStorage.setItem('array', JSON.stringify(projectArr));
}

const loadData = () => {
  // projectContainer.innerHTML = localStorage.getItem('data');
  let retreivedArr = localStorage.getItem('array');
  let fixedArr = JSON.parse(retreivedArr);
  projectArr.splice(0, projectArr.length, ...fixedArr)
}

loadData();
renderProjects();