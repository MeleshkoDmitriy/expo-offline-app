import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { TTodo } from "../../types/types";
import { TodoItem } from "./TodoItem";
import { ListSeparator } from "../ListSeparator";
import { ListEmpty } from "../ListEmpty";

interface TodoListProps {
  list: TTodo[];
  refresh?: () => void;
  isLoading?: boolean;
  onTaskUpdated?: () => void;
}

export const TodoList = ({ list, refresh, isLoading = false, onTaskUpdated }: TodoListProps) => {
  return (
    <FlatList
      data={list}
      renderItem={({ item }) => (
        <TodoItem
          item={item}
          onTaskUpdated={onTaskUpdated}
        />
      )}
      keyExtractor={(item) => item._id}
      ItemSeparatorComponent={ListSeparator}
      ListEmptyComponent={ListEmpty}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refresh} />
      }
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
