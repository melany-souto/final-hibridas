import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes.jsx"
import { SessionProvider } from "./contexts/SessionContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css"

import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Logout from "./pages/auth/Logout.jsx";

import AllRecipes from "./pages/recipes/AllRecipes.jsx";
import CreateRecipe from "./pages/recipes/createRecipe.jsx";
import EditRecipe from "./pages/recipes/editRecipe.jsx";
import RecipeDetail from "./pages/recipes/RecipeDetail.jsx";
import RecipesByCategory from "./pages/recipes/recipesByCategory.jsx";
import MyRecipes from "./pages/recipes/MyRecipes.jsx";

import MyBoards from "./pages/boards/myBoards.jsx";
import CreateBoard from "./pages/boards/CreateBoard.jsx";
import BoardDetail from "./pages/boards/BoardDetail.jsx";
import SharedBoard from "./pages/boards/ShareBoard.jsx";

import MyProfile from "./pages/users/MyProfile.jsx";
import MyProfileEdit from "./pages/users/MyProfileEdit.jsx";
import UserProfile from "./pages/users/UserProfile.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/recipes",
        element: (
          <ProtectedRoute>
            <AllRecipes />
          </ProtectedRoute>
        )
      },
      {
        path: "/MyRecipes",
        element: (
          <ProtectedRoute>
            <MyRecipes />
          </ProtectedRoute>
        )
      },
      {
        path: "/recipes/:id",
        element: (
          <ProtectedRoute>
            < RecipeDetail />
          </ProtectedRoute>
        )
      },
      {
        path: "recipes/new",
        element: (
          <ProtectedRoute>
            <CreateRecipe />
          </ProtectedRoute>
        )
      },
      {
        path: "recipes/:id/edit",
        element: (
          <ProtectedRoute>
            <EditRecipe />
          </ProtectedRoute>
        )
      },
      {
        path: "category/:categoryId",
        element: (
          <ProtectedRoute>
            <RecipesByCategory />
          </ProtectedRoute>
        )
      },
      {
        path: "boards",
        element: (
          <ProtectedRoute>
            <MyBoards />
          </ProtectedRoute>
        )
      },
      {
        path: "boards/create",
        element: (
          <ProtectedRoute>
            <CreateBoard />
          </ProtectedRoute>
        )
      },
      {
        path: "boards/:id",
        element: (
          <ProtectedRoute>
            <BoardDetail />
          </ProtectedRoute>
        )
      },
      {
        path: "boards/:boardId/share",
        element: (
          <ProtectedRoute>
            <SharedBoard />
          </ProtectedRoute>
        )
      },
      {
        path: "/MyProfile",
        element: (
          <ProtectedRoute>
            <MyProfile />
          </ProtectedRoute>
        )
      },
      {
        path: "/MyProfile/edit",
        element: (
          <ProtectedRoute>
            <MyProfileEdit />
          </ProtectedRoute>
        )
      },
      {
        path: "/UserProfile/:id",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        )
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/logout",
        element: <Logout />
      }
    ]
  },

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>
);