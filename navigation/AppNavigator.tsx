import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ROUTES } from "./routes";
import { RealmScreen } from "../screens/RealmScreen";
import { SQLScreen } from "../screens/SQLScreen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EditRealmScreen } from "../screens/EditRealmScreen";
import { RealmStackParamList, SQLStackParamList } from "../types/navigation";
import { EditSQLScreen } from "../screens/EditSQLScreen";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { NetInfoIndicator } from "../components/NetInfoIndicator";

const Tab = createBottomTabNavigator();
const RealmStackNavigator = createNativeStackNavigator<RealmStackParamList>();
const SQLStackNavigator = createNativeStackNavigator<SQLStackParamList>();

const RealmStack = () => {
  const { isInternetReachable, type } = useNetworkStatus();

  return (
    <RealmStackNavigator.Navigator
      screenOptions={{
        headerRight: () => (
          <NetInfoIndicator
            isInternetReachable={isInternetReachable}
            type={type}
          />
        ),
      }}
    >
      <RealmStackNavigator.Screen
        name="RealmMain"
        component={RealmScreen}
        options={{ headerBackTitle: "Back" }}
      />
      <RealmStackNavigator.Screen
        name={ROUTES.EDIT_REALM}
        component={EditRealmScreen}
        options={{
          headerTitle: "Edit Realm",
          headerBackTitle: "Back",
          presentation: "modal",
        }}
      />
    </RealmStackNavigator.Navigator>
  );
};

const SQLStack = () => {
  const { isInternetReachable, type } = useNetworkStatus();

  return (
    <SQLStackNavigator.Navigator
      screenOptions={{
        headerRight: () => (
          <NetInfoIndicator isInternetReachable={isInternetReachable} type={type} />
        ),
      }}
    >
      <SQLStackNavigator.Screen
        name="SQLMain"
        component={SQLScreen}
        options={{ headerBackTitle: "Back" }}
      />
      <SQLStackNavigator.Screen
        name={ROUTES.EDIT_SQL}
        component={EditSQLScreen}
        options={{
          headerTitle: "Edit SQL",
          headerBackTitle: "Back",
          presentation: "card",
        }}
      />
    </SQLStackNavigator.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={ROUTES.REALM}
        component={RealmStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "save" : "save-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.SQL}
        component={SQLStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialCommunityIcons
              name={focused ? "database" : "database-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
