import cors from "cors";
import helmet from "helmet";
import express, { Application } from "express";

import router from "@/routes";

const app: Application = express();
const port = process.env.PORT || 7000;

app.use(cors);
app.use(helmet());
app.use(express.json());

app.use("/api/v1/orders", router);

app.listen(port, () => {
  console.log(`Order service is running on port ${port}`);
});
