// App Init
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const app = express();

// Express App Config
app.use(bodyParser.json());
app.use(
  session({
    secret: 'NJkprH78I0',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
    origin: [
      'http://127.0.0.1:8080',
      'http://localhost:8080',
      'http://127.0.0.1:3000',
      'http://localhost:3000',
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

// Routes
const courseRoutes = require('./api/course/course.routes');
app.use('/api/course', courseRoutes);

// Define Port
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
