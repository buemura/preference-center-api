# Preference Center API

# Table of contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Database Schema Documentation](#database-schema-documentation)
  - [User Table](#user-table)
  - [Consent Table](#consent-table)
  - [ConsentEvent Table](#consentevent-table)
  - [Relationships Overview](#relationships-overview)
- [Project setup](#project-setup)

# Overview

The Preference Center API enables users to manage their notification preferences across various communication channels and maintains a complete history of all consent changes for auditing purposes.

# Technologies

- NestJS
- TypeScript
- TypeORM
- PostgreSQL

# Database Schema Documentation

## User Table

| Column | Type   | Description                                             |
| ------ | ------ | ------------------------------------------------------- |
| id     | uuid   | Primary key, unique identifier for each user.           |
| email  | string | Email address of the user, must be unique and not null. |

## Consent Table

| Column    | Type    | Description                                                 |
| --------- | ------- | ----------------------------------------------------------- |
| consentId | string  | Primary key, unique identifier for each consent.            |
| userId    | string  | Foreign key to the `User` table, part of the composite key. |
| enabled   | boolean | Indicates whether the consent is enabled, nullable.         |

### Indices:

- **IDX_CONSENT_COMPOSITE_KEY**: Composite index on `consentId` and `userId`.

### Uniques:

- **UNQ_CONSENT_COMPOSITE_KEY**: Ensures unique composite key for `consentId` and `userId`.

## ConsentEvent Table

| Column    | Type      | Description                                                   |
| --------- | --------- | ------------------------------------------------------------- |
| id        | uuid      | Primary key, unique identifier for each consent event.        |
| userId    | string    | Foreign key to the `User` table.                              |
| consentId | string    | Foreign key to the `Consent` table.                           |
| enabled   | boolean   | Indicates whether the consent event is enabled, nullable.     |
| createdAt | timestamp | Timestamp when the consent event was created, auto-generated. |

## Relationships Overview

- **User ↔ Consent**: A user can have multiple consents (one-to-many).
- **User ↔ ConsentEvent**: A user can have multiple consent events (one-to-many).
- **Consent ↔ ConsentEvent**: A consent can have multiple events associated with it (one-to-many).

# Project setup

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

5. Access swagger documentation at

```bash
http://localhost:8080/docs
```

# Improvements

- Better document the API
- Improve consent format on getUser response.
- Github Actions to run tests and build application
