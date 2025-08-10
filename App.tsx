import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./navigation/AppNavigator";
import { SQLiteProvider } from "expo-sqlite";
import { RealmProvider } from "@realm/react";
import { Task } from "./services/task";
import { NetInfoProvider } from "./context/net-info-context";

export default function App() {
  return (
    <NetInfoProvider>
      <SQLiteProvider
        databaseName="user_database.db"
        onInit={async (db) => {
          await db.execAsync(`
        CREATE TABLE IF NOT EXISTS tasks (
          _id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          isCompleted BOOLEAN NOT NULL DEFAULT 0,
          createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);
        }}
        options={{ useNewConnection: false }}
      >
        <RealmProvider schema={[Task]}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </RealmProvider>
      </SQLiteProvider>
    </NetInfoProvider>
  );
}
