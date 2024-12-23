# All plans and tasks for this project

## Prisma work and first components

### 20.12.2024.

- Set on submit for the form to add "New Project" to database
- Add top navigation component with home, signup and login.
  - If user logged in show projects, profile, logout buttons
  - Underline / style current page button ☑️
  - Put my email somewhere so people can contact me if they forget password so I can reset (for now) ☑️
- Add aside that has "create new project" button
  - If user not logged in - take him to login page
  - Login page will also have a "Not a user - sign up here" button
  - For logged in users there will be "My Projects" tab in the aside underwhich all projects of that user will be listed - they can click on them to go to that project
- Clicking on any project in the home page takes you to the project page. Only logged in user that created this specific project can edit/delete etc

## Starting out...

### 16.12.2024.

- First commit :) ☑️
- Delete all Nextjs starting code ☑️
- Create simple component (form) that creates "New Project" ☑️
  - User (in future logged in only) can click on "New Project" to create a project for their plans. This will be visible to everyone for now, later user can choose whether it's private or public, but only logged in users can add, edit, update and delete THEIR projects.
- Research how to setup MySQL with Nextjs project ☑️
- Set up MySQL with Nextjs ☑️
  - Add new user also this way? ☑️

### What I learned from 16.12.2024. tasks:

- I can use Prisma to work with MySQL using JS like code, and not with queries directly - it does it for us under the hood, with all the security, etc.
- ORM - Object relational mapping - use object oriented code to express data instead of sql code - higher level instead of lower level control
