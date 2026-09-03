# L05 — npm & package.json

## What Am I Trying to Understand?

So far, I have learned how Node.js runs JavaScript and how modules help me split my code into different files.

But when I start building real applications, I will need **packages** made by other developers.

For example, instead of writing everything myself, I might want a package for:

* Creating web servers
* Working with databases
* Validating data
* Hashing passwords
* Handling authentication
* Logging

This is where **npm** comes in.

In this lesson, I want to understand:

* What npm is
* What a package is
* What `package.json` is
* How to create a Node.js project
* How `npm init` works
* How to install packages
* What `node_modules` is
* What `package-lock.json` does
* Dependencies vs dev dependencies
* How `npm install` works
* How npm scripts work
* Why `node_modules` should not be pushed to GitHub

---

# 1. What is npm?

**npm stands for Node Package Manager.**

It is the package manager commonly used with Node.js.

Its main job is to help me:

```text
Install packages
Manage packages
Update packages
Remove packages
Run project scripts
```

For example, later when I start Express.js, I can install it with:

```bash
npm install express
```

Instead of manually downloading Express and putting its files into my project, npm handles it for me.

---

# 2. What is a Package?

A package is basically a piece of reusable code that someone has created and published so other developers can use it.

For example:

```text
My application
      │
      ├── Express
      ├── MongoDB driver
      ├── bcrypt
      └── jsonwebtoken
```

I don't need to build all of these from scratch.

I can install them into my project and use them.

A package can contain:

```text
JavaScript code
Configuration
Documentation
Dependencies
Metadata
```

---

# 3. npm and Node.js Are Not the Same Thing

This is worth clearing up.

```text
Node.js
→ JavaScript runtime

npm
→ Package manager
```

Node.js allows me to run JavaScript:

```bash
node app.js
```

npm helps me manage packages:

```bash
npm install express
```

So:

```text
             Node.js
                │
        Runs JavaScript
                │
                ↓
           My Backend
                ↑
                │
              npm
                │
       Manages packages
```

---

# 4. Creating a Node.js Project

Until now, I could simply create:

```text
app.js
```

and run:

```bash
node app.js
```

But a proper Node.js project needs some information about itself.

That's where `package.json` comes in.

I can create one using:

```bash
npm init
```

npm will ask me a few questions:

```text
package name:
version:
description:
entry point:
test command:
git repository:
keywords:
author:
license:
```

After completing the prompts, npm creates:

```text
package.json
```

---

# 5. What is `package.json`?

`package.json` is basically the **information and configuration file for my Node.js project**.

A simple one might look like:

```json
{
    "name": "my-backend",
    "version": "1.0.0",
    "description": "My Node.js backend",
    "main": "app.js",
    "scripts": {
        "start": "node app.js"
    },
    "author": "Vivek",
    "license": "ISC"
}
```

It tells npm and other developers things about my project.

For example:

```text
name
→ Project name

version
→ Current project version

description
→ What the project is about

main
→ Main entry point

scripts
→ Commands I can run

dependencies
→ Packages required by the project
```

---

# 6. `npm init -y`

If I don't want npm to ask me all those questions, I can use:

```bash
npm init -y
```

This creates `package.json` with default values.

For learning and small projects, this is convenient.

Example:

```bash
mkdir my-app
cd my-app
npm init -y
```

Now:

```text
my-app/
│
└── package.json
```

---

# 7. Installing a Package

Let's install a package.

I'll use a small package called `chalk` as an example.

Run:

```bash
npm install chalk
```

npm will:

1. Download the package
2. Put it inside `node_modules`
3. Add it to `package.json`
4. Create or update `package-lock.json`

My project now looks like:

```text
my-app/
│
├── node_modules/
├── package.json
└── package-lock.json
```

---

# 8. What Happens to `package.json`?

Before installation:

```json
{
    "name": "my-app",
    "version": "1.0.0"
}
```

After:

```bash
npm install chalk
```

I will have something similar to:

```json
{
    "name": "my-app",
    "version": "1.0.0",
    "dependencies": {
        "chalk": "^5.x.x"
    }
}
```

The exact version will depend on when I install it.

The important part is:

```json
"dependencies": {
    "chalk": "^5.x.x"
}
```

This tells my project:

> "This application depends on the `chalk` package."

---

# 9. Using the Installed Package

If the package supports ES Modules, I can use it like:

```javascript
import chalk from "chalk";

console.log(chalk.green("Hello from Node.js!"));
```

Then:

```bash
node app.js
```

The package is available because npm installed it into the project.

This gives me the basic relationship:

```text
npm install chalk
        ↓
package.json
        ↓
node_modules
        ↓
app.js
        ↓
import chalk
```

---

# 10. What is `node_modules`?

After installing a package, npm creates:

```text
node_modules/
```

This directory contains the packages installed for my project.

For example:

```text
node_modules/
│
├── chalk/
├── some-package/
├── another-package/
└── ...
```

Sometimes a package also depends on other packages.

So `node_modules` can become very large.

That's why I normally **do not push `node_modules` to GitHub**.

---

# 11. Why Don't I Push `node_modules`?

Suppose my project contains:

```text
node_modules/
```

and I push it to GitHub.

That's unnecessary because someone can simply run:

```bash
npm install
```

npm looks at:

```text
package.json
package-lock.json
```

and downloads the required packages again.

So instead of pushing:

```text
node_modules/
```

I push:

```text
package.json
package-lock.json
```

Then someone cloning my project can run:

```bash
npm install
```

and recreate:

```text
node_modules/
```

This is exactly why we added:

```text
node_modules/
```

to the `.gitignore` file of `BackendJournal`.

---

# 12. What is `package-lock.json`?

When I install a package, npm creates:

```text
package-lock.json
```

This file records the **exact dependency versions** that were installed, including the dependency tree.

For example, `package.json` might say:

```json
"chalk": "^5.0.0"
```

The `^` allows compatible versions within the specified range.

But the lock file records the exact versions npm resolved.

This helps make installations more consistent across different machines.

So I should generally commit:

```text
package.json
package-lock.json
```

but not:

```text
node_modules/
```

---

# 13. `package.json` vs `package-lock.json`

This distinction is important.

### `package.json`

Describes what my project **depends on**.

Example:

```json
"dependencies": {
    "express": "^5.1.0"
}
```

### `package-lock.json`

Records the **exact dependency tree resolved by npm**.

Think of it like:

```text
package.json
→ What I want

package-lock.json
→ Exactly what npm installed
```

---

# 14. Installing a Specific Version

I can install a specific package version:

```bash
npm install express@5.1.0
```

Or:

```bash
npm install chalk@5.6.0
```

This becomes useful when I need to work with a particular version.

I can check installed packages using:

```bash
npm list
```

Or a specific package:

```bash
npm list chalk
```

---

# 15. Installing a Package Globally

There is also:

```bash
npm install -g package-name
```

The `-g` means **global**.

A globally installed package is available system-wide rather than being installed specifically inside one project.

For example:

```bash
npm install -g nodemon
```

But I should not automatically install everything globally.

For application dependencies, I normally want them installed locally:

```bash
npm install package-name
```

We'll see why local installation is important as we work with actual backend projects.

---

# 16. Removing a Package

If I no longer need a package:

```bash
npm uninstall chalk
```

npm will remove it from:

```text
node_modules
```

and also remove it from:

```text
package.json
```

So:

```bash
npm install chalk
```

adds a dependency.

And:

```bash
npm uninstall chalk
```

removes it.

---

# 17. Dependencies

When I install a package normally:

```bash
npm install express
```

npm adds it under:

```json
"dependencies": {
    "express": "^5.1.0"
}
```

These are packages my application **needs to run**.

For example:

```text
express
mongodb
bcrypt
jsonwebtoken
```

could all be runtime dependencies.

---

# 18. Dev Dependencies

Some packages are only needed while developing the application.

For example:

```text
nodemon
eslint
prettier
testing tools
```

I can install these using:

```bash
npm install --save-dev nodemon
```

or:

```bash
npm install -D nodemon
```

Then `package.json` contains:

```json
{
    "dependencies": {
        "express": "^5.1.0"
    },
    "devDependencies": {
        "nodemon": "^3.x.x"
    }
}
```

The basic idea is:

```text
dependencies
→ Needed by the application

devDependencies
→ Needed while developing the application
```

---

# 19. npm Scripts

`package.json` can also contain commands that I want to run frequently.

For example:

```json
{
    "scripts": {
        "start": "node app.js"
    }
}
```

Now instead of:

```bash
node app.js
```

I can run:

```bash
npm start
```

npm looks inside:

```json
"scripts": {
    "start": "node app.js"
}
```

and executes:

```bash
node app.js
```

---

# 20. Creating My Own Script

I can create multiple scripts:

```json
{
    "scripts": {
        "start": "node app.js",
        "dev": "node --watch app.js"
    }
}
```

Now:

```bash
npm start
```

runs:

```bash
node app.js
```

And:

```bash
npm run dev
```

runs:

```bash
node --watch app.js
```

This becomes very useful when working on backend applications.

---

# 21. `npm install` Without a Package Name

This is one of the most important npm commands.

Suppose I clone a Node.js project from GitHub.

I'll have:

```text
package.json
package-lock.json
```

but not:

```text
node_modules/
```

I can simply run:

```bash
npm install
```

npm reads the project's dependency information and installs everything required.

The flow is:

```text
Clone project
     ↓
package.json
package-lock.json
     ↓
npm install
     ↓
node_modules
     ↓
Project can run
```

---

# 22. A Small Project From Scratch

Let's put everything together.

Create a folder:

```bash
mkdir npm-demo
cd npm-demo
```

Initialize it:

```bash
npm init -y
```

Now:

```text
npm-demo/
│
└── package.json
```

Create:

```text
app.js
```

with:

```javascript
console.log("My first npm project");
```

Install a package:

```bash
npm install chalk
```

Now:

```text
npm-demo/
│
├── node_modules/
├── app.js
├── package.json
└── package-lock.json
```

The project now has:

```text
Application code
     ↓
app.js

Project information
     ↓
package.json

Exact dependency tree
     ↓
package-lock.json

Installed packages
     ↓
node_modules
```

---

# 23. The Mental Model

This is the model I want to keep in my head:

```text
                  My Node.js Project
                         │
              ┌──────────┴──────────┐
              ↓                     ↓
        package.json         package-lock.json
              │                     │
              │                     │
       What I depend on       Exact resolution
              │                     │
              └──────────┬──────────┘
                         ↓
                    npm install
                         ↓
                    node_modules
                         ↓
                   My application
```

And npm sits in the middle managing this whole process.

---

# 24. What I Should Remember

I don't need to memorize every npm command right now.

The important ones are:

### Create a project

```bash
npm init
```

or:

```bash
npm init -y
```

### Install a package

```bash
npm install package-name
```

### Install a development dependency

```bash
npm install -D package-name
```

### Remove a package

```bash
npm uninstall package-name
```

### Install project dependencies

```bash
npm install
```

### Run a script

```bash
npm run script-name
```

For the special `start` script:

```bash
npm start
```

---

# Practice

Create a small Node.js project called:

```text
npm-practice
```

Initialize it using:

```bash
npm init -y
```

Then:

1. Create an `app.js`
2. Install a package of your choice
3. Use that package inside `app.js`
4. Add a `start` script
5. Run the application using:

```bash
npm start
```

6. Check what appeared inside `package.json`
7. Look at `package-lock.json`
8. Look inside `node_modules`
9. Delete `node_modules`
10. Run:

```bash
npm install
```

11. Notice that npm recreates `node_modules`

The goal is to actually see the relationship between:

```text
package.json
package-lock.json
node_modules
npm
```

---

# Summary

In this lesson, I learned that npm is the package manager I use with Node.js.

The main pieces are:

```text
npm
→ manages packages

package.json
→ project information + dependency requirements

package-lock.json
→ exact dependency resolution

node_modules
→ installed packages
```

The basic workflow is:

```text
Create project
     ↓
npm init -y
     ↓
package.json
     ↓
npm install package
     ↓
node_modules
     ↓
Use package in my code
```

And when I share my project:

```text
GitHub
  │
  ├── package.json
  ├── package-lock.json
  ├── app.js
  │
  └── ❌ node_modules
```

Someone can clone it and simply run:

```bash
npm install
```

to get the required packages.

The main idea I want to remember is:

> **npm manages the packages my Node.js project depends on, while `package.json` describes the project and its dependencies.**
