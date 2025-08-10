import { NavigatorScreenParams } from "@react-navigation/native";
import { TTodo } from "./types";

export type RootTabParamList = {
  Realm: NavigatorScreenParams<RealmStackParamList>;
  SQL: NavigatorScreenParams<SQLStackParamList>;
};

export type RealmStackParamList = {
  RealmMain: undefined;
  EditRealm: { task: TTodo };
};

export type SQLStackParamList = {
  SQLMain: undefined;
  EditSQL: {
    task: Omit<TTodo, "createdAt"> & { createdAt: string };
    onTaskUpdated?: () => void;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}
