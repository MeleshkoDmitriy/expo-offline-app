import Realm, { BSON } from "realm";

export class Task extends Realm.Object {
  _id!: BSON.UUID;
  title!: string;
  description!: string;
  isCompleted!: boolean;
  createdAt!: Date;

  static primaryKey = "_id";
  static schema: Realm.ObjectSchema = {
    name: "Task",
    primaryKey: "_id",
    properties: {
      _id: "uuid",
      title: "string",
      description: "string",
      isCompleted: {
        type: "bool",
        default: false,
        indexed: true,
      },
      createdAt: {
        type: "date",
        default: () => new Date(),
      },
    },
  };

  constructor(realm: Realm, title: string, description: string) {
    console.log("in constructor");
    super(realm, {
      _id: new BSON.UUID(),
      title,
      description,
    });
  }
}
