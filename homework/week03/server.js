import express from "express";
import bodyParser from "body-parser";

import fs from "fs";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/todos", (req, res) => {
  fs.readFile("data.json", "utf-8", function (err, data) {
    res.json(JSON.parse(data));
  });
});

app.post("/todos", (req, res) => {
  const { id, task } = req.body;
  const newTask = { id, task };
  fs.readFile("data.json", "utf-8", function (err, data) {
    var json = JSON.parse(data);
    json.push(newTask);
    fs.writeFile("data.json", JSON.stringify(json), function (err) {
      if (err) {
        throw err;
      }
    });
  });
  res.status(201).json({ task: newTask });
});

app.patch("/:tid", (req, res) => {
  const { task } = req.body;
  const taskId = req.params.tid;
  fs.readFile("data.json", "utf-8", function (err, data) {
    var json = JSON.parse(data);
    const taskIndex = json.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) {
      throw err;
    }
    const updatedTask = { ...json.find((t) => t.id === taskId) };
    updatedTask.task = task;
    json[taskIndex] = updatedTask;
    fs.writeFile("data.json", JSON.stringify(json), function (err) {
      if (err) {
        throw err;
      }
      res.status(200).json({ task: updatedTask });
    });
  });
});

app.delete("/:tid", (req, res) => {
  const taskId = req.params.tid;
  fs.readFile("data.json", "utf-8", function (err, data) {
    var json = JSON.parse(data);
    json = json.filter((t) => t.id !== taskId);
    fs.writeFile("data.json", JSON.stringify(json), function (err) {
      if (err) {
        throw err;
      }
      res.status(200).json({ message: "Succesfully deleted task!" });
    });
  });
});

app.listen(5000, () => {
  console.log(`Example app listening on port 5000..`);
});
