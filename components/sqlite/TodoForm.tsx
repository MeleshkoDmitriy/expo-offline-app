import { Alert, StyleSheet, TextInput, View } from "react-native";
import { CustomButton } from "../CustomButton";
import { useState } from "react";
import { TTodo } from "../../types/types";
import { useNavigation } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import { SQLiteService } from "../../services/sqlite";

type TFormValues = Omit<TTodo, "_id" | "createdAt" | "isCompleted">;
type TFormMode = "create" | "edit";

const initialForm: TFormValues = {
  title: "",
  description: "",
};

interface TodoFormProps {
  formValues?: TFormValues;
  mode?: TFormMode;
  existingTask?: TTodo;
  onTaskCreated?: () => void;
  onTaskUpdated?: () => void;
}

export const TodoForm = ({
  formValues,
  mode = "create",
  existingTask,
  onTaskCreated,
  onTaskUpdated,
}: TodoFormProps) => {
  const navigation = useNavigation();
  const [form, setForm] = useState(formValues ?? initialForm);

  const db = useSQLiteContext();
  const sqliteService = new SQLiteService(db);

  const handleOnPress = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      Alert.alert("Provide all fields!");
      return;
    }

    try {
      if (mode === "edit" && existingTask) {
        await sqliteService.updateTask(existingTask._id, form.title, form.description);

        onTaskUpdated?.();
        navigation.goBack();
      } else {
        await sqliteService.createTask(form.title, form.description);
        setForm(initialForm);

        onTaskCreated?.();
      }
    } catch (error) {
      Alert.alert("Error saving task");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your title"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
        value={form.title}
        onChangeText={(text) => setForm({ ...form, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your description"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
        value={form.description}
        onChangeText={(text) => setForm({ ...form, description: text })}
      />
      <CustomButton buttonText="Save" onPress={handleOnPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    gap: 10,
    alignItems: "flex-end",
  },
  input: {
    backgroundColor: "#dadada",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 5,
    width: "100%",
  },
});
