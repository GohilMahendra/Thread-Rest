import axios from "axios";
import { useEffect, useState } from "react"
import { View, Text, SafeAreaView, FlatList, RefreshControl, StyleSheet } from "react-native";
import { getToken, scaledFont, timeDifference } from "../../globals/utilities";
import { BASE_URL } from "../../globals/constants";
import { Channel } from "../../types/Messages";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackType } from "../../navigations/RootStack";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import UseTheme from "../../globals/UseTheme";
import { Badge } from "react-native-elements";
import ConversationItem from "../../components/messages/ConversationItem";
import { User } from "../../types/User";
const Conversations = () => {
    const [channels, setChannels] = useState<Channel[]>([])
    const [loading, setloading] = useState<boolean>(false)
    const userId = useSelector((state: RootState) => state.User.user._id)
    const navigation = useNavigation<NavigationProp<RootStackType, "Conversations">>()
    const { theme } = UseTheme()
    const getChannels = async () => {
        try {
            setloading(true)
            const token = await getToken()
            const response = await axios.get(`${BASE_URL}messages`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                }
            )
            if (response.data) {
                const data = response.data.data
                const conversations: Channel[] = []
                data.forEach((conv: any, index: number) => {
                    const otherUser = conv.members.find((member: any) => member.user._id !== userId);
                    const currentUser = conv.members.find((member: any) => member.user._id == userId);
                    conversations.push({
                        _id: conv._id,
                        created_at: conv.created_at,
                        member: otherUser.user,
                        updated_at: conv.updated_at,
                        lastMessage: conv?.lastMessage,
                        unread_messages: currentUser.unread_count
                    })
                })
    
                setChannels(conversations)
                setloading(false)
            }
        }
        catch (err) {
            console.log(err)
            setloading(false)
        }
    }

    const onNavigateMessage = (user: User,channelId?:string) =>
    {
        navigation.navigate("Messages",{
            user: user,
            channel: channelId
        })
    }

    const renderConversations = (item: Channel, index: number) => {
        return (
           <ConversationItem
           onPressChannel={(user:User,channelId?:string)=>onNavigateMessage(user,channelId)}
           Conversation={item}
           key={item._id}
           />
        )
    }
    useEffect(() => {
        getChannels()
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
                        fontWeight:"bold",
                        color: theme.text_color,
                        fontSize: scaledFont(15)
                    }}>Messages</Text>
                    <View />
                </View>

                <FlatList
                    refreshControl={<RefreshControl
                        tintColor={theme.text_color}
                        refreshing={loading}
                        onRefresh={() => getChannels()}
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
        justifyContent:"space-between",
        alignItems:"center"
    },

})