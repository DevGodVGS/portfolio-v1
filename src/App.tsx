// src/App.tsx
import { Suspense } from "react";
import { routes } from "./routes/Routes";
import { useRoutes } from "react-router-dom";

function App() {
  const element = useRoutes(routes);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {element}
    </Suspense>
  );
}

export default App;
