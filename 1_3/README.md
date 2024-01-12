
# Starting the Project

Follow these steps to get your project up and running:

### 1. Configure Environment Variables
Set up your `.env` and `.env.test` files according to your database credentials. These files should contain the necessary configuration for your project.

```plaintext
# Example .env file
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypass
DB_NAME=mydb
```

### 2. Install Dependencies
Run the following command to install all required dependencies:

```bash
npm install
```

This will install all the necessary Node.js packages as specified in your `package.json` file.

### 3. Start the Development Server
To start the local development server, execute:

```bash
npm run dev
```

This command will boot up your Node.js server, typically on `http://localhost:3000`.

### 4. Access the API Documentation
Once the server is running, you can access the Swagger API documentation by navigating to:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Here, you'll find detailed information about the API endpoints and you can also test the APIs directly from the Swagger interface.


### 5. Run Test Files
Execute the following command to run the test files located in the `tests` directory:

```bash
npm run test
