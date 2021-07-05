# Bambello - Task Management App with React.js 

Kanban-style task management board app inspired by trello.com 
</br>
Production link - <a href="https://bambello.herokuapp.com/#/board/60bb8a47bfc2a07e2ada4b0f" target="_blank"> Bambello Project</a>


Manage projects and tasks using a kanban board. A board contains lists and tasks. Usually each project is a board, and the lists and cards are the tasks and subjects to do in the project. Users can modify the board and change list and card locations using Drag and Drop. 

<img alt="main-view" src="https://user-images.githubusercontent.com/81368377/124359521-1393ed00-dc2e-11eb-8c83-ca1356be7553.png">

<h2>Application Features</h2>

<ul>
    <li>Create Boards and manage projects </li>
    <li>Craete, remove, and update lists</li>
    <li>Drag and Drop lists and task cards in the board </li>
    <li>Create, remove, edit tasks  </li>
    <li>Manage members, lables, due date, attachments, activity and comments in each task  </li>
    <li>Get notifications when actions are done on your tasks</li>
    <li>Search and filter cards based on lables, members and free text</li>
    <li>Archive tasks and view the archived tasks </li>
    <li>Change the background of your board with the Unsplash Photo API</li>
        <li>View project analytics in the dashboard </li>
  </ul>
  
  <h2>Application Demo </h2>
  <ul>
    <li><a href="https://bambello.herokuapp.com/#/board/60bb8a47bfc2a07e2ada4b0f" target="_blank"> Bambello Project</a></li>
    </ul>
    </br>
    <h2> Technology Stack </h2>
The technology stack i used was MERN - MongoDB, Express, React, Node.js . 
</br> 
The app uses webSockets to update the board in real-time , without the need to refresh the page to get updates. 
</br>
The API calls to the backend are done with the REST API method , and we used middlewares to authenticate and authorize actions.

<h2>Getting Started</h2> 
1. Head to my  <a href="https://bambello.herokuapp.com/#/board/60bb8a47bfc2a07e2ada4b0f" target="_blank"> Bambello Repository</a> and clone the project or download the files. 
</br>

```
git clone https://github.com/raphaelassor/bambello.git
```
2. Enter the backend folder and make sure you have node_modules installed. After that we will initiate the server with 'npm start' 

```
cd backend 
npm i 
npm start
```
You shuold get a console ouput that the server is up and running at port 3030

3. Enter the frontend folder and repeat the same process. 
 ```
cd frontend
npm i 
npm start
```
You shuold get a console ouput that the server is up and running at localhost:3000.

the app will be up and running at localhost:3000 in your browser. enjoy ! 

   <h2>Showcase</h2>
   
   <h3>Board Main View</h3>
   <img alt="main-view" src="https://user-images.githubusercontent.com/81368377/124359521-1393ed00-dc2e-11eb-8c83-ca1356be7553.png">
   </br>
   <h3>Task Details </h3>
   <img  alt="card-details" src="https://user-images.githubusercontent.com/81368377/124360160-f6ace900-dc30-11eb-811f-0692610d82ae.png">
     </br>
   <h3> Quick Edit </h3>
<img alt="preview-edit" src="https://user-images.githubusercontent.com/81368377/124360203-31af1c80-dc31-11eb-843a-f105babe6796.png">
  </br>
  <h3>Menu </h3>
  <img alt="menu" src="https://user-images.githubusercontent.com/81368377/124360226-51464500-dc31-11eb-88d1-66f163117d58.png">
  </br> 
  <h3>Filter</h3>
<img width="1440" alt="filter" src="https://user-images.githubusercontent.com/81368377/124360252-6a4ef600-dc31-11eb-9d15-f51d6a98c382.png">
</br>
<h3>Dashboard</h3>
<img width="1007" alt="dashboard" src="https://user-images.githubusercontent.com/81368377/124360274-7e92f300-dc31-11eb-863b-7c2a04c26f90.png">

<h3>Change Background</h3>
<img width="1435" alt="Screen Shot 2021-07-03 at 7 22 16 PM" src="https://user-images.githubusercontent.com/81368377/124360762-26a9bb80-dc34-11eb-9d21-0b684591aa1c.png">
</br>



   
