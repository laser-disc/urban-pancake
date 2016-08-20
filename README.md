# Hunger Stop

[Hunger Stop](https://hungerstop.herokuapp.com) locates and maps the closest food trucks to you for a quick and easy way to find a convenient lunch in San Francisco.

## About the App

Maybe you're hungry and looking for something new. Use Hunger Stop to find the most exciting food trucks in your area.

Or are you craving your favorite food truck but it won't be back to your office until next week? Hunger Stop will find that missing munchery and tell you where it is today.

Are you bad at sports? Hunger Stop can't help with that, but it *can* help you find a local lunch anywhere in San Francisco.

## User Interaction

Hunger Stop trawls the web for Twitter and Yelp info on food trucks in San Francisco and stores them in a database. When someone visits the site, Hunger Stop displays nearby food trucks and food truck events so they can make an easy yet informed decision about where to eat lunch. Users can also add a truck to the database using the handy Add A Truck form.

## How It Works

Hunger Stop periodically queries Twitter and Yelp for information on the trucks in its Mongo database. Any updated information is saved to the database and current locations are refreshed. Information is presented to the client as a Google Map and a searchable list of trucks. Clicking on a truck displays additional information about the truck, including website, phone number, Yelp reviews, and more. As users discover new food trucks, they can add them using the Add a Truck form. Trucks added here are validated and processed through a geocoder to find precise locations based on the addresses provided by users, then saved to the database.

## Installation

For the latest stable release, clone the master branch.
 * The app is available at https://hungerstop.herokuapp.com
 * To run locally, add env/config.js with your API keys to the root directory.
 * To deploy your own copy, add your API keys to your host environment.
 * See below for more on API keys.

## Contributing

1. Fork the repo
1. Cut a feature branch from dev
1. When you've finished with your fix or feature, run npm test to make sure your changes didn't break anything and your code meets the style guidelines.
1. Submit a pull request to dev. Include a description of your changes.
1. Once the pull request has been reviewed, it will be merged by a member of the team.

## The Urban Pancake Team

* **George Weiler**: King of Git
* **Bonnie Torre**: Elite Codeslinger
* **Matt Long**: Algorithm Wrangler
* **Reed Cureton**: Hackmaster Extraordinaire
* **Blake Contreras**: Professor of Devology
