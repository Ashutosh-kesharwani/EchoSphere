import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";

import connectDB from "./db/index.js";

const PORT = process.env.PORT || 5001;

// Process Level Error Handling

// Synchronous Errors
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception :: ", error);

  process.exit(1);
});

// Unhandled Promise Rejections
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection :: ", reason);

  process.exit(1);
});

// Graceful Shutdown
process.on("SIGINT", () => {
  console.log("\nServer Shutting Down Gracefully");

  process.exit(0);
});

// Database Connection & Server Start

connectDB()
  .then(() => {
    // Express App Errors
    app.on("error", (error) => {
      console.error("Express Error :: ", error);

      process.exit(1);
    });

    // Start Server
    const server = app.listen(PORT, () => {
      console.log(`Server Running At :: http://localhost:${PORT}`);
    });

    // HTTP Server Errors
    server.on("error", (error) => {
      console.error("Server Error :: ", error);

      process.exit(1);
    });
  })

  .catch((error) => {
    console.error("MongoDB Connection Failed :: ", error);

    process.exit(1);
  });
