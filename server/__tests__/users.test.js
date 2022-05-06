import { test, expect } from "@jest/globals";
import supertest from "supertest";

import app from "../server.js";
import pool from "../db/db.js";

test("POST /api/users/signup", async () => {
  await pool.query("DELETE FROM users WHERE email=$1", [
    "alan.grey@domain.com",
  ]);
  const data = {
    name: "Alan Grey",
    email: "alan.grey@domain.com",
    password: "password123",
  };
  const response = await supertest(app)
    .post("/api/users/signup")
    .set("Accept", "application/json")
    .send(data);
  expect(response.status).toEqual(201);
  expect(response.body.email).toEqual("alan.grey@domain.com");
  expect(response.body.token).toBeTruthy();
  expect(response.body.userId).toBeTruthy();
  expect(response.body.role).toBeTruthy();
});

test("GET /api/users", async () => {
  await supertest(app)
    .get("/api/users")
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body.users)).toBeTruthy();
    });
});

test("POST /api/users/login", async () => {
  const data = {
    email: "alan.grey@domain.com",
    password: "password123",
  };

  const response = await supertest(app)
    .post("/api/users/login")
    .set("Accept", "application/json")
    .send(data);
  expect(response.status).toEqual(201);
  expect(response.body.email).toEqual("alan.grey@domain.com");
  expect(response.body.token).toBeTruthy();
  expect(response.body.userId).toBeTruthy();
  expect(response.body.role).toBeTruthy();
});

test("POST /api/users/login with wrong email", async () => {
  const data = {
    email: "alan.grey@domain.com",
    password: "password123321",
  };

  const response = await supertest(app)
    .post("/api/users/login")
    .set("Accept", "application/json")
    .send(data);
  expect(response.status).toEqual(401);
  expect(response.text).toEqual(
    '{"message":"Could not identify user, credetials might be wrong"}'
  );
});

test("POST /api/users/login with wrong password", async () => {
  const data = {
    email: "alan.grey1000@domain.com",
    password: "password123",
  };

  const response = await supertest(app)
    .post("/api/users/login")
    .set("Accept", "application/json")
    .send(data);
  expect(response.status).toEqual(401);
  expect(response.text).toEqual(
    '{"message":"Could not identify user, credetials might be wrong"}'
  );
});

test("POST /api/users/signup with invalid name length", async () => {
  const data = {
    email: "alan.grey543@domain.com",
    password: "password123",
  };
  const response = await supertest(app)
    .post("/api/users/signup")
    .set("Accept", "application/json")
    .send(data);
  expect(response.status).toEqual(422);
});

test("POST /api/users/signup with invalid email", async () => {
  const data = {
    name: "Alan Grey",
    email: "alan.grey543@domain",
    password: "password123",
  };
  const response = await supertest(app)
    .post("/api/users/signup")
    .set("Accept", "application/json")
    .send(data);
  expect(response.status).toEqual(422);
});

test("POST /api/users/signup with invalid password", async () => {
  const data = {
    name: "Alan Grey",
    email: "alan.grey543@domain.com",
    password: "pass",
  };
  const response = await supertest(app)
    .post("/api/users/signup")
    .set("Accept", "application/json")
    .send(data);
  expect(response.status).toEqual(422);
});

test("POST /api/users/signup with existing user", async () => {
  const data = {
    name: "Alan Grey",
    email: "alan.grey@domain.com",
    password: "password123",
  };
  const response = await supertest(app)
    .post("/api/users/signup")
    .set("Accept", "application/json")
    .send(data);
  expect(response.status).toEqual(422);
  expect(response.text).toEqual(
    '{"message":"Could not create user, user exist"}'
  );
});

test("POST /api/users/login and patch /api/users/uid userinfo by id", async () => {
  const data = {
    email: "alan.grey@domain.com",
    password: "password123",
  };
  const response = await supertest(app)
    .post("/api/users/login")
    .set("Accept", "application/json")
    .send(data);
  expect(response.status).toEqual(201);
  expect(response.body.email).toEqual("alan.grey@domain.com");
  expect(response.body.token).toBeTruthy();
  expect(response.body.userId).toBeTruthy();

  const newData = {
    name: "editalan",
    email: "alan.grey@edit.com",
    password: "edited123",
  };
  const res = await supertest(app)
    .patch(`/api/users/${response.body.userId}`)
    .set({ Authorization: "Bearer " + response.body.token})
    .set("Accept", "application/json")
    .send(newData);
  expect(res.status).toEqual(200);
});

test("LOGIN AND DELETE /api/users/uid user by id", async () => {
  const loginData = {
    email: "alan.grey@edit.com",
    password: "edited123",
  };
  const response = await supertest(app)
    .post("/api/users/login")
    .set("Accept", "application/json")
    .send(loginData);

  expect(response.status).toEqual(201);
  expect(response.body.email).toEqual("alan.grey@edit.com");
  expect(response.body.token).toBeTruthy();
  expect(response.body.userId).toBeTruthy();

  const res = await supertest(app)
    .delete(`/api/users/${response.body.userId}`)
    .set({ Authorization: "Bearer " + response.body.token });
  expect(res.status).toEqual(200);
  expect(res.body.message).toEqual("Deleted the user.");
});
