// src/App.tsx
import { Suspense } from "react";
import { routes } from "./routes/Routes";
import { useRoutes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const element = useRoutes(routes);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary>{element}</ErrorBoundary>
    </Suspense>
  );
}

export default App;
