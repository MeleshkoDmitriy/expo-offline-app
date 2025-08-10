import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { ScreenWrapper } from "../components/ScreenWrapper";
import { TodoForm } from "../components/sqlite/TodoForm";
import { TodoList } from "../components/sqlite/TodoList";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { SQLiteService } from "../services/sqlite";
import { TTodo } from "../types/types";

export const SQLScreen = () => {
  const db = useSQLiteContext();
  const sqliteService = new SQLiteService(db);

  const [list, setList] = useState<TTodo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadSQLTasks = async () => {
    try {
      setIsLoading(true);
      await sqliteService.initDatabase();
      const tasks = await sqliteService.getAllTasks();
      setList(tasks);
    } catch (error) {
      Alert.alert("SQLite Error while fetching tasks");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSQLTasks();
  }, []);

  if (isLoading) {
    return (
      <ScreenWrapper>
        <ActivityIndicator />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>SQL Todo</Text>
        <TodoForm onTaskCreated={loadSQLTasks} onTaskUpdated={loadSQLTasks} />
        <TodoList
          list={list}
          refresh={loadSQLTasks}
          isLoading={isLoading}
          onTaskUpdated={loadSQLTasks}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 16,
  },
});
