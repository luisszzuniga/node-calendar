const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

require('dotenv').config()

// MONGOOSE
const db = require('./db/db.js');
db.mongoose.connect('mongodb://127.0.0.1:27017/planificator');

// BODYPARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONNECTING ROUTERS
const authRouter = require('./routes/auth.routes.js');
const usersRouter = require('./routes/users.routes.js');
const teamsRouter = require('./routes/teams.routes.js');
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);

// SWAGGER
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mon API",
      version: "1.0.0",
      description: "Ma description"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// START APP
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// FIREBASE pour des serverless app

// Planificator:
// petit calendrier jour par jour
// Les familles (ou autre) peuvent créer des Teams
// On peut ajouter des activitées planifiées avec un ou des membres de notre team
// L'activité sera visible sur les plannings de tout le monde

// DB : MongoDB Compass