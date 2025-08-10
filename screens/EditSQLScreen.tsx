import { StyleSheet, View } from "react-native";
import { ScreenWrapper } from "../components/ScreenWrapper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { TodoForm } from "../components/sqlite/TodoForm";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SQLStackParamList } from "../types/navigation";

interface EditSQLScreenProps {
  onTaskUpdated?: () => void;
}

export const EditSQLScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<SQLStackParamList>>();

  const params = route.params as { task: any; onTaskUpdated?: () => void };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: params.task.title,
    });
  }, []);

  const taskWithDate = {
    ...params.task,
    createdAt: new Date(params.task.createdAt)
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <TodoForm
          formValues={{
            title: params.task.title,
            description: params.task.description,
          }}
          mode="edit"
          existingTask={taskWithDate}
          onTaskUpdated={params.onTaskUpdated}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
});