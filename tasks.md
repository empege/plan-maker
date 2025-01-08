# All plans and tasks for this project

## Responsive, Setup AWS?

### 07.01.2025.

- Make sure it at least shows everything on mobile
- Minor changes:
  - Input arrow positioning ✔️
- Setup hosting etc
- Google ReCaptcha ✔️
- Linting/type build errors... 😠 ❌ - Issue comes from Next Auth, there are some workarounds here: https://stackoverflow.com/questions/76388994/next-js-13-4-and-nextauth-type-error-authoptions-is-not-assignable-to-type-n which didn't work for me and I was too tired for this, I wanted to see this thing live... will come back to this sometimes... MAYBE!

### What I learned from 07.01.2025. tasks:

<br>

<br>

## Edit project, emails auths

### 01.01.2025.

- Edit project name and description ✔️
- If logged in user can add items to the project ✔️
  - Add "Add new" with plus sign at the bottom to add new elements ✔️
  - Title ✔️
  - Subtitle ✔️
  - Text ✔️
  - Checkbox with text ✔️
  - After
    - Image
    - Link (video)
    - Link (iframe?)
    - Lists
    - Text color for all items for user to choose ✔️
    - Add line to spacer ✔️
- On any change the items change and update on the server ✔️
- Only logged in user can click and change the items, or delete them ✔️
- Drag and drop item to set its new possition? (maybe just change id for now) ❌
- About page - what is this project, why, how what works, etc ✔️
- Make sure non logged in looks good! ✔️
- Email confirmation when creating profile ✔️

- Confirm password on signup also, not just on changing in profile ✔️
- If not verified yet, don't stay as non owner? ✔️
- hash token ✔️
- Delete profile ✔️
- Redirect to project when created ✔️

### What I learned from 01.01.2025. tasks:

https://dndkit.com/ for drag and drop in react, other libs like https://www.npmjs.com/package/react-beautiful-dnd or https://www.npmjs.com/package/@hello-pangea/dnd not working anymore with React 18+

I learned that chatgpt is my friend, but I'll need to recreate this whole project fully without it. Things like this run so smoothly when they are simple, but even this would take me 10 times more time to finish without it. Good thing is that when you go through all of this once with its help, doing it alone is much easier as you already know in theory what is needed :)

<br>

<br>

## Login, SMTP, password reset using email...

### 26.12.2024.

- When on login page but logged in - redirect to / ✔️
- Add global button styling, don't reuse NavButton styles ✔️
- Add loading component ✔️
- For logged in users there will first be section showing their projects and below all other projects ✔️
- Create project page [id]? (starter only) ✔️
- Create profile page ✔️
- Reset password, can I do it with email, even locally? ✔️
- User can delete their project ✔️

### What I learned from 26.12.2024. tasks:

Better use route handlers than server actions - no FE validation, limited

<br>

<br>

## Prisma work and first components

### 20.12.2024.

- Set on submit for the form to add "New Project" to database ✔️
- Add top navigation component with home, signup and login. ✔️
  - If user logged in show projects, profile, logout buttons ✔️
  - Underline / style current page button ✔️
  - Put my email somewhere so people can contact me if they forget password so I can reset (for now) ✔️
- Add aside that has "create new project" button ❌
  - If user not logged in - take him to login page ✔️
  - Login page will also have a "Not a user - sign up here" button ✔️
  - For logged in users there will be "My Projects" tab in the aside underwhich all projects of that user will be listed - they can click on them to go to that project ❌
- Clicking on any project in the home page takes you to the project page. Only logged in user that created this specific project can edit/delete etc ✔️

### What I learned from 20.12.2024. tasks:

JWT - JSON Web Tokens vs Server Side Session. SSS is creating and storing some hash which is also sent to client, which check it and knows whether for example if user is authenticated or not. JWT has the server create token, send it to client, and client then with this token doesn't need to go back and forth with server to keep checking but has this token key on client side.

<br>

## Starting out...

### 16.12.2024.

- First commit :) ✔️
- Delete all Nextjs starting code ✔️
- Create simple component (form) that creates "New Project" ✔️
  - User (in future logged in only) can click on "New Project" to create a project for their plans. This will be visible to everyone for now, later user can choose whether it's private or public, but only logged in users can add, edit, update and delete THEIR projects. ❌
- Research how to setup MySQL with Nextjs project ✔️
- Set up MySQL with Nextjs ✔️
  - Add new user also this way? ✔️

### What I learned from 16.12.2024. tasks:

- I can use Prisma to work with MySQL using JS like code, and not with queries directly - it does it for us under the hood, with all the security, etc.
- ORM - Object relational mapping - use object oriented code to express data instead of sql code - higher level instead of lower level control

<br>
