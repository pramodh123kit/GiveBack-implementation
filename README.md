# ★ GiveBack Repository ★  
_**Welcome to the Repository of **GiveBack** 👨‍🎓**_

## Completed Project Demo
[![Watch the video](https://img.youtube.com/vi/your-video-id/0.jpg)](https://www.youtube.com/watch?v=Yx3rLs5Kykw)



## Overview
* This repository manages the codebase for **GiveBack**. It handles the user interface, interactions, and presentation logic for the application and backend logic.

# Prerequisites

## Install Git
* Ensure Git is installed on your machines. You can download and install Git from the official website: [Git Downloads](https://git-scm.com/downloads)
## Install Node 
* Ensure Node is installed on your machines. You can download and install Git from the official website: [Git Downloads](https://nodejs.org/en/download) 

## Understanding Git Basics
You should understand the fundamental concepts of Git, including:

* Repositories: Understand what repositories are and how they function as containers for projects.
* Commits: Understand how commits represent changes and how they're used to track project history.
* Branches: Understand the purpose of branches and how they facilitate parallel development.
* Remotes: Understand remote repositories and their relationship with local repositories.
* Pushing and Pulling: Understand how to push changes from a local repository to a remote repository and pull changes from a remote to a local repository.

# How to set up the workspace    

## Cloning the Repository:
<pre>
# Type this in Git bash or VS Code in-built terminal to Clone the main branch
# Go to whatever directory you want the repo folder to be created through the terminal your using
git clone https://github.com/pramodh123kit/GiveBack-implementation.git
cd Giveback-implementation
# To open the VS code from the project folder
code .
</pre>
  


## Checking Out to the Specific Branch:
## To get a copy of the main branch
<pre>
# Your branch's name (eg: pramodh_branch)
git checkout pramodh_branch

git fetch origin main
git checkout main
git pull origin main 
git checkout pramodh_branch <--your branch's name
git merge main

# Go to the frontend folder as below shown
cd giveback-frontend-manager
npm install
npm run dev # This will run the React website
</pre>



***Remember, when you clone the repository, you get a local copy of all branches, but you have to explicitly switch to your branch for you to work on your designated part of the project.***

# How to commit the changes you've done  

## Commit Changes
<pre>
# Git status will list the changes you have done (added a new file, deleted a file, updated a file)
git status
  
# This will add all the changes you have done
git add --all
git commit -m "a message of what your going to commit comes here" 
  
# Replace this "pramodh_branch" name with your branch's name
git push origin pramodh_branch 
</pre>

## Create a Pull Request
* Go to the repository on GitHub and navigate to (your branch)
* Click on the "Pull Request" button
* In the Pull Request interface, select the **main branch**
* Write a description, changes and screenshots of the updates you've made in Pull Request

 ### _**DO NOT MERGE ALONE!!!**_   
 ### _WE WILL TAKE MEETINGS AND MERGE EVERYONE'S PROGRESS ONE BY ONE_
  

_**That's it !!! 👩‍💻**_
