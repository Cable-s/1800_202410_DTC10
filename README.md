## CapWise

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
Stop losing time juggling tasks. Timecraft helps you focus by providing distinct views to give you a full daily snapshot while offering quick access to editing and deleting of tasks.

## Technologies
Technologies used for this project:
* HTML 5, CSS
* JavaScript
* Bootstrap 5.3
* Firebase Version 8 (Authentication, Firestore, Storage, Hosting)
* jQuery

## Content
Content of the project folder:

```
 Top level of project folder:
├── .gitignore               # Git ignore file
├── categoryView.html        # category view HTML file, displayed when an authenticated user clicks on footer link for category view
├── defineCategories.html    # defineCategories HTML file, displayed once after a new user signs up to set initial categories in firestore
├── importanceView.html      # priority view HTML file, displayed when an authenticated user clicks on footer link for priority view
├── index.html               # landing HTML file, this is what users see when you come to url
├── login.html               # login HTML file, the log-in page
├── main.html                # main HTML file, the landing page after log-in or user categories set-up
├── profile.html             # user profile HTML file, visible to authenticated users via link in hamburger menu or footer
├── signup.html              # duplicate of login HTML file, used to alleviate confusion caused by having a single sign-up/login button on index.html
├── README.md                # documentation for the project. What historians will use centures from now to decipher our work
├── template.html            # developer template for creating new html files with common defaults
├── timelineView.html        # timeline view HTML file, displayed when an authenticated user clicks on footer link for timeline view
└── update.html              # an update to template.html with scripts for querying information from firebase.

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images used for themes and defaults inside of the app
        /addtask2.png        # Floating button in footer used to open Add Task modal dialog
        /check-icon.png      # Image for "complete task" button displayed in timeline/priority/category views
        /edit-icon.png       # Image for "edit task" button displayed in timeline/priority/category views
        /IndexLogo.png       # App logo displayed on index.html above login and sign-up buttons
        /info-icon.png       # ???
        /logoTime.png        # App logo displayed in top left of Navbar
        /logoTimecraft.png   # Alternative of app logo displayed ...
        /luis-villasmil-mlVb-MbxfWI4-unsplash.jpg # Used for default user profile picture
        /priority1.png       # Image used for priority view link in the footer
        /tag-icon.png        # Image used for category view link in the footer
        /timeline.png        # Image used for timeline view link in the footer
        /user-icon.png       # Image used for profile page link in the footer

├── scripts                         # Folder for scripts

        /addCategories.js           # JS required for adding categories for new user just after signup, used for defineCategories.html
        /addTask.js                 # JS for the Add Task Modal, required for the addTaskModal.html in ../text folder
        /authentication.js          # JS used by login.html/signup.html to authenticate user, redirect user to signup, and to set firebase persistence mode to "session"
        /categoryView.js            # JS used for categoryView.html file to display tasks in users categories
        /completeTask.js            # JS helper script used to allow deletion of tasks in timelineView/categoryView/importanceView HTML files as well as ../text/expiredTaskModal.html
        /date.js                    # JS helper script used by timelineView/categoryView/importanceView JS files and expiredTask.js to format date in YYYY-MM-DD for HTML forms
        /expiredTask.js             # JS for main.html to display expired tasks via ../text/expiredTaskModal.html on login
        /firebase_API.js            # firebase API required across pages to access firebase/firestore
        /getUser.js                 # JS helper script used to get firebase user metadata beyond just the uid. Used by main.js and profile.js
        /priorityView.js            # JS for importanceView.html to display tasks in order of priority
        /profile.js                 # JS for profile.html to display and edit user profile and categories
        /queryDocuments.js          # JS helper script designed for most other JS files to grab documents inside any user collection
        /script.js                  # JS used to logout user and clear session storage
        /skeleton.js                # JS to load templates such as nav_after_login.html, footer.html, addTaskModal.html, expiredTaskModal.html after login
        /timelineView.js            # JS used for timelineView.html file to display tasks in order of time
        /updateTasks.js             # JS used for edit buttons inside categoryView, importanceView and timelineView to override addTaskModal and allow editing of existing tasks


├── styles                          # Folder for styles
        /style.css                  # style for all html files
├── text                            # Folder for HTML files to be rendered on top of other pages
        /addTaskModal.html          # addTaskModal HTML file, for modal accessed by clicking footer button
        /expiredTaskModal.html      # expiredTaskModal HTML file, for modal that appears in main.html if user has expired tasks
        /footer_after_login.html    # footer navbar that will appear for authenticated user on every page with links to different views
        /nav_after_login.html       # navbar on top of screen including hamburger menu that will appear on every page for an authenticated user
        /nav_before_login.html      # navbar on top of screen displayed to unauthenticated user

Firebase hosting files:
├── .firebase
	/hosting..cache
├── .firebaserc
├── 404.html
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── storage.rules


```

## Limitations
- Delete button on Expired Task modal currently not functioning

## Resources
- In-app icons from Google Material Symbols (Apache License 2.0 https://fonts.google.com/icons/)
- Logo created by Jamie Kim
- "Add Task" button image created by Michael McBride

## Contact
* Travis Gooden - tgooden@my.bcit.ca
* Michael McBride - mmcbride21@my.bcit.ca
* ...

## Acknowledgements
* <a href="https://fonts.google.com/">Google Fonts</a>
* <a href="https://unsplash.com/@villxsmil">Luis Villasmil via Unsplash - Default User Profile picture </a>
* <a href="https://getbootstrap.com/">Bootstrap</a>
