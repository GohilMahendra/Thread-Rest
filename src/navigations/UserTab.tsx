import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ProfileStack from "./ProfileStack";
import UseTheme from "../globals/UseTheme";
import SearchStack from "./SearchStack";
import HomeStack from "./FeedStack";
import CreatePost from "../screens/home/CreatePost";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackType } from "./RootStack";
import FavoriteStack from "./FavoriteStack";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {  View } from "react-native";

export type UserTabType =
    {
        HomeStack: undefined,
        SearchStack: undefined,
        CreatePost: undefined
        Likes: undefined
        ProfileStack: undefined
    }
const UserTab = () => {
    const UserTabNavigator = createBottomTabNavigator<UserTabType>()
    const navigation = useNavigation<NavigationProp<RootStackType, "UserTab">>()
    const { theme } = UseTheme()
    const unreadCount = useSelector((state: RootState) => state.Conversations.unread_messages)
 
    return (
        <>
            <UserTabNavigator.Navigator
                initialRouteName={"HomeStack"}
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: theme.background_color
                    },
                }}
            >
                <UserTabNavigator.Screen
                    name="HomeStack"
                    component={HomeStack}
                    options={{
                        tabBarIcon: ({ color, focused, size }) => (
                            <MaterialIcons
                                name="home-filled"
                                size={30}
                                color={focused ? theme.text_color : theme.secondary_text_color}
                            />
                        )
                    }}
                />
                <UserTabNavigator.Screen
                    name="SearchStack"
                    component={SearchStack}
                    options={{
                        tabBarIcon: ({ color, focused, size }) => (
                            <AntDesign
                                name="search1"
                                size={25}
                                color={focused ? theme.text_color : theme.secondary_text_color}
                            />
                        )
                    }}
                />

                <UserTabNavigator.Screen
                    name="CreatePost"
                    component={CreatePost}
                    options={{
                        tabBarIcon: ({ color, focused, size }) => (
                            <Ionicons
                                name={(focused) ? "create" : 'create-outline'}
                                size={30}
                                color={focused ? theme.text_color : theme.secondary_text_color}
                            />
                        ),
                    }}
                    listeners={
                        () => ({
                            tabPress: (e) => {
                                e.preventDefault()
                                navigation.navigate("CreatePost")
                            }
                        })
                    }
                />

                <UserTabNavigator.Screen
                    name="Likes"
                    component={FavoriteStack}
                    options={{
                        tabBarIcon: ({ color, focused, size }) => (
                            <AntDesign
                                name={(focused) ? "heart" : "hearto"}
                                size={25}
                                color={focused ? theme.text_color : theme.secondary_text_color}
                            />
                        )
                    }}
                />
                <UserTabNavigator.Screen
                    name="ProfileStack"
                    component={ProfileStack}
                    options={{
                        tabBarIcon: ({ color, focused, size }) => (
                            <View>
                                <FontAwesome5
                                    name={"user"}
                                    size={25}
                                    solid={focused ? true : false}
                                    color={focused ? theme.text_color : theme.secondary_text_color}
                                />

                                {unreadCount > 0 &&
                                    <View
                                        style={{
                                            position: "absolute",
                                            backgroundColor: theme.primary_color,
                                            top: -3,
                                            zIndex: 1000,
                                            width: 5,
                                            borderRadius: 5,
                                            height: 5,
                                            right: -3,
                                        }}
                                    />
                                }
                            </View>
                        )
                    }}
                />
            </UserTabNavigator.Navigator>

        </>

    )
}
export default UserTab