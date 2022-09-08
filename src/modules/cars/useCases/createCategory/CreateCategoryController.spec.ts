import { hash } from "bcryptjs";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuid4 } from "uuid";

import { app } from "../../../../app";

let connection: Connection;

describe("Create Category Controller", () => {
  beforeEach(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuid4();
    const password = await hash("admin", 8);

    await connection.query(`
    INSERT INTO 
    USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    VALUES('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXXX')    
    `);
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/session").send({
      email: "admin@admin.com.br",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Foo Bar",
        description: "Lorem Ipsum",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });
    expect(response.status).toBe(201);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
});
