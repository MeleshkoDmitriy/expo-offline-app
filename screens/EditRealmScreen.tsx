import { StyleSheet, View } from "react-native";
import { ScreenWrapper } from "../components/ScreenWrapper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { TodoForm } from "../components/realm/TodoForm";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RealmStackParamList } from "../types/navigation";

export const EditRealmScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<RealmStackParamList>>();

  const params = route.params as { task: any };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: params.task.title,
    });
  }, []);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
      <TodoForm
        formValues={{
          title: params.task.title,
          description: params.task.description,
        }}
        mode="edit"
        existingTask={params.task}
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
