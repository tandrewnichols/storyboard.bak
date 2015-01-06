[![Build Status](https://travis-ci.org/tandrewnichols/grunt-neo4j.png)](https://travis-ci.org/tandrewnichols/grunt-neo4j) [![downloads](http://img.shields.io/npm/dm/grunt-neo4j.svg)](https://npmjs.org/package/grunt-neo4j) [![npm](http://img.shields.io/npm/v/grunt-neo4j.svg)](https://npmjs.org/package/grunt-neo4j) [![Code Climate](https://codeclimate.com/github/tandrewnichols/grunt-neo4j/badges/gpa.svg)](https://codeclimate.com/github/tandrewnichols/grunt-neo4j) [![Test Coverage](https://codeclimate.com/github/tandrewnichols/grunt-neo4j/badges/coverage.svg)](https://codeclimate.com/github/tandrewnichols/grunt-neo4j) [![dependencies](https://david-dm.org/tandrewnichols/grunt-neo4j.png)](https://david-dm.org/tandrewnichols/grunt-neo4j)

[![NPM info](https://nodei.co/npm/grunt-neo4j.png?downloads=true)](https://nodei.co/npm/grunt-neo4j.png?downloads=true)

# grunt-neo4j

A simple API for managing the neo4j CLI via grunt

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```bash
npm install grunt-neo4j --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with:

```javascript
grunt.loadNpmTasks('grunt-neo4j');
```

Alternatively, install and use [task-master](https://github.com/tandrewnichols/task-master), and it will handle this for you.

## The "neo4j" task

This task is a simple wrapper around the neo4j command line interface, allowing you to start, stop, restart, etc. a neo4j instance as part of a build process. I wrote this because I would occasionally start my node server and forget to start up the neo4j server, and I'd get really unhelpful error messages like "Error: ECONNREFUSED" with no useful stack trace or anything. So I wanted a grunt task that would just start my neo4j server prior to starting my node server. Surprisingly, such a task did not exist yet. And fortunately for me, I previously wrote [simple-cli](https://github.com/tandrewnichols/simple-cli) specifically to make wrapping CLI tools simpler.

### Overview

The `neo4j` task is a multiTask, where the target is the neo4j command to run. You can configure as many commands as are useful to you either in your `grunt.initConfig` call or, as mentioned above, by using [task-master](https://github.com/tandrewnichols/task-master). I strongly recommend using task-master. It provides a nice separation of concerns with grunt configuration. The worst thing abour grunt is the long, messy Gruntfile configuration.

Here is a sample configuration for this task:

```javascript
grunt.initConfig({
  neo4j: {
    start: {},
    stop: {},
    restart: {},
    status: {}
  }
});
```

You can supply options and do a lot of other cool things because of [simple-cli](https://github.com/tandrewnichols/simple-cli), but you probably won't need them for neo4j, since you typically run commands without any flags or arguments.
