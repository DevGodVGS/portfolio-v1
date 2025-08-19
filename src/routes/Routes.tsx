// src/routes/routes.tsx
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";

// Lazy-loaded pages for better performance
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Projects = lazy(() => import("../pages/Projects"));
const Contact = lazy(() => import("../pages/Contact"));
const Page404 = lazy(() => import("../pages/Page404"));
const Resume = lazy(() => import("../components/Resume.tsx"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "projects", element: <Projects /> },
      { path: "contact", element: <Contact /> },
      { path: "resume", element: <Resume /> },
      { path: "*", element: <Page404 /> }
    ],
  },
];
