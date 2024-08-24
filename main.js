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

const renderProjects = () => {
  projectContainer.innerHTML = '';
  
  projectArr.forEach((project) => {
      // Create project container
      const projectDiv = document.createElement('div');
      projectDiv.classList.add('project');
      projectDiv.id = project.id;

      // Create project title
      const projectTitle = document.createElement('h6');
      projectTitle.classList.add('project-title');
      projectTitle.style.backgroundColor = project.color;
      projectTitle.style.color = project.textColor;
      projectTitle.textContent = project.title;

      // Create input elements and buttons
      const taskInput = document.createElement('input');
      taskInput.type = 'text';
      taskInput.maxLength = 24;
      taskInput.classList.add('task-input');
      taskInput.id = `task-input-${project.id}`;

      const addButton = document.createElement('button');
      addButton.classList.add('add-button');
      addButton.style.color = project.textColor;
      addButton.textContent = '+';

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.style.color = project.textColor;
      deleteButton.textContent = 'x';

      projectTitle.appendChild(taskInput);
      projectTitle.appendChild(addButton);
      projectTitle.appendChild(deleteButton);

      // Create and style due date
      const dueDate = document.createElement('h7');
      dueDate.classList.add('due-date');
      let calculatedDate = calculateDueDate(project.dueDate);
      if (!project.dueDate || project.dueDate == 'Invalid Date') {
        dueDate.textContent = '';
      } else if (calculatedDate === 0) {
        dueDate.textContent = "Due Today!";
        dueDate.classList.add('yellow-highlight')
      } else if (calculatedDate < 0) {
        dueDate.textContent = `Due ${calculatedDate * -1} day(s) ago!`;
        dueDate.classList.add('yellow-highlight')
      } else {
        dueDate.textContent = `Due in ${calculatedDate} day(s)`;
        dueDate.classList.add('due-date-future')
      }

      // Create ul container
      const ulContainer = document.createElement('ul');
      ulContainer.classList.add('ul-container');
      ulContainer.id = `ul-container-${project.id}`;

      // Append elements to project container
      projectDiv.appendChild(projectTitle);
      projectDiv.appendChild(dueDate);
      projectDiv.appendChild(ulContainer);

      // Append project to main container
      projectContainer.appendChild(projectDiv);

      // Render Tasks
      project.tasks.forEach((task) => {
          const li = document.createElement('li');

          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.classList.add('check-box');
          checkbox.id = `${project.id}${task}`;

          const label = document.createElement('label');
          label.htmlFor = `${project.id}${task}`;
          label.textContent = task;

          const deleteTaskButton = document.createElement('input');
          deleteTaskButton.type = 'button';
          deleteTaskButton.id = task;
          deleteTaskButton.classList.add('task-delete-btn');
          deleteTaskButton.value = 'x';

          li.appendChild(checkbox);
          li.appendChild(label);
          li.appendChild(deleteTaskButton);

          ulContainer.appendChild(li);
      });
  });

  saveData();
  console.log(projectArr)
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