# Intelligent Eats

Are you tired of staring into your fridge, wondering what to cook for dinner? Do you find yourself stuck in a culinary rut, repeating the same meals week after week? Well, worry no more! Introducing Intelligent-Eats, the revolutionary AI-generated meal service designed for you.

Whether you're craving comfort food classics, exotic international flavors, or healthy, plant-based options, our AI algorithm has you covered.

### Usage

TODO but something like this

sign in

add ingredients to pantry

add disliked ingredients etc

pick from generation options

it generates a meal

favourite meals and checkout meal history to revisit old meals

## Running the project

### Prerequisites

Get Node.js installed on your machine. You can download and install it from [here](https://nodejs.org/en/download/current)

This project requires Node.js 20.12.2 or higher

### Running the Frontend

0. Set up the `.env` file in the root directory. See `.env.local.example` for an example

1. Navigate inside the frontend folder:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Then either run it in development mode:

   ```bash
   npm run dev
   ```

   Or in production mode:

   ```bash
   npm run build
   ```

   ```bash
   npm run start
   ```

   This will start the frontend server at http://localhost:3000

### Running the Backend

0. Set up the `.env` file in the root directory. See `.env.example` for an example

1. Navigate inside the backend folder:

   ```bash
   cd backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

   This will start the backend server at http://localhost:3000

## Testing

### Testing the Backend

The backend can be tested by first cd to backend folder and then

```bash
npm run test
```

### Testing the Frontend

#### Jest

The backend logic is tests with jest

```bash
npm run test
```

#### PLaywright

To test with playwright follow the following instructions
These test some common user flows

```bash
npm run build
npx playwright install
npx playwright test
```

## Pages

TODO

## Tech Stack

NodeJS + Express for backend
Jest for testing
Deployed using google app engine

NextJS for frontend
Jest + Playwright for testing
Deployed using vercel

### API usage

Uses Open AI API for meal generation and recipe generation

Uses Segmind API for meal Image generation

### Database

Using [monogoDB](https://www.mongodb.com/)

User Dao and schemas for database can be found within the data folder in backend src

## Project Structure

### Frontend

Our frontend repository structure is as follows:

```
public/
   images/: Image resources
src/
   __test__: Contains JUnit tests for our utility files
   app/: Directory containing page routes, using the routing system in NextJS
   lib/: Contains everything that doesn't fit into the above, typically utility files
```

### Backend

Our backend repository structure is as follows:

```
src/
   auth: Firebase config files
   data: Database schema and user dao
   openAi: openai meal generation helper functions
   routes: api routes
      api:
         generation: generation related
         users: user related
   segmind: segmind image helper functions
```

## Miscellaneous

Check out the figma design file [here](https://www.figma.com/file/sqO8dyu3wTHNfGy3RJjkcR/750-wireframe?type=design&node-id=2%3A2&mode=design&t=eZQL2zIErd7BnnJH-1)

Check out our project management tooling [here](https://trello.com/invite/750team1/ATTIe553059ddbcf84a85e1f14055027679b9EE006EB)

## Deployment

Check out a live deployment here:
https://project-group-teal-turtles.vercel.app/

## License

This project is licensed under the MIT License.

Contributors:

- Nathan Bell
- Troy Murdoch
- Dan Chae
- Jeremy Ting
- Jason Xavier

TEAM TEAL TURTLES
![](./group-image/Teal%20Turtles.webp)
