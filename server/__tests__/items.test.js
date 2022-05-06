import { test, expect } from "@jest/globals";
import supertest from "supertest";

import app from "../server.js";
import pool from "../db/db.js";

test("GET /api/items", async () => {
  await supertest(app)
    .get("/api/items")
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body.items)).toBeTruthy();
    });
});

test("POST /api/items create new item and DELETE /api/items/iid by id", async () => {
  await pool.query("DELETE FROM users WHERE email=$1", [
    "testiukko2@gmail.com",
  ]);
  const user = {
    name: "Testi Ukko2",
    email: "testiukko2@gmail.com",
    password: "testiukko2",
  };
  const resp = await supertest(app)
    .post("/api/users/signup")
    .set("Accept", "application/json")
    .send(user);
  expect(resp.status).toEqual(201);
  expect(resp.body.email).toEqual("testiukko2@gmail.com");
  expect(resp.body.token).toBeTruthy();
  expect(resp.body.userId).toBeTruthy();

  const data = {
    id: 100,
    name: "Test item",
    description: "testi tuote",
    price: "10",
    image: "templink",
  };
  const response = await supertest(app)
    .post("/api/items")
    .set({ Authorization: "Bearer " + resp.body.token })
    .send(data);
  expect(response.status).toEqual(201);
  expect(response.body.name).toEqual("Test item");

  const res = await supertest(app)
    .delete(`/api/items/${response.body.id}`)
    .set({ Authorization: "Bearer " + resp.body.token });
  expect(res.status).toEqual(200);
  expect(res.body.message).toEqual("Deleted the item.");
});

test("POST /api/items create new item and PATCH /api/items/iid by id", async () => {
  const login = {
    email: "testiukko2@gmail.com",
    password: "testiukko2",
  };
  const loginRes = await supertest(app)
    .post("/api/users/login")
    .set("Accept", "application/json")
    .send(login);

  const data = {
    id: 100,
    name: "Test item",
    description: "testi tuote",
    price: "10",
    image: "templink",
  };
  const response = await supertest(app)
    .post("/api/items")
    .set({ Authorization: "Bearer " + loginRes.body.token })
    .send(data);
  expect(response.status).toEqual(201);
  expect(response.body.name).toEqual("Test item");

  const newData = {
    name: "Testi tuote",
    description: "Testattu tuote",
    price: "20",
    image: "editlink",
  };
  const res = await supertest(app)
    .patch(`/api/items/${response.body.id}`)
    .set({ Authorization: "Bearer " + loginRes.body.token })
    .send(newData);
  expect(res.status).toEqual(200);
});

test("PATCH /api/items/iid with wrong id", async () => {
  const login = {
    email: "testiukko2@gmail.com",
    password: "testiukko2",
  };
  const loginRes = await supertest(app)
    .post("/api/users/login")
    .set("Accept", "application/json")
    .send(login);

  const newData = {
    name: "Testi tuote",
    description: "Testattu tuote",
    price: "20",
    image: "editlink",
  };

  const res = await supertest(app)
    .patch(`/api/items/69196`)
    .set({ Authorization: "Bearer " + loginRes.body.token })
    .send(newData);
  expect(res.status).toEqual(404);
  expect(res.body.message).toEqual("Could not find a item for the provided id");
});
