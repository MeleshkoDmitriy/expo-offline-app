import { Alert, StyleSheet, TextInput, View } from "react-native";
import { CustomButton } from "../CustomButton";
import { useRealm } from "@realm/react";
import { useState } from "react";
import { TTodo } from "../../types/types";
import { Task } from "../../services/task";
import { useNavigation } from "@react-navigation/native";

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
}

export const TodoForm = ({
  formValues,
  mode = "create",
  existingTask,
}: TodoFormProps) => {
  const navigation = useNavigation();
  const [form, setForm] = useState(formValues ?? initialForm);
  const realm = useRealm();

  const handleOnPress = () => {
    if (!form.title.trim() || !form.description.trim()) {
      Alert.alert("Provide all fields!");
      return;
    }

    realm.write(() => {
      if (mode === "edit" && existingTask) {
        existingTask.title = form.title;
        existingTask.description = form.description;
        
        navigation.goBack();
      } else {
        const newTask = new Task(realm, form.title, form.description);
        setForm(initialForm);

        return newTask;
      }
    });
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
