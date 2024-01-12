# Project Title

## Description

Account/Ledger Apis

### Configure Environment Variables
Set up your `database parameters` according to your local database credentials. These files should contain the necessary configuration for your project.

```plaintext
# Example
type: 'postgres', // replace with your database type
host: 'localhost', // replace with your database host
port: 5432,
username: 'postgres', // replace with your database user
password: 'root', // replace with your database password
database: 'test', // replace with your database name
```

## Installation

To set up the project environment, run the following commands in the root directory of the project:

```
npm install
```

This will install all the necessary dependencies defined in your `package.json` file.

## Compilation

To compile the TypeScript files to JavaScript, run:

```
npx tsc
```

This command will compile the `.ts` files in your project to `.js` files according to the settings in your `tsconfig.json`.

## Running the Application

To start the server, run:

```
nodemon --exec ts-node ./server.ts
```

## Testing

To run the test suite, use:

```
npm test
```

This command will execute all tests written with Jest.
