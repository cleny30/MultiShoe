import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import './assets/css/style.css';

function App() {
  return (
    <Routes>
      {routes.map((routeItem) => {
        return (
          <Route
            key={routeItem.name}
            path={routeItem.path}
            element={<routeItem.component />}
          />
        );
      })}
    </Routes>
  );
}

export default App;
