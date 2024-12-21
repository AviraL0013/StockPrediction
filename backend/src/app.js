import express from 'express';
import bodyParser from 'body-parser';
import UserRegistrationRoutes from './routes/UserRegistrationRoutes.js';
import UserLoginRoutes from './routes/UserLoginRoutes.js';
import cors from 'cors';




const app = express();
app.use(cors({ origin: 'http://localhost:3000' })); // Adjust the origin to your frontend's URL

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Register API routes
app.use('/api', UserRegistrationRoutes); // User registration routes
app.use('/api', UserLoginRoutes);        // User login routes

// Health check route (optional, for testing server)
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Export the app instance
export { app };
