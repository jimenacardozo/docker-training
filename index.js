import { Sequelize, DataTypes } from "sequelize";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const dbHost = process.env.DBHOST ?? 'localhost';
const postgresDB = process.env.POSTGRES_DB;
const postgresUser = process.env.POSTGRES_USER;
const postgresPassword = process.env.POSTGRES_PASSWORD

const sequelize = new Sequelize(postgresDB, postgresUser, postgresPassword, {
    host: dbHost,
    port: 5432,
    dialect: 'postgres',
    logging: false, 
  });

const User = sequelize.define('User', {
        name: DataTypes.STRING,
        mail: DataTypes.STRING,
    });

const app = express();
app.use(express.json());

app.get("/api/users", async (req, res) => {
    const users = await User.findAll(); 
    res.send(users);
});

app.post("/api/users", async (req,res) => {
    const user = req.body;
    const createdUser = await User.create(
      user
    );
    res.status(201).send(createdUser);
});

sequelize.sync()
  .then(() => {
    console.log("Tablas sincronizadas correctamente.");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(err => {
    console.error("Error al sincronizar la base de datos:", err);
  });