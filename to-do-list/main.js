import './style.css'
import { parseISO, startOfDay } from "date-fns";
import { calculateDueDate } from './calculate-due-date';
import { checkContrast } from './check-contrast';

const projectContainer = document.getElementById('project-container');
const createProjectBtn = document.getElementById('create-project-button');
const submitProjectForm = document.getElementById('project-submit');
const popUpContainer = document.getElementById('popup-container');
const cancelBtn = document.getElementById('cancel');
const projectTitle = document.getElementById('project-title');
const projectDueDate = document.getElementById('project-due-date');
const projectColor = document.getElementById('project-color');

const projectArr = [];

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
    constructor(title, dueDate, color, textColor, id) {
        this.id = id;
        this.title = title;
        this.dueDate = dueDate;
        this.color = color;
        this.tasks = [];
        this.textColor = textColor;
    }
  }

//pop up form submit
submitProjectForm.addEventListener('click', () => {
  let textColor = checkContrast(projectColor.value);
  let newProject = new Project(projectTitle.value, startOfDay(parseISO(projectDueDate.value)), projectColor.value, textColor)
  projectArr.push(newProject);
  let noSpaceTitle = projectTitle.value.split(' ').join('');
  newProject.id = projectArr.indexOf(newProject) + noSpaceTitle
  clearForm();
  popUpContainer.classList.remove('popup-open');
  renderProjects();
})

// Render Projects
const renderProjects = () => {
    projectContainer.innerHTML = '';
    
    projectArr.forEach((project) => {
      projectContainer.innerHTML += 
      `<div class="project" id="${project.id}">
        <h6 class="project-title" style="background-color: ${project.color}; color: ${project.textColor}">${project.title}
          <input type="text" maxlength="24" class="task-input" id="task-input-${project.id}">
          <button class="add-button" style="color:${project.textColor}">+</button>
          <button class="delete-button" style="color: ${project.textColor}">x</button><br>
        </h6>
        <h7 class="due-date">${calculateDueDate(project.dueDate)}</h7>
        <ul class="ul-container" id="ul-container-${project.id}">
        </ul>
      </div>
      `;
      // Render Tasks
      project.tasks.forEach((task) => {
        document.querySelector(`#ul-container-${project.id}`).innerHTML += 
        `<li>
            <input type="checkbox" class="check-box" id="${project.id + task}">
            <label for="${project.id + task}">${task}</label>
            <input type="button" id="${task}" class="task-delete-btn"" value="x"> 
         </li>
        `;
      })
      saveData();
      console.log(projectArr);
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
  let indexToDelete = projectArr.findIndex((project) => project.id === e.target.parentElement.parentElement.id);
  projectArr.splice(indexToDelete, 1);
  renderProjects();
  saveData();
}

document.addEventListener('click', (e) => {
  if (e.target.matches(".delete-button")) {
    deleteProject(e);
  }
})

//Delete Task Button
const deleteTask = (e) => {
  let projectIndex = projectArr.findIndex((project) => project.id === e.target.parentElement.parentElement.parentElement.id);
  let taskIndex = projectArr[projectIndex].tasks.findIndex((task) => task === e.target.id);
  projectArr[projectIndex].tasks.splice(taskIndex, 1);
  renderProjects();
  saveData();
}

document.addEventListener('click', (e) => {
  if (e.target.matches(".task-delete-btn")) {
    deleteTask(e);
  }
})

//save local storage
const saveData = () => {
  localStorage.setItem('array', JSON.stringify(projectArr));
}

const loadData = () => {
  let retreivedArr = localStorage.getItem('array');
  let fixedArr = JSON.parse(retreivedArr);
  projectArr.splice(0, projectArr.length, ...fixedArr)
}

loadData();
renderProjects();