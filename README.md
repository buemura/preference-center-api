# Preference Center API

## Table of contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Project setup](#project-setup)

## Overview

The Preference Center API enables users to manage their notification preferences across various communication channels and maintains a complete history of all consent changes for auditing purposes.

## Technologies

- NestJS
- TypeScript
- TypeORM
- PostgreSQL

## Project setup

1. Duplicate `.env.example` and rename it to `.env`.

```bash
cp .env.example .env
```

2. Start the local database using `docker` and `docker-compose`.

```bash
docker-compose up -d
```

3. Install app dependencies

```bash
npm ci
```

4. Start the API locally in dev mode

```bash
npm run start:dev
```
