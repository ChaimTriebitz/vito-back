# Table of Contents Editor - Backend

This is the backend service for the Table of Contents Editor application. It is built with Node.js and Express and handles API requests for managing table data, including importing rows from Excel sheets. The backend is designed to work with the frontend hosted on Render.com.

## Features
- **REST API**: Provides endpoints to manage table content.
- **Excel Import**: Processes and inserts data from uploaded Excel sheets.
- **Database Support**: (Optional) Can be integrated with a database for persistent storage.

## Technologies Used
- **Node.js**: JavaScript runtime for backend development.
- **Express.js**: Web framework for handling API routes.
- **XLSX.js**: Library for parsing Excel files.
- **Cors**: Middleware for handling cross-origin requests.

## API Endpoints
- `POST /upload` - Uploads an Excel file and processes the data.
- `GET /data` - Retrieves the table data.
- `POST /data` - Adds a new row to the table.
- `PUT /data/:id` - Updates a specific row.
- `DELETE /data/:id` - Deletes a row.



