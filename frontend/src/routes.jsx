import HomePage from "./pages/HomePage.jsx";
import GamePage from "./pages/GamePage.jsx";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "game",
    element: <GamePage />,
  },
];

export default routes;
