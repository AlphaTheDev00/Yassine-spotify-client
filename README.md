
# **Song App - React Music Player**

A simple music player app built with React and Node.js, featuring user authentication, song creation, and song display.

---

## **Features**

- **User Authentication**: Users can register and log in.
- **Upload Songs**: Authenticated users can upload songs with titles and cover images.
- **Display Songs**: View all available songs or filter songs by a specific user.
- **Music Player**: Play songs in a dedicated page with a media player.
- **Song Management**: Users can create, edit, and delete their songs.

---

## **Tech Stack**

- **Frontend**:
  - React
  - Axios
  - CSS Modules
- **Backend**:
  - Node.js
  - Express
  - MongoDB (Mongoose for ORM)
- **Authentication**:
  - JWT Authentication

---

## **Installation & Setup**

### **Step 1: Clone the repository**
First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/song-app.git
cd song-app
```

### **Step 2: Install dependencies**

Install the dependencies for both frontend and backend.

- **Frontend**: Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

- **Backend**: Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

### **Step 3: Configure environment variables**

In the backend directory, create a `.env` file to store sensitive information like your MongoDB URI and JWT secret.

Example `.env` file:

```
MONGO_URI=mongodb://localhost:27017/songapp
JWT_SECRET=your_secret_key
PORT=5000
```

### **Step 4: Run the app**

- **Backend**: Start the backend server:

```bash
cd backend
npm start
```

- **Frontend**: Start the React app:

```bash
cd frontend
npm start
```

Your app should now be running at [http://localhost:3000](http://localhost:3000).

---

## **Folder Structure**

### **Frontend**

```bash
frontend/
├── src/
│   ├── components/
│   │   ├── AllSongs.jsx       # Displays the list of all songs
│   │   ├── SingleSong.jsx     # Displays a single song with a media player
│   │   └── Auth.jsx           # Login and Register components
│   ├── App.js                 # Main component with routing
│   ├── index.js               # Entry point of the app
│   ├── utils/
│   │   └── api.js             # API request helper functions
│   └── styles/
│       └── AlbumGrid.module.css  # Styles for the song grid
```

### **Backend**

```bash
backend/
├── controllers/
│   ├── authController.js      # Handles user authentication
│   └── songController.js      # Handles song CRUD operations
├── models/
│   ├── User.js                # User model schema
│   └── Song.js                # Song model schema
├── routes/
│   ├── authRoutes.js          # Authentication routes
│   └── songRoutes.js          # Song CRUD routes
├── middleware/
│   └── validateToken.js       # Middleware to validate JWT token
├── utils/
│   └── token.js               # Utility to generate JWT token
├── .env                       # Environment variables (for sensitive info)
└── server.js                  # Backend server setup
```

---

## **API Endpoints**

### **1. User Authentication**

- **POST /api/auth/register**  
  Register a new user.  
  **Body**:
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
  **Response**:
  ```json
  {
    "message": "Registering user",
    "token": "JWT_TOKEN"
  }
  ```

- **POST /api/auth/login**  
  Log in a user.  
  **Body**:
  ```json
  {
    "identifier": "john_doe",  // username or email
    "password": "password123"
  }
  ```
  **Response**:
  ```json
  {
    "message": "Logging in...",
    "token": "JWT_TOKEN"
  }
  ```

### **2. Song Routes**

- **GET /api/songs**  
  Fetch all songs in the database.  
  **Response**:
  ```json
  {
    "allSongs": [
      {
        "_id": "songId1",
        "title": "Song Title",
        "audio_url": "https://example.com/audio.mp3",
        "cover_Image": "https://example.com/image.jpg",
        "createdAt": "2025-02-10T15:00:00Z",
        "updatedAt": "2025-02-10T15:00:00Z"
      }
    ]
  }
  ```

- **GET /api/songs/:id**  
  Fetch a single song by ID.  
  **Response**:
  ```json
  {
    "_id": "songId1",
    "title": "Song Title",
    "audio_url": "https://example.com/audio.mp3",
    "cover_Image": "https://example.com/image.jpg",
    "createdAt": "2025-02-10T15:00:00Z",
    "updatedAt": "2025-02-10T15:00:00Z"
  }
  ```

- **POST /api/songs**  
  Create a new song (requires authentication).  
  **Body**:
  ```json
  {
    "title": "New Song",
    "audio_url": "https://example.com/audio.mp3",
    "cover_Image": "https://example.com/image.jpg"
  }
  ```

- **PUT /api/songs/:id**  
  Update an existing song by ID (requires authentication).  
  **Body**:
  ```json
  {
    "title": "Updated Song",
    "audio_url": "https://example.com/audio.mp3",
    "cover_Image": "https://example.com/image.jpg"
  }
  ```

- **DELETE /api/songs/:id**  
  Delete a song by ID (requires authentication).

---

## **Usage**

1. **Register**: Sign up as a user through the `Register` page.
2. **Login**: Log in using the credentials created during registration.
3. **Upload Songs**: Upload a song with a title and cover image.
4. **View Songs**: Browse the list of all songs in the "All Songs" page.
5. **Play Song**: Click on any song to view and play it in a dedicated page.

---

## **Contributing**

If you’d like to contribute, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit: `git commit -am 'Add feature'`.
4. Push to your branch: `git push origin feature-name`.
5. Open a pull request with a description of your changes.

---

## **License**

This project is open-source and available under the [MIT License](LICENSE).
