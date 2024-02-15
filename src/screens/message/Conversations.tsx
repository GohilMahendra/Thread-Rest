import { useContext, useEffect } from "react"
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    RefreshControl,
    StyleSheet
} from "react-native";
import { scaledFont } from "../../globals/utilities";
import { Channel } from "../../types/Messages";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackType } from "../../navigations/RootStack";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import UseTheme from "../../globals/UseTheme";
import ConversationItem from "../../components/messages/ConversationItem";
import { User } from "../../types/User";
import { SocketContext } from "../../globals/SocketProvider";
import { fetchConversations } from "../../redux/actions/ConversationActions";
import { updateUnreadCount } from "../../redux/slices/ConversationSlice";
const Conversations = () => {
    const channels = useSelector((state: RootState) => state.Conversations.conversations)
    const loading = useSelector((state: RootState) => state.Conversations.loading)
    const navigation = useNavigation<NavigationProp<RootStackType, "Conversations">>()
    const { theme } = UseTheme()
    const { socket } = useContext(SocketContext)
    const dispatch = useAppDispatch()

    const onNavigateMessage = (user: User, channelId?: string) => {
        navigation.navigate("Messages", {
            user: user,
            channel: channelId
        })
    }


    const renderConversations = (item: Channel, index: number) => {
        return (
            <ConversationItem
                onPressChannel={(user: User, channelId?: string) => onNavigateMessage(user, channelId)}
                Conversation={item}
                key={item._id}
            />
        )
    }
    useEffect(() => {
        dispatch(fetchConversations(""))
    }, [])
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: theme.background_color
        }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <FontAwesome
                        onPress={() => navigation.goBack()}
                        name='angle-left'
                        size={scaledFont(25)}
                        color={theme.text_color}
                    />
                    <Text style={{
                        fontWeight: "bold",
                        color: theme.text_color,
                        fontSize: scaledFont(15)
                    }}>Messages</Text>
                    <View />
                </View>

                <FlatList
                    refreshControl={<RefreshControl
                        tintColor={theme.text_color}
                        refreshing={loading}
                        onRefresh={() => dispatch(fetchConversations(""))}
                    />}
                    data={channels}
                    keyExtractor={item => item._id}
                    renderItem={({ item, index }) => renderConversations(item, index)}
                />
            </View>
        </SafeAreaView>
    )
}
export default Conversations

const styles = StyleSheet.create({
    container:
    {
        flex: 1
    },
    header:
    {
        flexDirection: "row",
        padding: 20,
        justifyContent: "space-between",
        alignItems: "center"
    },

})