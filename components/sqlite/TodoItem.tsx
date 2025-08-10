import Checkbox from "expo-checkbox";
import { StyleSheet, Text, View } from "react-native";
import { TTodo } from "../../types/types";
import { CustomButton } from "../CustomButton";
import { formatDate } from "../../utils/formateDate";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../navigation/routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SQLStackParamList } from "../../types/navigation";
import { useSQLiteContext } from "expo-sqlite";
import { SQLiteService } from "../../services/sqlite";

interface TodoItemProps {
  item: TTodo;
  onTaskUpdated?: () => void;
}

export const TodoItem = ({ item, onTaskUpdated }: TodoItemProps) => {
  const db = useSQLiteContext();
  const sqliteService = new SQLiteService(db);
  const navigation =
    useNavigation<NativeStackNavigationProp<SQLStackParamList>>();
  const { description, isCompleted, title, createdAt } = item;

  const { localTime, prettyDate } = formatDate(createdAt);

  const onToggleStatus = async (task: TTodo) => {
    try {
      await sqliteService.toggleTaskStatus(task._id, !task.isCompleted);
      onTaskUpdated?.();
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  const onDeleteTap = async (task: TTodo) => {
    try {
      await sqliteService.deleteTask(task._id);
      onTaskUpdated?.();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Checkbox
            style={styles.checkbox}
            color={isCompleted ? "#000000" : undefined}
            value={isCompleted}
            onValueChange={() => onToggleStatus(item)}
          />
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{description}</Text>
          <Text style={styles.date}>
            {localTime} {prettyDate}
          </Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <CustomButton
          buttonText="Edit"
          onPress={() => navigation.navigate(ROUTES.EDIT_SQL, { 
            task: {
              ...item,
              createdAt: item.createdAt.toISOString() 
            },
            onTaskUpdated: onTaskUpdated
          })}
          color="blue"
        />
        <CustomButton
          buttonText="Delete"
          onPress={() => onDeleteTap(item)}
          color="red"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  checkbox: {
    marginRight: 10,
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  desc: {
    fontSize: 10,
  },
  date: {
    fontSize: 10,
  },
});
