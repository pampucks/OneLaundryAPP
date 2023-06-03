import { ActivityIndicator, MD2Colors, Modal, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

const WidgetBaseLoader = ({ complete }) => {
  if (!complete) {
    return (
      <Modal animationType="fade" style={styles.container} visible={!complete}>
        <ActivityIndicator
          size={32}
          animating={true}
          color={MD2Colors.deepOrange50}
        />
        <Text style={{ color: MD2Colors.deepOrange50, paddingVertical: 32 }}>
          Waiting moment...
        </Text>
      </Modal>
    );
  } else {
    return null;
  }
};

export default WidgetBaseLoader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
