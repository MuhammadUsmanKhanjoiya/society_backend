import express from "express"
import dotenv from "dotenv"

// Force load environment variables
console.log("🔄 Loading environment variables...")
dotenv.config()

// Additional environment loading attempts
if (process.env.NODE_ENV === "production") {
  console.log("🚀 Production mode detected")
} else {
  console.log("🛠️ Development mode detected")
}

import cors from "cors"
import DBconnection from "./utils/db.js";
import AuthRoutes from './routes/AuthRoutes.js'
import announcement from "./routes/announcement.js";
import Complain from "./routes/Complain.js";
import Event from "./routes/Event.js";
import GetPass from "./routes/GetPass.js";
import neighbourhood from "./routes/Neighbourhood.js";
import userRouter from "./routes/userRoutes.js";
import maintenanceBillRoutes from './routes/maintenanceBill.js' 
import chatRoutes from './routes/chatRoutes.js'
import staffRoutes from './routes/staffRoutes.js'

const app = express();

console.log('Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET_EXISTS: !!process.env.JWT_SECRET,
  JWT_SECRET_LENGTH: process.env.JWT_SECRET?.length
});
app.get("/env-check", (req, res) => {
  res.json({ jwtSecret: process.env.JWT_SECRET || "NOT SET" });
});
const PORT = process.env.PORT || 4000;
app.use(express.json())
app.use(cors({ origin: '*' }));


app.get('/', (req, res) => {
  res.send('Hello from Express server!');
});

DBconnection()

app.use("/api" ,AuthRoutes )
app.use ("/api/Announcements", announcement)
app.use("/api/Complains", Complain )
app.use("/api/Events", Event)
app.use("/api/GetPass", GetPass)
app.use("/api/Neighbourhood", neighbourhood)
app.use("/api/user", userRouter)
app.use("/api/maintenancebills", maintenanceBillRoutes);
app.use("/api/chat", chatRoutes);
app.use('/api/staff', staffRoutes);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
