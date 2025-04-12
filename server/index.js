const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

const userRouter = require('./routes/Users');
app.use("/users", userRouter);

const teacherRouter = require('./routes/Teachers');
app.use("/teachers", teacherRouter);

const kidRouter = require('./routes/Kids');
app.use("/kids", kidRouter);

const enrollRouter = require('./routes/Enrollments');
app.use("/enrollments", enrollRouter);

const mealRouter = require('./routes/Meals');
app.use("/meals", mealRouter);

const classRouter = require('./routes/Classs');
app.use("/classs", classRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("server running on port 3001");
    });
});