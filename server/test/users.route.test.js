import * as chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";

const { request } = chai.use(chaiHttp);

import User from "../models/user.model.js";
import server from "../index.js";
import testUsersArray from "./data/testUsersArray.js";

describe("Integration Tests on requests to the /user route", () => {

  const testRouteBase = "/user";

  beforeEach(async () => {
    try {
      await User.deleteMany();
      await User.insertMany(testUsersArray);
    } catch (error) {
      console.log(error); 
    }
  }); 

  describe("POST requests to /user/register", () => {

    it("Should add a properly formatted user to the database", async () => {

      const testUser = {
        firstname: "Bobert",
        lastname: "Bobson",
        username: "bobertbobson",
        email: "bbobson@hotmail.com",
        password: "password123",
        passwordConfirmation: "password123"
      };

      const response = await request(server)
        .post(`${testRouteBase}/register`)
        .send(testUser);

      expect(response).to.have.status(201);
      expect(response.body).to.have.property("_id");
      expect(response.body.firstname).to.eql(testUser.firstname);
      expect(response.body.username).to.eql(testUser.username);
    })

    it("Should not allow registration when email is duplicated", async () => {

      const testUser = {
        firstname: "Bobert",
        lastname: "Bobson",
        username: "bobertbobson",
        email: "lschung@hotmail.co.uk",
        password: "password123",
        passwordConfirmation: "password123"
      };

      const response = await request(server)
        .post(`${testRouteBase}/register`)
        .send(testUser);

      expect(response).to.have.status(400);
      expect(response.text).to.eql(`{"message":"This email is already in use"}`);
 
    })

    it("Should not allow registration when username is duplicated", async () => {

      const testUser = {
        firstname: "Bobert",
        lastname: "Bobson",
        username: "loksze",
        email: "bbobson@hotmail.com",
        password: "password123",
        passwordConfirmation: "password123"
      };

      const response = await request(server)
        .post(`${testRouteBase}/register`)
        .send(testUser);

      expect(response).to.have.status(400);
      expect(response.text).to.eql(`{"message":"This username is already in use"}`);
 
    })

    it("Should not allow registration when passwords do not match", async () => {

      const testUser = {
        firstname: "Bobert",
        lastname: "Bobson",
        username: "loksze",
        email: "bbobson@hotmail.com",
        password: "password123",
        passwordConfirmation: "4321secret"
      };

      const response = await request(server)
        .post(`${testRouteBase}/register`)
        .send(testUser);

      expect(response).to.have.status(422);
      expect(response.text).to.eql(`{"message":"User validation failed: passwordConfirmation: Passwords do not match"}`);
 
    })


  });


});
