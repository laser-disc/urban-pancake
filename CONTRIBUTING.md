# Contributing

## General Workflow

1. Fork the repo
1. Cut a feature branch from dev
1. Make commits to your feature branch. Format each commit like so:
  - feat[client] Add a new feature to truck view
  - fix[test] Fix inconsistent tests (Fixes #0)
  - refactor[server] ...
  - style[client] ...
  - test[db] ...
1. When you've finished with your fix or feature, run **npm test** to make sure your changes didn't break anything and your code meets the style guidelines.
1. Rebase from dev and fix any merge conflicts, then run **npm test** again if there were any upstream changes.
1. Submit a pull request to dev. Include a description of your changes.
1. Your pull request will be reviewed by another maintainer.
1. Fix any issues raised by your code reviewer, and push your fixes as a single new commit.
1. Once the pull request has been reviewed, it will be merged by another member of the team. Do not merge your own commits.


### Guidelines

1. Uphold the current code standard:
    - Keep your code **DRY**.
    - Follow [the Style Guide](STYLE-GUIDE.md)
1. Run **npm test** before submitting a pull request.
1. Tests are very, very important. Submit tests if your pull request contains
   new, testable behavior.


#### Commit Message Guidelines

- Commit messages should be written in the present tense with task and scope prefixed; e.g. "chore[deployment] Fix continuous deployment script".
- The first line of your commit message should be a brief summary of what the commit changes. Aim for about 70 characters max.
- If you want to explain the commit in more depth, following the first line should
 be a blank line and then a more detailed description of the commit. This can be
 as detailed as you want, so dig into details here and keep the first line short.
- If in doubt, refer to the [Karma Commit Msg Style Guide](http://karma-runner.github.io/1.0/dev/git-commit-msg.html)


### Adding API Keys

- For local development:
  - Get your own API keys from Twitter, Google Maps, and Yelp
  - Sign up with mLab and get a Mongoose URI
  - Create a file in the root directory named `env\config.js`
  - Export an object with the following properties:


    const secretKeys = {
      twitterInfo: {
        consumer_key: String,
        consumer_secret: String,
        bearer_token: String,
      },
      MONGOOSE_URI: uri,
      GMAP_API_KEY: String,
      yelpInfo: {
        consumer_key:  String,
        consumer_secret: String,
        token: String,
        token_secret:  String,
      }
    };

    module.exports = secretKeys;


- For deployment:
  - Add the above API keys as environment variables with similar names.

#### Thanks for contributing!
