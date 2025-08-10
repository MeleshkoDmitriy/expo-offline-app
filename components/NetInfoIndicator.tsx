import { StyleSheet, Text, View } from "react-native";

interface NetInfoIndicatorProps {
  isInternetReachable: boolean | null;
  type: string;
}

export const NetInfoIndicator = ({
  isInternetReachable,
  type,
}: NetInfoIndicatorProps) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.dot,
          { backgroundColor: isInternetReachable ? "green" : "red" },
        ]}
      />
      <Text style={styles.text}>{type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 12,
  },
});
