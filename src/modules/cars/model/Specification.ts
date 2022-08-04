import { v4 as uuidv4 } from "uuid";

class Specification {
  id?: string;
  name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(name: string, description: string) {
    if (!this.id) {
      this.id = uuidv4();
    }
    this.name = name;
    this.description = description;
    if (!this.created_at) {
      this.created_at = new Date();
    } else {
      this.updated_at = new Date();
    }
  }
}

export { Specification };
