// App Init
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

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
  app.use(express.static('public'));
  // app.use(express.static(path.resolve(__dirname, '../frontend/src')));
} else {
  const corsOptions = {
    origin: [
      'http://127.0.0.1:3030',
      'http://localhost:3030',
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

const userRoutes = require('./api/user/user.routes');
app.use('/api/user', userRoutes);

const authRoutes = require('./api/auth/auth.routes');
app.use('/api/auth', authRoutes);

const enrollRoutes = require('./api/enroll/enroll.routes');
app.use('/api/enroll', enrollRoutes);

const connectSockets = require('./api/socket/socket.routes');
connectSockets(io);

// Define Port
const PORT = process.env.PORT || 3030;
http.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
