
# Spotify Clone - Technical Documentation

## Overview
This project is a clone of the Spotify application built with Next.js. The application allows users to authenticate via Spotify, browse playlists and categories, search for music, and play songs directly from Spotify's API. To optimize data fetching and state management, **react-query** is used with a caching system to reduce redundant API calls and improve performance.


## Features

- Authentication: Users can log in using their Spotify account.
- Home Interface: Displays focusPlaylists and spotifyPlaylists fetched from Spotify's API. Clicking on a playlist redirects the user to a detailed view where they can see and play songs from that playlist.
- Browse All Interface: Displays all available Spotify categories. Users can click on a category to see its playlists and select one to view and play the songs.
- Search Bar: Allows users to search for music. The search query is debounced to wait 3 seconds after the last typed letter before fetching results from Spotify.
- Caching System: Implemented using react-query to cache API responses, reducing load times and optimizing user experience.
- Logout: A button that allows users to log out and disconnect their Spotify account.

## Technologies Used
- Next.js: A React framework used for building the frontend and handling server-side rendering.
- Spotify API: Used for fetching playlists, categories, and search results.
- OAuth: Used for authenticating users via their Spotify accounts.
- React Query: Utilized for data fetching, synchronization, and caching of API data.
- Debounce: Implemented to optimize the search functionality by delaying the API request until 3 seconds after the last input.

## Project Structure


## Usage/Examples

```javascript
/src
|-- /app
|   |-- [idPlaylist]           // Dynamic route for displaying playlist details and songs
|   |-- /API                   // Contains API calls to Spotify
|   |-- /home                  // Home page showing focusPlaylists and spotifyPlaylists
|   |-- /search                // Browse All page showing Spotify categories
|   |-- /specific-category     // Page to display playlists under a selected category
|   |-- /styles                // Global and component-specific styles
|-- /components                // Reusable components like AuthButton, Header, PlaylistCard
|-- /context                   // React Context for global state management
|-- /helpers                   // Utility functions for various operations
|-- /hooks                     // Custom hooks for data fetching using react-query
|-- /types                     // TypeScript types and interfaces

```

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
```bash
  git clone git@github.com:issamedine/spotify_app.git
  cd spotify_app
```
2. Install dependencies:

```bash
npm install
```
3. Create a .env.local file in the root directory and add the following environment variables:


```bash
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/api/auth
```


4. Run the development server:

```bash
npm run dev
```

5. Open the application in your browser:
```bash
http://localhost:3000
```
 

## Deployment

The application is deployed on Vercel. You can access it via the following link:

[https://spotify-app-eight-xi.vercel.app/](https://spotify-app-eight-xi.vercel.app/)
## Usage

1. **Authentication:** Click on the login button to authenticate via Spotify. You will be redirected to Spotify's login page.
2. **Home Interface:** Explore the `focusPlaylists` and `spotifyPlaylists` on the home page. Click on any playlist to view and play the songs.
3. **Browse All Interface:** Navigate to the "Browse All" page to view Spotify's music categories. Click on a category to see related playlists.
4. **Search:** Use the search bar at the top of the page to search for music. The results will appear 3 seconds after you stop typing.
5. **Caching:** The app uses `react-query` to cache API responses, so returning to a previously visited page will load data instantly without re-fetching.
6. **Logout:** Click the logout button to disconnect your Spotify account.

## Note

Due to Spotify's premium restrictions, the application does not support playing music directly. Instead, an embedded Spotify iframe is used with some style customizations to display the playlist and track details.