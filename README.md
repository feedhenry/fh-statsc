fh-statsc(1) -- The FeedHenry Stats Client
====================================================

[![npm package](https://nodei.co/npm/fh-statsc.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/fh-statsc/)

[![Build status](https://img.shields.io/travis/feedhenry/fh-statsc/master.svg?style=flat-square)](https://travis-ci.org/feedhenry/fh-statsc)
[![Dependency Status](https://img.shields.io/david/feedhenry/fh-statsc.svg?style=flat-square)](https://david-dm.org/feedhenry/fh-statsc)
[![Known Vulnerabilities](https://snyk.io/test/npm/fh-statsc/badge.svg?style=flat-square)](https://snyk.io/test/npm/fh-statsc)

## DESCRIPTION

The Stats Client allows applications to send stats to the stats server

## Dependencies

* node.js

* npm (the Node Package Manager)

## Installation

fh-statsc is deployed using npm. The statsc package (fh-statsc-<version>.tar.gz) can be installed via npm, either by copying the package to the local host or installing over http.

To install (on ubuntu):

sudo npm install fh-statsc-<version>.tar.gz

The necessary node dependency modules are also installed automatically.

You can upgrade an existing intallation with the same command.    

## Running and Configuration  

To run the Statsc Client you must pass a config file on the command line. For a sample configuration file, see 'dev.json' in the config directory.

E.g:
fh-statsc /etc/feedhenry/fh-statsc/conf.json

## Upstart
It is not intended that the stats client be run as a server.  It is a library that can be called from withing applications, and a commandline tool that can send stats to the stats server
