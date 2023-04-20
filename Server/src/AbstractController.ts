import { Router } from "express";

export abstract class AbstractController {
  path!: string;
  router!: Router;
  abstract initializeRoutes(): void;
}