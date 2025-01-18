import express from 'express';
import bodyParser from 'body-parser';
// ... other imports ...

const app = express();

// Increase payload size limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// ... rest of your app configuration ... 