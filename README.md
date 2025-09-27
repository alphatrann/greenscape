# Greenscape

## Table of Content 📑

- [Overview](#overview)
  - [About the project](#about-the-project)
  - [Project Structure](#project-structure)
  - [Tech stack](#tech-stack)
  - [Deployment](#deployment)
  - [Challenges](#challenges)
  - [Features to be added](#features-to-be-added)
- [Getting started](#getting-started)
  - [Setup the server](#setup-the-server)
  - [Setup the admin](#setup-the-admin)
  - [Setup the store](#setup-the-store)
- [Screenshot](#screenshots)
  - [Store](#store)
  - [Admin](#admin)
- [Approaches](#approaches)
- [License](#license)

## Overview

### About
![Greenscape Logo](./assets/mobile-logo.svg)

Greenscape is an e-commerce application that is built to sell plants.

#### Demo Links
- [Store](https://www.greeenscape.store)
- [Admin](https://admin.greeenscape.store)
- [API](https://api.greeenscape.store)

### Project Structure

The application consists of three main components:

- [`/admin`](https://github.com/alphazero-wd/greenify/tree/master/admin): the admin is built to manage products, inventory, and customers' orders, as well as summarizing some stats such as revenues, sales, etc.
- [`/store`](https://github.com/alphazero-wd/greenify/tree/master/store): the store is built to display products to customers for them to buy
- [`/server`](https://github.com/alphazero-wd/greenify/tree/master/server): the backend API

### Tech stack

#### Frontend

- Next.js: React-based but with SSR, which leads to better SEO
- TailwindCSS: takes the utility-first approach for better adjustability according to the design, used with `shadcn/ui` which provides some pre-built UI components

#### Backend

- NestJS: ExpressJS-based framework, but provides the project with a better architecture, which helps the project scale later
- Prisma: makes working with the database a lot easier, especially when managing migrations

#### Databases

- PostgreSQL: there are plenty of relationships between entities, so a relational database fits the project well
- Redis: storing users' session data
- Elasticsearch (in the future): handling products' search

### Deployment
The project was deployed on AWS. AWS Amplify was used to quickly launch the frontend to production environment, the backend was containerized and runs in an ECS cluster, and has a load balancer in front to distribute traffic across the EC2 instances.

Here are two versions of the architecture (with the first one being a cheaper solution, while the second one is more secure):

#### Version 1
![Version 1](./assets/design-1.jpg)

#### Version 2
![Version 2](./assets/design-2.jpg)

### Challenges

- First time handling Stripe payments is rather tough because the documentation does not specify exactly how to integrate Stripe with Next.js and NestJS.
- Having to resolve conflicts between pagination, filtering and sorting when working with URL query manipulation.
- Forgetting to add role-based guards to some restricted endpoints resulting in security leaks.
- Inconsistencies between development and production environment when deploying to AWS.

### Features to be added

- Authentication on the store so that the customers' data will be synchronized across devices.
- Product variants so that the customers can choose which variant matches their preferences.
- PayPal will be added as an alternative payment method to cards.

## Getting started

You need to have these tools installed on your machine:

- [Node.js](https://nodejs.org)
- [Stripe CLI](https://stripe.com/docs/stripe-cli#install)
- [Docker](https://www.docker.com/products/docker-desktop)

To get started, clone the project from GitHub

```
git clone https://github.com/alphazero-wd/greenscape.git
```

### Setup the server

Install all dependencies

```bash
cd server/
yarn
```

Set up Stripe Webhook with the following commands

```bash
stripe login
stripe listen --forward-to http://localhost:5000/webhook
```

In the `server/` directory, create a `docker.env` file at the root and add the following:

```bash
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres # set to anything you like
POSTGRES_DB=greenify # set to anything to you like
```

Similarly, create a `.env` at the root of the `server/` directory and add the following variables:

```bash
DATABASE_URL=postgres://postgres:postgres@localhost:5432/greenscape?schema=public
SESSION_SECRET=s3cr3t # set to anything you like
CORS_ORIGIN_ADMIN=http://localhost:3000
CORS_ORIGIN_STORE=http://localhost:3001
REDIS_URL=redis://localhost:6379
STRIPE_SECRET_KEY=sk_test_... # from the Stripe dashboard
STRIPE_WEBHOOK_SECRET=whsec_... # from the Stripe CLI
```

Run PostgreSQL and Redis databases stipulated in the `docker.compose.yml` file

```bash
docker-compose up -d
```

Apply migrations to the database

```bash
yarn migrate
```

Finally, start the server:

```bash
yarn start:dev
```

### Setup the admin

Install all dependencies

```bash
cd admin/
yarn
```

Create a `.env.local` file at the root of the `admin/` directory and add the following variable:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000 # server URL
```

Simply start the development server on http://localhost:3000

```
yarn dev
```

### Setup the store

Install all dependencies

```bash
cd store/
yarn
```

Create a `.env.local` file at the root of the `store/` directory and add the following variable:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000 # server URL
```

Simply start the development server on http://localhost:3001

```
yarn dev
```

## Screenshots

### Store

![Store](./assets/store-demo.jpg)

### Admin

![Admin](./assets/admin-demo.jpg)

## Approaches

- For the backend, NestJS already adopts Dependency Injection out of the box, which loosens the dependence between different parts of the codebase.
- For the frontend, I adopts [Facade Design Pattern](https://wanago.io/2019/12/09/javascript-design-patterns-facade-react-hooks/) by extracting hooks into dedicated files to separate the logic from the UI.

## License

MIT license [@alphazero-wd](https://github.com/alphazero-wd)
