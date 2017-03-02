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
* Uses [@Squarespace/toolbelt](https://www.npmjs.com/package/@squarespace/toolbelt) for easy setup, build, server, and deploy tasks.
* Custom modular JavaScript app. Mostly [ES6 spec](http://caniuse.com/#search=es6), transpiled with [Babel](https://github.com/babel/babel) and bundled with [Webpack](https://github.com/webpack/webpack) using the [Babel Loader](https://github.com/babel/babel-loader).
* Linted with [ESlint](https://github.com/eslint/eslint).
* Modular CSS with LESS and Autoprefixing (last 2 versions of all browsers).
* Special Critical/Above-The-Fold Stylesheet that is injected into the <head> of the site's template.



## Working on this Project:

### Access Privileges

In order to work on this project you'll need access to all of these web services:

* **Top-level Code Repository** - Bitbucket
    * [AUTHOR_NAME's Bitbucket team](https://bitbucket.org/TEAM_SLUG/PROJECT_TITLE).
* **Production Website (PROJECT_URL)** - Squarespace
    * You need Administrator Permissions for  [https://PROJECT_URL.squarespace.com](https://PROJECT_URL.squarespace.com)
* **Development Website (PROJECT_URL-staging)** - Squarespace
    * You need Administrator Permissions for  [https://PROJECT_URL-staging.squarespace.com](https://PROJECT_URL-staging.squarespace.com)


### Points of Contact:

* **AUTHOR_NAME**
    * Lead Developer
    * Email: [name@domain.com](mailto:name@domain.com)
    * Bitbucket: [bitbucket.org/BITBUCKET_USERNAME](https://bitbucket.org/BITBUCKET_USERNAME/)

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

All project dependencies should now be installed in the `node_modules` folder. A postinstall script will automatically build the template and place it in the `build` folder. This folder is ignored by git and should not be tracked. It's simply a place to temporarily store a development/production ready template for use with the Squarespace Server or for deployment to a Development/Production Squarespace Website.



### Local Development

Squarespace is a software as a service platform so local development is limited. Test your updates locally using the [Squarespace Server](https://www.npmjs.com/package/@squarespace/server). The Squarespace Server allows you to authenticate with, and cache, a Squarespace website so you can work locally.

The node server has a configuration option to specify a Squarespace website to cache content from. This project has pre-configured scripts that connect to the Production website at `https://PROJECT_URL.squarespace.com` and the Development website at `https://PROJECT_URL-staging.squarespace.com`. The Squarespace Server authenticates to Squarespace using your Squarespace account. If you have **Administrator** access to both Production & Development websites, it should work fine. The Squarespace Server allows you to test design and development updates locally while using a copy of the website content.

Install the Squarespace Server globally.

```
npm i -g @squarespace/server
```

Once installed, you can run the server with:

```
npm server
```

This starts a Squarespace Server using template files from the **Development** website.

Once you've authenticated your connection to Squarespace with your username and password, you'll be able to view your cached website served by the Squarespace Server at: `localhost:9000`.

Furthermore, you can test your template changes using content from your **Production** site by running:

```
npm run server:prod
```


### Workflow

This project relies on NPM scripts to build/compile everything. The main "watch" task looks for changes in your template files located in the project root, then assembles them in the `build` folder.  This task will watch for changes in your LESS and JavaScript files and automatically re-compiles them to the appropriated folders located in the `build` folder. A Browsersync server is also fired up to proxy everything from `localhost:9000`(the port that the Squarespace Server is serving files to) to `localhost:3000`. Any time template files are changed in the root folder, the `build` template is updated and Browsersync is reloaded. To start up the watch task that compiles styles/scripts and starts the Squarespace and Browsersync servers, use:

```
npm run watch
```


### Development/Staging

We have one repo (remote) where we push the template code base to. When doing development, you should be working locally on a branch of **Origin**.

When updates are ready for live testing, run `npm run deploy` to build the **Development** template. This will push your updates live to `https://PROJECT_URL-staging.squarespace.com`.



### Production

After updates have been live tested on the development website, we can get our work into production by running `npm run deploy:prod` to push our changes to the live production website located at `https://PROJECT_URL.squarespace.com`.


##Build Tasks
These are the main NPM scripts you'll use to build/compile/watch files in this project.

-


`npm start`
> The following tasks are executed in parallel:
>
> * Assembles template files from root to `build`.
>
> * Starts Squarespace Server, using content from `https://PROJECT_URL-staging.squarespace.com` and serves files from `/build`.
>
> * Also runs a Browsersync server in a parallel shell that proxys the Squarespace Server.
>
> * Watches template files in `/scripts`, `/styles/`, `/assets/`, `/bocks/`, `/collections/`, and `./`.
>
> * When LESS and Javascript file changes are detected, the main files are compiled into `/build/scripts/` or `/build/styles/`, and browserync is reloaded.
>
> * When template file changes are detected, the template is rebuilt into `build`, and browserync is reloaded.

-

`npm run server:live`
> Starts the Squarespace Server, using content from `https://PROJECT_URL.squarespace.com` and serves files from `/build`.

-

`npm run build`
> The build task that compiles development code to the `/build` folder.
>
> ** _Does not remove source maps from js files_.

-

`npm run build:prod`
> The main build task that compiles production ready code to the `/build` folder.
>
> ** _Removes source maps from js files_.

-

`npm run lint:js`
> Lints js files located in `/scripts/` using Eslint.

-

`npm run deploy`
> Deploys production ready code to a Development/Staging website.

-

`npm run deploy:prod`
> Deploys finalized production ready code to a Production website.

-

Refer to this project's `package.json` file to see what other npm scripts power these main build tasks.
