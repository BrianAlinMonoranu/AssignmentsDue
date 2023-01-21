const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");
const socketio = require("@feathersjs/socketio");
const moment = require("moment");
const pg = require("pg");

// Idea Service
class IdeaService {
    constructor() {
        this.pg = new pg.Pool({
            host: "localhost",
            user: "postgres",
            port: "5432",
            password: "Secret123#",
            database: "students",
        });

        this.pg.connect((err, client, done) => {
            if (err) {
                console.error("Error connecting to PostgreSQL", err);
            } else {
                console.log("Connected to PostgreSQL");
            }
        });
    }

    async find() {
        this.pg.query("SELECT * FROM students", (err, res) => {
            if (err) {
                console.log(err);
            } else {
                return res.rows;
            }
        });
    }

    async create(data) {
        const { module, assignment } = data;
        const insertDB = `INSERT INTO students (module,assignment) VALUES ('${module}', '${assignment}')`;
        const result = await this.pg.query(insertDB);
        console.log(result);
    }
}

const app = express(feathers());

// Parse JSON
app.use(express.json());
// Config Socket.io realtime APIs
app.configure(socketio());
// Enable REST services
app.configure(express.rest());
// Register services
app.use("/ideas", new IdeaService());

//In Feathers.js, you can use the app.channel(channelName).join(connection) method to join a client to a specific real-time channel.
app.on("connection", (conn) => app.channel("stream").join(conn));

// Publish events to stream
app.publish((data) => app.channel("stream"));

const PORT = process.env.PORT || 3030;

app
    .listen(PORT)
    .on("listening", () =>
        console.log(`Realtime server running on port ${PORT}`)
    );