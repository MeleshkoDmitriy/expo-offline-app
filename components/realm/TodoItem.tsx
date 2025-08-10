import Checkbox from "expo-checkbox";
import { StyleSheet, Text, View } from "react-native";
import { TTodo } from "../../types/types";
import { CustomButton } from "../CustomButton";
import { formatDate } from "../../utils/formateDate";
import { useRealm } from "@realm/react";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../navigation/routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RealmStackParamList } from "../../types/navigation";

interface TodoItemProps {
  item: TTodo;
}

export const TodoItem = ({ item }: TodoItemProps) => {
  const realm = useRealm();
  const navigation =
    useNavigation<NativeStackNavigationProp<RealmStackParamList>>();
  const { description, isCompleted, title, createdAt } = item;

  const { localTime, prettyDate } = formatDate(createdAt);

  const onToggleStatus = (task: TTodo) => {
    realm.write(() => {
      task.isCompleted = !task.isCompleted;
    });
  };

  const onDeleteTap = (task: TTodo) => {
    realm.write(() => {
      realm.delete(task);
    });
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
          onPress={() => navigation.navigate(ROUTES.EDIT_REALM, { task: item })}
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
