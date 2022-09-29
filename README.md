# Tickets Web

## Introduction
This is the code used to build the demo website of 'Tickets-web'. Technologies used are MongoDB, Express, React and Node. The website is based on an idea allows users to purchase and resell their unwanted tickets (movie, play, party night, concert, etc).

## Core features include:
* A homepage listing all selling tickets, supports debounce searching by name of listed ticket
* CRUD of tickets, supports the submission of tickets in PDF, supports ticket location auto-complete
* A user profile page displaying tickets the user is selling and bought
* Comprehensive tickets detail page including live map ticket location, payment functionality, countdown timer, social media sharing options.
 
## Some implementation details: 
* user authentication using JWT
* database clearing of expired tickets
* location autocomplete, geocoding and live map display from Google Maps API
* payment functionality provided by Stripe API
* Bootstrap styling and custom CSS to fit all screen sizes.

The server app is then deployed to Heroku and the frontend app is deployed to Netlify. 

Demo site: https://tickets-web-v1.netlify.app

Explore demo site with email "james.ong2012@gmail.com" and password “James123456”.