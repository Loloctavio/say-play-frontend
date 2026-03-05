import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { DashboardPage } from "../pages/DashboardPage";
import { GeneratePage } from "../pages/GeneratePage";
import { PlaylistDetailPage } from "../pages/PlaylistDetailPage";
import { ProfilePage } from "../pages/ProfilePage";
import { AboutPage } from "../pages/AboutPage";
import { ProtectedLayout } from "../components/ProtectedLayout";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          { path: "/", element: <DashboardPage /> },
          { path: "/generate", element: <GeneratePage /> },
          { path: "/playlists/:playlistId", element: <PlaylistDetailPage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/about", element: <AboutPage /> },
        ],
      },
    ],
  },
]);