PROJECT_TITLE SS7
=======
> PROJECT_TITLE SS7 top-level Squarespace development code.



## Project Overview
The PROJECT_TITLE project is a complex web-app built on the Squarespace developer platform introduced for Squarespace 7. This repo is used to build custom scripts, styles, layouts, and more for developer-mode-enabled Squarespace site.

Squarespace websites, by default, come with Git installed. Each Squarespace website is essentially running live on its own master branch and we cannot change that. Use this project to manage the source files that will ultimately be bundled into a template folder to be pushed to either a Staging or Live Squarespace site.


## Project Details

### Current Top-level Development Overview

Here's a little bit about the technology used in this project.

* Uses [npm scripts](https://docs.npmjs.com/misc/scripts) for the bulk of all task management instead of Grunt/Gulp.
* Custom modular JavaScript app. Mostly [ES6 spec](http://caniuse.com/#search=es6), transpiled with [Babel](https://github.com/babel/babel) and bundled with [Webpack](https://github.com/webpack/webpack) using the [Babel Loader](https://github.com/babel/babel-loader).
* Linted with [ESlint](https://github.com/eslint/eslint). Documented with [JSDoc](https://github.com/jsdoc3/jsdoc) syntax.
* Modular CSS with LESS and Autoprefixing (last 2 versions of all browsers).



## Working on this Project:

### Access Privileges

In order to work on this project you'll need access to some (or all) of these web services:

* **Top-level Code Repository** - Bitbucket
    * [AUTHOR_NAME's Github organization](https://bitbucket.org/lowrycreative/PROJECT_TITLE_SLUG).
* **Main Website (PROJECT_URL)** - Squarespace
    * You need Administrator Permissions for  [https://PROJECT_URL.squarespace.com](https://PROJECT_URL.squarespace.com)
* **Staging Website (staging.PROJECT_URL)** - Squarespace
    * You need Administrator Permissions for  [https://PROJECT_URL-staging.squarespace.com](https://PROJECT_URL-staging.squarespace.com)


### Points of Contact:

* **AUTHOR_NAME**
    * Lead Developer
    * Email: [name@domain.com](mailto:name@domain.com)
    * Github: [github.com/GITHUB_USERNAME](https://github.com/GITHUB_USERNAME)

* **Squarespace Support**
    * Platform Support
    * Email: [customercare@squarespace.com](mailto:customercare@squarespace.com)
    * Official Documentation: [https://developers.squarespace.com](https://developers.squarespace.com)
    * Official Help Site: [https://help.squarespace.com](https://help.squarespace.com)



## Getting Started

### Install

Install all project dependencies.

The only global dependencies required to work on this project are [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/), and the [Squarespace Server](https://www.npmjs.com/package/@squarespace/server) that enables local development of Squarespace websites.

All build and watch tasks are run via `npm` using local dev dependencies.


```shell
npm install
```

All project dependencies should now be installed in the `node_modules` folder. A postinstall script will automatically clone the [Live Squarespace Template repository](https://PROJECT_URL.squarespace.com) and [Staging Squarespace Template repository](https://PROJECT_URL-staging.squarespace.com) into `dist/live` & `dist/staging`.



### Local Development

Squarespace is a software as a service platform so local development is limited. When working locally, create a branch on the **Staging** remote and test your updates locally using the [Squarespace Server](https://www.npmjs.com/package/@squarespace/server). The Squarespace Server allows you to authenticate with, and cache, a Squarespace website so you can work locally.

The node server has a configuration option to specify a Squarespace website to cache content from. This project has pre-configured scripts that connect to Main website at `https://PROJECT_URL.squarespace.com` and the Staging website at `https://PROJECT_URL-staging.squarespace.com`. The Squarespace Server authenticates to Squarespace using your Squarespace account. If you have **Administrator** access to both Main & Staging websites, it should work fine. The Squarespace Server allows you to test design and development updates locally while using a copy of the website content.

Install the Squarespace Server globally.

```
npm i -g @squarespace/server
```

Once installed, run the server with:

```
npm server
```

This starts a Squarespace Server using template files from the **Staging** website located in `/dist/staging/template`.

Once you've authenticated your connection to Squarespace with your username and password, you'll be able to view your cached website served by the Squarespace Server at: `localhost:9000`.

Furthermore, you can test your template changes using content from your live site by running:

```
npm run server:live
```


### Workflow

This project relies on NPM scripts to build/compile everything. Right now there's a NPM task that watches your LESS and JavaScript files and automatically compiles them to folders located in `/src/template`. From there, another NPM task copies files in `/src/template` to `/dist/staging/template`. A Browsersync server is also fired up to proxy everything from `localhost:9000`(the port that the Squarespace Server is serving files to) to `localhost:3000`. Any time files are changed in the `/src/` folder, the **Staging** template is rebuilt and Browsersync is reloaded. To start up the watch task that compiles styles/scripts and starts a browsersync server, use:

```
npm run watch
```


### Staging

We have two repos (remotes) where we push the template code base to. When doing development, you should be working locally on a branch of the **Origin** of both **Main** and **Staging** repos, or just working locally on your machine.

When updates are ready for live testing, run `npm run build:dev` to build the **Staging** template, then `git merge` your local branch to the **Staging** master branch. After that, just `git push` to the Squarespace servers. This will put your updates live to `https://PROJECT_TITLE_SLUG-staging.squarespace.com`.



### Production

After updates have been live tested on Staging, we can work to get these into production by running `npm run build` to build your live template in `/dist/live/template`. Then merge your changes to the **Main** master branch, and push to the **Main** remote.

This process should be reworked to keep everything in sync with developers on the project. Currently we do not have a code review or pull request workflow, but it's probably recommended that we start.



##Build Tasks
These are the main NPM scripts you'll use to build/compile/watch files in this project.

-


`npm start`
> The following tasks are executed in parallel:
> 
> * Starts Squarespace Server, using content from `https://PROJECT_TITLE_SLUG-staging.squarespace.com` and serves files from `/dist/staging/template`.
> 
> * Watches files in `/src/scripts`, `/src/style/`, and `/src/template`.
> 
> * Also runs a Browsersync server in a parallel shell.
> 
> * When LESS and Javascript file changes are detected, the main files are compiled into `/src/template`.
> 
> * When changes are detected in `/src/template`, the **Staging** template is rebuilt, and browserync is reloaded.

-

`npm run server:live`
> Starts the Squarespace Server, using content from `https://PROJECT_TITLE_SLUG.squarespace.com` and serves files from `/dist/staging/template`.

-

`npm run build`
> The main build task that compiles production ready code to the `/dist/live/template` folder. 
> 
> ** _Removes source maps from js files_.

-

`npm run lint:js`
> Lints js files located in `/src/scripts/app` using Eslint.

-

Refer to this project's `package.json` file to see what npm scripts power these main build tasks.

