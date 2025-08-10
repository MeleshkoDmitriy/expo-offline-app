import { PropsWithChildren } from "react"
import { StatusBar, StyleSheet } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

interface ScreenWrapperProps extends PropsWithChildren {
  children: React.ReactNode
}

export const ScreenWrapper = ({ children }: ScreenWrapperProps) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='default' />
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
})