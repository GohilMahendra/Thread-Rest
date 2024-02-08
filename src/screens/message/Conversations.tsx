import axios from "axios";
import { useEffect, useState } from "react"
import { View, Text, SafeAreaView } from "react-native";
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
const Conversations = () => {
    const [channels, setChannels] = useState<Channel[]>([])
    const userId = useSelector((state: RootState) => state.User.user._id)
    const navigation = useNavigation<NavigationProp<RootStackType, "Conversations">>()
    const { theme } = UseTheme()
    const getChannels = async () => {
        try {
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
                    const otherUser = conv.members.find((member: any) => member._id !== userId);
                    conversations.push({
                        _id: conv._id,
                        created_at: conv.created_at,
                        member: otherUser,
                        updated_at: conv.updated_at,
                        lastMessage: conv?.lastMessage,
                        unread_messages: conv?.unread_messages
                    })
                })
                console.log(conversations)
                setChannels(conversations)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getChannels()
    }, [])
    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <View style={{
                flex: 1
            }}>
                <View style={{
                    flexDirection: "row",
                    padding: 20,

                }}>
                    <FontAwesome
                        onPress={() => navigation.goBack()}
                        name='angle-left'
                        size={scaledFont(25)}
                        color={theme.text_color}
                    />
                    <View />
                </View>

                {
                    channels.map((item) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Messages", {
                                    user: item.member,
                                    channel: item._id
                                })}
                                key={item._id}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    padding: 10
                                }}>
                                    <Image
                                        source={{ uri: item.member.profile_picture }}
                                        style={{
                                            height: scaledFont(50),
                                            marginRight: 10,
                                            width: scaledFont(50),
                                            borderRadius: scaledFont(50)
                                        }}
                                    />
                                    <View style={{
                                        width: "80%",
                                        borderBottomWidth: 0.5,
                                        paddingBottom: 5
                                    }}>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start"
                                        }}>
                                            <Text style={{
                                                fontSize: 18,
                                                fontWeight: 'bold'
                                            }}>{item.member.fullname}</Text>
                                            <Text>{timeDifference(item.updated_at)}</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",

                                        }}>
                                            <Text
                                                numberOfLines={2}
                                                style={{
                                                    fontSize: 12,
                                                    maxWidth: "80%"
                                                }}>{item?.lastMessage?.content}</Text>
                                            {
                                                (item.unread_messages && item.unread_messages > 0)
                                                &&
                                                <Badge
                                                    value={10}
                                                />
                                            }
                                        </View>
                                    </View>

                                </View>

                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </SafeAreaView>
    )
}
export default Conversations