import { hash } from "bcryptjs";
import { v4 as uuid4 } from "uuid";

import createConnection from "../../database/index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuid4();
  const password = await hash("admin", 8);

  await connection.query(
    `
    INSERT INTO 
    USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    VALUES('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXXX')    
    `
  );
}

create().then(() => {
  console.log("User admin created!");
});
