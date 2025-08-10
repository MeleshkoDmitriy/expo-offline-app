import { StyleSheet, Text, View } from "react-native";
import { ScreenWrapper } from "../components/ScreenWrapper";
import { TodoForm } from "../components/realm/TodoForm";
import { TodoList } from "../components/realm/TodoList";
import { useQuery } from "@realm/react";
import { useEffect, useState } from "react";

export const RealmScreen = () => {
  const [list, setList] = useState<any>([]);
  const tasksList = useQuery("Task");

  useEffect(() => {
    setList(tasksList);
  }, [tasksList])

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Realm Todo</Text>
        <TodoForm />
        <TodoList list={list} />
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
