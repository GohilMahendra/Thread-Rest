import {
    TouchableOpacity,
    View,
    Image,
    Text,
    StyleSheet
} from "react-native";
import { scaledFont, timeDifference } from "../../globals/utilities";
import { User } from "../../types/User";
import { Channel } from "../../types/Messages";
import UseTheme from "../../globals/UseTheme";
type ConversationProps =
    {
        onPressChannel: (user: User, channel?: string) => void,
        Conversation: Channel
    }

const ConversationItem = (props: ConversationProps) => {
    const { Conversation } = props
    const { theme } = UseTheme()
    return (
        <TouchableOpacity
            onPress={() => props.onPressChannel(Conversation.member, Conversation._id)}
            key={Conversation._id}>
            <View style={styles.container}>
                <Image
                    source={{ uri: Conversation.member.profile_picture }}
                    style={styles.profile_pic}
                />
                <View style={[styles.userContainer, {
                    borderColor: theme.text_color,
                }]}>
                    <View style={styles.nameContainer}>
                        <Text style={[styles.textFullname, {
                            color: theme.text_color
                        }]}>{Conversation.member.fullname}</Text>
                        <Text style={{
                            fontSize: scaledFont(12),
                            color: theme.text_color
                        }}>{timeDifference(Conversation.updated_at)}</Text>
                    </View>
                    <View style={styles.messageContainer}>
                        <Text
                            numberOfLines={2}
                            style={{
                                fontSize: scaledFont(12),
                                color: theme.text_color,
                                maxWidth: "80%"
                            }}>{Conversation?.lastMessage?.content}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
export default ConversationItem

const styles = StyleSheet.create({
    container:
    {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    profile_pic:
    {
        height: scaledFont(50),
        marginRight: 10,
        width: scaledFont(50),
        borderRadius: scaledFont(50)
    },
    userContainer:
    {
        width: "80%",
        borderBottomWidth: 0.5,
        paddingBottom: 5
    },
    nameContainer:
    {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    textFullname:
    {
        fontSize: scaledFont(15),
        fontWeight: 'bold'
    },
    messageContainer:
    {
        flexDirection: "row",
        justifyContent: "space-between",
    }
})