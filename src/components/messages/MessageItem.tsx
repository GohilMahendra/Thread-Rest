import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import { Message } from "../../types/Messages";
import { twitter_blue, white } from "../../globals/Colors";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useTheme from "../../globals/UseTheme";
import MediaGrid from "./MediaGrid";
type MessageProps =
    {
        message: Message
    }

const MessageItem = (props: MessageProps) => {
    const { message } = props
    const currentUserId = useSelector((state: RootState) => state.User.user._id)
    const { theme } = useTheme()
    const isCurrentUser = message.sender == currentUserId
    return (
        <View
            style={[styles.container, {
                alignSelf: !isCurrentUser ?
                    "flex-start" : "flex-end",
                backgroundColor: (isCurrentUser) ? 
                theme.background_color : theme.primary_color,
                borderColor: theme.text_color
            }]}
            key={message._id}>
            <Text style={{
                color: isCurrentUser ? theme.text_color : white,
                justifyContent: "center"
            }}>{message?.content}</Text>
            {
                message?.media &&
                <MediaGrid
                    media={message.media}
                />
            }
        </View>
    )
}
export default MessageItem

const styles = StyleSheet.create({
    container:
    {

        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,

        margin: 10,
        borderBottomLeftRadius:10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        maxWidth: '70%',
        elevation: 10,
        borderWidth: 0.2
    }
})