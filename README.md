
# 🎵 MusicFy - Spotify Clone

![MusicFy Banner](https://i.imgur.com/ZJg3CZN.png)

## 📝 Description

MusicFy is a full-stack Spotify clone built with React and Node.js. This project was developed during the final phase of my web development bootcamp, focusing on creating a modern music streaming platform with features like user authentication, song browsing, playlist creation, and favoriting songs. The application implements a responsive design that closely mimics Spotify's user interface while adding custom features and improvements.

## 🚀 Deployment Link

**Live Site:** [MusicFy App](https://musicfy-clone.netlify.app)

**API Endpoint:** [MusicFy API](https://spotify-clone-api-v2.netlify.app)

**Test Account:**
- Email: test@example.com
- Password: password123
## 💻 Getting Started/Code Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Frontend Installation
```bash
# Clone the repository
git clone https://github.com/AlphaTheDev00/Yassine-spotify-client.git

# Navigate to the project directory
cd Yassine-spotify-client

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Backend Installation
```bash
# Clone the repository
git clone https://github.com/AlphaTheDev00/Yassine-spotify-API.git

# Navigate to the project directory
cd Yassine-spotify-API

# Install dependencies
npm install

# Start the development server
npm run dev
```

## ⏱️ Timeframe & Working Team

**Timeframe:** 2 weeks (April 2025)

**Project Type:** Solo project

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- Chakra UI
- React Router
- Axios
- React Icons
- CSS Modules

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Netlify Functions
- Serverless Framework

### Development Tools
- Git & GitHub
- Netlify
- VS Code
- Chrome DevTools
- Postman

## 📋 Brief

The project brief required creating a full-stack application that demonstrates proficiency in:

- Building a React frontend with multiple components and routes
- Implementing a Node.js/Express backend with RESTful API endpoints
- Utilizing MongoDB for data persistence
- Implementing user authentication and authorization
- Deploying both frontend and backend to production environments
- Creating a responsive and intuitive user interface
- Following best practices for code organization and documentation

The specific requirements included:
- User authentication (register, login, logout)
- CRUD operations for songs and playlists
- Ability to like/unlike songs
- Search functionality
- Responsive design for various screen sizes

## 📐 Planning

### Wireframes

I started the planning process by creating wireframes to visualize the user interface and user flow. I used Figma to create detailed mockups of the main pages:

![Wireframe - Home Page](https://i.imgur.com/XYZ123.png)
![Wireframe - Song Details](https://i.imgur.com/ABC456.png)

### Entity Relationship Diagram (ERD)

For the database design, I created an ERD to map out the relationships between different entities:

![Entity Relationship Diagram](https://i.imgur.com/DEF789.png)

The main entities in the application are:
- Users
- Songs
- Playlists
- Artists
- Albums

### Component Hierarchy

I planned the React component structure to ensure a modular and maintainable codebase:

```
App
├── Layout
│   ├── Navbar
│   ├── Sidebar
│   └── Footer
├── Pages
│   ├── Home
│   ├── Login/Register
│   ├── AllSongs
│   ├── LikedSongs
│   ├── Playlists
│   └── SongDetails
└── Components
    ├── SongCard
    ├── PlaylistCard
    ├── SearchBar
    ├── AudioPlayer
    └── AuthForm
```

### User Stories

I created user stories to guide the development process:

- As a user, I want to register and log in to access personalized features
- As a user, I want to browse all available songs
- As a user, I want to search for songs by title or artist
- As a user, I want to like/unlike songs and view my liked songs
- As a user, I want to create and manage playlists
- As a user, I want to add songs to my playlists

## 🔨 Build/Code Process

### Authentication System

One of the first features I implemented was the authentication system. I used JWT for secure user authentication and localStorage for token persistence.

```javascript
// userService.js - Authentication Service
export const signin = async (credentials) => {
  try {
    // Use the Netlify function path for authentication
    const endpoint = "/.netlify/functions/api/auth/login";
      
    console.log(`Using authentication endpoint: ${endpoint}`);
    console.log("With credentials:", credentials);

    const response = await api.post(endpoint, credentials);

    console.log("Login response:", response.data);

    // Check if we have a valid response with token
    if (response.data && response.data.token) {
      return response.data;
    } else {
      console.error("Invalid response structure:", response.data);
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    console.error(
      "Login error details:",
      error.response?.data || error.message
    );
    throw error;
  }
};
```

I implemented a context provider to manage authentication state across the application:

```jsx
// AuthProvider.jsx
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to initialize or refresh user from token
  const refreshUser = () => {
    try {
      const userData = getUserFromToken();
      console.log("User data from token:", userData);
      setUser(userData);
    } catch (error) {
      console.error("Error refreshing user:", error);
      removeToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize user when component mounts
  useEffect(() => {
    refreshUser();
    // Listen for storage events (if token changes in another tab)
    const handleStorageChange = (e) => {
      if (e.key === "spotify_clone_token") {
        refreshUser();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
```

### User-Specific Liked Songs

Implementing the liked songs functionality was challenging but rewarding. I created a system that stores liked songs per user in localStorage, ensuring each user has their own personalized experience:

```javascript
// localLikedSongs.js
const getUserStorageKey = (userId) => {
  return userId ? `${LOCAL_STORAGE_KEY}_${userId}` : LOCAL_STORAGE_KEY;
};

export const getLikedSongIds = (userId = 'guest') => {
  try {
    const userKey = getUserStorageKey(userId);
    const storedLikedSongs = localStorage.getItem(userKey);
    if (!storedLikedSongs) {
      return new Set();
    }
    return new Set(JSON.parse(storedLikedSongs));
  } catch (error) {
    console.error('Error getting liked songs from localStorage:', error);
    return new Set();
  }
};
```

In the AllSongs component, I implemented the UI for liking/unliking songs with a heart icon that changes color based on the liked status:

```jsx
// AllSongs.jsx
const handleLikeToggle = (e, songId) => {
  e.preventDefault(); // Prevent navigation to song details
  if (!user) {
    toast({
      title: "Please log in",
      description: "You need to be logged in to like songs",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
    return;
  }

  try {
    const userId = user?.id || 'guest';
    if (likedSongs.has(songId)) {
      // Use local storage to remove the song
      removeLikedSong(songId, userId);
      setLikedSongs((prev) => {
        const newSet = new Set(prev);
        newSet.delete(songId);
        return newSet;
      });
      toast({
        title: "Song removed from liked songs",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      // Use local storage to add the song
      addLikedSong(songId, userId);
      setLikedSongs((prev) => new Set([...prev, songId]));
      toast({
        title: "Song added to liked songs",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  } catch (err) {
    toast({
      title: "Error",
      description: err.message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};
```

### Search and Pagination

I implemented a search feature with real-time filtering and pagination to improve the user experience when browsing through songs:

```jsx
// AllSongs.jsx - Search functionality
useEffect(() => {
  if (!searchQuery.trim()) {
    setFilteredSongs(songs);
    setCurrentPage(1);
    return;
  }
  
  const query = searchQuery.toLowerCase().trim();
  const filtered = songs.filter(song => 
    song.title.toLowerCase().includes(query) || 
    (song.artist?.username && song.artist.username.toLowerCase().includes(query))
  );
  
  setFilteredSongs(filtered);
  setCurrentPage(1);
}, [searchQuery, songs]);

// Pagination logic
const indexOfLastSong = currentPage * songsPerPage;
const indexOfFirstSong = indexOfLastSong - songsPerPage;
const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);
const totalPages = Math.ceil(filteredSongs.length / songsPerPage);

const goToNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

const goToPreviousPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};
```

## 🧩 Challenges

### Authentication and API Integration

One of the biggest challenges was setting up the authentication system to work correctly with the Netlify serverless functions. Initially, I encountered issues with CORS and API path configurations, which led to 404 errors when trying to log in or register. I had to carefully debug the API endpoint URLs and ensure they were correctly formatted for both development and production environments.

The solution involved updating the API base URL configuration and standardizing the authentication endpoints:

```javascript
// api.js
const getBaseUrl = () => {
  const isProd = import.meta.env.PROD;
  
  if (isProd) {
    // In production, use the deployed API URL
    return "https://spotify-clone-api-v2.netlify.app";
  } else {
    // In development, use localhost
    return "http://localhost:8888";
  }
};
```

### User-Specific Liked Songs

Another challenge was implementing the liked songs functionality to be user-specific. Initially, all users could see the same liked songs, which was not the intended behavior. I had to restructure the localStorage implementation to store liked songs per user ID, ensuring that each user only sees their own liked songs.

This required careful management of the user context and ensuring that the liked songs were properly filtered based on the current user's ID.

### Responsive Design

Creating a responsive design that worked well on all screen sizes was challenging. I had to implement custom CSS and use Chakra UI's responsive utilities to ensure the application looked good on mobile, tablet, and desktop devices. This involved creating different layouts for different screen sizes and testing extensively across various devices.

## 🏆 Wins

### Seamless Authentication Experience

One of my biggest wins was implementing a smooth authentication flow that persists user sessions across page refreshes and browser tabs. The system correctly handles token storage, validation, and expiration, providing a seamless user experience.

### Real-time Search and Pagination

The implementation of real-time search with pagination significantly improved the user experience. Users can quickly find songs by title or artist, and the pagination controls make it easy to navigate through large collections of songs.

```jsx
<div className={styles.searchContainer}>
  <InputGroup mb={4}>
    <InputLeftElement pointerEvents="none">
      <FaSearch color="gray.300" />
    </InputLeftElement>
    <Input 
      placeholder="Search songs by title or artist"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      borderRadius="full"
      bg="#2a2a2a"
      color="white"
      _placeholder={{ color: 'gray.400' }}
      _hover={{ bg: '#333' }}
      _focus={{ bg: '#333', borderColor: '#1db954' }}
    />
  </InputGroup>
</div>
```

### Stylish UI Components

I'm particularly proud of the UI components I created, such as the sign-in/sign-up card in the sidebar. These components not only look visually appealing but also provide clear user guidance and enhance the overall user experience.

```jsx
<div className="auth-card">
  <h3>Premium Experience</h3>
  <p>Unlock the full potential of MusicFy with your personal account</p>
  <div className="auth-features">
    <div className="auth-feature">
      <FaHeart className="feature-icon" />
      <span>Save favorites</span>
    </div>
    <div className="auth-feature">
      <FaBookmark className="feature-icon" />
      <span>Create playlists</span>
    </div>
    <div className="auth-feature">
      <FaMusic className="feature-icon" />
      <span>Upload music</span>
    </div>
  </div>
  <div className="auth-buttons">
    <Link to="/login" className="auth-button login-button">
      <FaUser className="auth-icon" />
      <span>Sign In</span>
    </Link>
    <Link to="/register" className="auth-button register-button">
      <FaUserPlus className="auth-icon" />
      <span>Sign Up</span>
    </Link>
  </div>
</div>
```

## 🎓 Key Learnings/Takeaways

### React Context API and State Management

Working on this project significantly improved my understanding of React's Context API for global state management. I learned how to effectively structure context providers, consumers, and custom hooks to manage application state across components.

```jsx
// useAuth.js
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

// Custom hook to use the UserContext
export const useAuth = () => {
  return useContext(UserContext);
};
```

### API Integration and Error Handling

I gained valuable experience in integrating frontend and backend services, handling API requests, and implementing robust error handling. I learned the importance of proper error messages and user feedback to enhance the user experience.

### CSS Modules and Styling Best Practices

Using CSS Modules helped me understand the benefits of scoped styling and how to organize CSS for larger applications. I also learned how to combine CSS Modules with component libraries like Chakra UI to create a consistent and maintainable styling system.

### Deployment and Environment Configuration

Deploying both frontend and backend to Netlify taught me about environment configuration, build processes, and the challenges of deploying full-stack applications. I learned how to configure environment variables, handle CORS issues, and set up serverless functions.

## 🐛 Bugs

- The audio player functionality is not fully implemented yet, so clicking the play button on songs doesn't actually play the music.
- On some mobile devices, the sidebar navigation can sometimes overlap with the main content area.
- Occasionally, the liked songs state may not immediately update after liking/unliking a song, requiring a page refresh.

## 🔮 Future Improvements

- **Implement Audio Playback**: Add a functional audio player that can play, pause, and skip songs.
- **User Profile Management**: Allow users to update their profile information and upload profile pictures.
- **Advanced Playlist Features**: Enable users to create, edit, and share playlists with other users.
- **Social Features**: Add the ability to follow other users and see what they're listening to.
- **Offline Mode**: Implement caching to allow users to access their favorite songs offline.
- **Mobile App**: Develop a mobile application using React Native to provide a native mobile experience.
- **Advanced Search Filters**: Add filters for genres, release dates, and popularity to enhance the search functionality.
- **Analytics Dashboard**: Create a dashboard for users to view their listening habits and discover new music based on their preferences.

---

## 📱 Connect With Me

- [GitHub](https://github.com/AlphaTheDev00)
- [LinkedIn](https://linkedin.com/in/yassine-dev)
- [Portfolio](https://yassine-dev.com)

---

*This project was created as part of a web development bootcamp and is for educational purposes only.*
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
