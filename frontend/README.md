# Frontend of Save4Me

Frontend of Save4Me extensions with all codes and styles

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Google_Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)

<p align="center">
 <a href="#project-status">Project status</a> •
 <a href="#features">Features</a> •
 <a href="#technologies">Technologies</a>
</p>

## Project status

🚧 **In test** 🚧

## Features

- [x] Link listing
- [x] Link creating
- [x] Link updating
- [x] Link search
- [ ] Title preview
- [ ] Folders
- [ ] Drag and drop
- [ ] Commands
- [ ] Firefox

## Pré-requisitos e como rodar a aplicação/testes

You need [NVM](https://github.com/nvm-sh/nvm) installed

Run before:

```bash
git clone git@github.com:rafaelandrade/save4me.git
yarn
```

### Run in chrome extension local

```bash
yarn workspace frontend build:envs
yarn workspace frontend dev
```

Check if created `/out` file and open [chrome://extensions/](chrome://extensions/)

Turn on the developer mode in right top and click in `load uncompressed`, and select the out file.

### Zip extension

```bash
yarn workspace frontend zip
```

### Run tests

```bash
yarn workspace frontend test
```

### Run in browser

```bash
yarn workspace frontend build:envs
yarn workspace frontend dev:next
```

And open [http://localhost:3000](http://localhost:3000)

## Technologies

- [NextJs](https://nextjs.org/)
- [Sentry](https://sentry.io/)
- [Cypress](https://www.cypress.io/)
- [Jest](https://jestjs.io/)
- [Styled Componentes](https://styled-components.com/)