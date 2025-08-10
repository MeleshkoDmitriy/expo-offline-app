import { FlatList, StyleSheet, View } from "react-native";
import { TTodo } from "../../types/types";
import { TodoItem } from "./TodoItem";
import { ListSeparator } from "../ListSeparator";
import { ListEmpty } from "../ListEmpty";

interface TodoListProps {
  list: TTodo[];
}

export const TodoList = ({ list }: TodoListProps) => {
  return (
    <FlatList
      data={list}
      renderItem={({ item }) => <TodoItem item={item} />}
      keyExtractor={(item) => item._id}
      ItemSeparatorComponent={ListSeparator}
      ListEmptyComponent={ListEmpty}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
  },
});
