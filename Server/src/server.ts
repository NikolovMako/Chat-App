import App from "./app";
import "dotenv/config";
import RegisterController from "./controllers/register";
import LoginController from "./controllers/login";
import UsersController from "./controllers/users";

const app = new App(
  [new UsersController(), new RegisterController(), new LoginController()],
  parseInt(process.env.PORT!)
);

app.listen();