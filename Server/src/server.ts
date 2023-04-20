import App from "./App";
import "dotenv/config";
import RegisterController from "./controllers/register";
import LoginController from "./controllers/login";

const app = new App(
  [new RegisterController(), new LoginController()],
  parseInt(process.env.PORT!)
);

app.listen();