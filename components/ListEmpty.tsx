import { StyleSheet, Text, View } from "react-native";

export const ListEmpty = () => (
  <View style={styles.container}>
    <Text style={styles.text}>No tasks</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
});
