Installation
To set up the project environment, run the following commands in the root directory of the project:

bash
Copy code
npm install
This will install all the necessary dependencies defined in your package.json file.

Compilation
To compile the TypeScript files to JavaScript, run:

bash
Copy code
npx tsc
This command will compile the .ts files in your project to .js files according to the settings in your tsconfig.json.

Running the Application
To start the server, run:

bash
Copy code
nodemon --exec ts-node ./server.ts

Testing
To run the test suite, use:

bash
Copy code
npm test
This command will execute all tests written with Jest.
