import { Pressable, StyleSheet, Text } from "react-native";

type TButtonColor = "blue" | "red";

interface CustomButtonProps {
  onPress: () => void;
  buttonText: string;
  color?: TButtonColor;
}

export const CustomButton = ({
  buttonText,
  onPress,
  color = "blue",
}: CustomButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: color === "blue" ? "#0055f2" : "#fc0000" },
      ]}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    textTransform: "uppercase",
  },
});
