import { test, expect } from "@jest/globals";
import supertest from "supertest";

import app from "../server.js";

test("GET /api/reviews", async () => {
  await supertest(app)
    .get("/api/reviews")
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body.reviews)).toBeTruthy();
    });
});

test("POST /api/reviews create new review and DELETE by id", async () => {
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
    item: "kaskdak112",
    review: "Hyvä tuote",
    creator: "123k12ajgm",
  };
  const response = await supertest(app)
    .post("/api/reviews")
    .set({ Authorization: "Bearer " + resp.body.token })
    .send(data);
  expect(response.status).toEqual(201);
  expect(response.body.review).toEqual("Hyvä tuote");

  const res = await supertest(app)
    .delete(`/api/reviews/${response.body.id}`)
    .set({ Authorization: "Bearer " + resp.body.token });
  expect(res.status).toEqual(200);
  expect(res.body.message).toEqual("Deleted the review.");
});
