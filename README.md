# Locations In Your Pocket

[![Build Status](https://travis-ci.com/LarsBergqvist/loc-poc.svg?branch=master)](https://travis-ci.com/LarsBergqvist/loc-poc)

A programming exercise on how to create a geolocation application with Angular, .NET Core and Google Maps

# Demo

https://larsbergqvist.github.io/loc-poc/  
(Only front-end application. Stores data in the browser's local storage)

![image](https://larsbergqvist.files.wordpress.com/2020/02/locpoc_main.png)

# Blog post with walkthrough of the project

https://thingsmatic.com/2020/01/26/geolocation-with-angular-and-net-core-part-1/

# The Angular client

```
cd loc-poc/clients/loc-poc-angular
yarn install
yarn startSSL
```

There is an app-config.json file that can be used for configuring if and how to connect to the server backend. There are also settings for using a Google Maps view. Note that you need your own Google Api key for the maps to work.

# The server backend

Use Visual Studio 2019 (Windows) or Visual Studio 2019 for macOS. Open loc-loc/server/LocPoc.sln. Set the LocPo.Api project as startup project.
