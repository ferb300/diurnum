
# Diurnum
[![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org) [![Docker](https://badgen.net/badge/icon/docker?icon=docker&label)](https://https://docker.com/) [![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html) [![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/ferb300/diurnum) [![Awesome Badges](https://img.shields.io/badge/badges-awesome-green.svg)](https://github.com/ferb300/diurnum)

A package of webservices intended to organize content for graduation papers. It contains:
- a Nextcloud Instance for collborative work
- a web app for submitting quotes and characteristics

## Setup
1. Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
2. Clone the repo
3. Change the default branding/localization to one that fits your own by editing the files in `src/views`
4. Add your own class and people data in `src/data` according to the example files
5. Rename `.env.example`  to `.env` and enter your values with the exception of `CHAR_FOLDER`, `NEXTCLOUD_BOT_USERNAME` and `NEXTCLOUD_BOT_PASSWORD`
6. Run `docker compose build && docker compose up -d`
7. Setup a reverse proxy like [nginx](https://www.nginx.com/)
	- It should map the endpoints of both of the docker containers to different base paths or subdomains
	- It should serve assets (favicon, shortcut image, background image) under `/img/`
8. Access your Nextcloud instance via the browser and configure everything.
9. Add a second user to your Nextcloud instance for the app container to use
10. Run `docker compose down` 
11. Add the new nextcloud credentials to the `.env` file
12. Enter the domain the Nextcloud instance is accessible under and its container name to the `Trusted Domains` property in the `config.php` file in the Nextcloud volume
13. Run `docker compose build && docker compose up -d`

## Code Generation
To generate codes for the characteristics upload system, use [Diurnum-codegen](https://github.com/ferb300/diurnum-codegen)

## License
This software is published under the [General Public License V3](https://www.gnu.org/licenses/gpl-3.0.en.html)

