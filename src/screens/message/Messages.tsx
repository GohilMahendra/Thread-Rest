import React, { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    BackHandler,
    FlatList,
    ActivityIndicator
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import { getToken, scaledFont } from "../../globals/utilities";
import UseTheme from "../../globals/UseTheme";
import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute
} from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import io, { Socket } from "socket.io-client";
import { white, white_silver } from "../../globals/Colors";
import { RootStackType } from "../../navigations/RootStack";
import axios from "axios";
import { BASE_URL } from "../../globals/constants";
import { Image } from "react-native-elements";
import { launchImageLibrary } from "react-native-image-picker";
import { UploadMedia } from "../../types/Post";
import { Message } from "../../types/Messages";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MessageItem from "../../components/messages/MessageItem";

const { width } = Dimensions.get("screen")
const Messages = () => {
    const { theme } = UseTheme()
    const navigation = useNavigation<NavigationProp<RootStackType, "Messages">>()
    const route = useRoute<RouteProp<RootStackType, "Messages">>()
    const user = route.params.user
    const currentUserId = useSelector((state: RootState) => state.User.user._id)
    const routeChannel = route.params.channel || null
    const [lastOffset, setLastOffset] = useState<string | null>(null)
    const [media, setMedia] = useState<UploadMedia[]>([])
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setloading] = useState<boolean>(false)
    const [sendMessageLoading, setSendMessageLoading] = useState<boolean>(false)
    const [userMessage, setUserMessage] = useState("")
    const socketRef = useRef<Socket | null>(null);
    const [channel, setChannel] = useState<string | null>(routeChannel)
    const listRef = useRef<FlatList | null>(null)
    const renderMessage = (message: Message, index: number) => {
        return (
            <MessageItem
                message={message}
            />
        )
    }

    const initliseSocket = async () => {
        const token = await getToken()
        const socket = io('http://localhost:3000', {
            auth: {
                token: token
            }
        });

        socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
        })
        socket.on('disconnect', () => {
            console.log("Disconnedcted from socket.io")
        })
        socketRef.current = socket;

        socket.on("newMessage", (message) => {
            setMessages(prevMessage => [...prevMessage, message])
            listRef.current?.scrollToEnd({ animated: true })
        })
    }
    const openImagePicker = async () => {
        const response = await launchImageLibrary({
            mediaType: "mixed",
            selectionLimit: 4,
        })

        if (!response.didCancel) {
            if (response.assets) {
                const assets: UploadMedia[] = []
                response.assets.forEach((item) => {
                    const media: UploadMedia = {
                        type: item.type ?? "",
                        name: item.fileName ?? "",
                        uri: item.uri ?? ""
                    }
                    assets.push(media)
                })
                setMedia(assets)
            }
        }
    }
    const getMessages = async () => {
        try {
            setloading(true)
            const token = await getToken()
            let query = `${BASE_URL}messages/${user._id}?pageSize=10`;
            const response = await axios.get(query,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                }
            )
            const data: Message[] = response.data?.data
            if (data) {
                setMessages(data.reverse())
                setLastOffset(response.data.meta.lastOffset)
                setloading(false)
                listRef.current?.scrollToEnd()

            }
        }
        catch (err) {
            setloading(false)
            console.log(err)
        }
    }

    const getMoreMessages = async () => {
        try {
            if (!lastOffset)
                return
            setloading(true)
            const token = await getToken()
            let query = `${BASE_URL}messages/${user._id}?pageSize=10`;

            if (lastOffset) {
                query += `&lastOffset=${lastOffset}`;
            }

            const response = await axios.get(query,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                }
            )
            const data: Message[] = response.data?.data
            if (data) {

                setMessages(prevdata => [...data.reverse(), ...prevdata])
                if (response.data?.meta)
                    setLastOffset(response.data.meta.lastOffset)
                setloading(false)
                listRef.current?.scrollToEnd()
            }
        }
        catch (err) {
            setloading(false)
            console.log(err)
        }
    }

    const onBackPress = async () => {
        socketRef.current?.disconnect()
        navigation.goBack()
    }

    const removeMedia = async (index: number) => {
        let mediaArr = [...media]
        mediaArr.splice(index, 1)
        setMedia(mediaArr)
    }
    const sendMessage = async () => {
        try {
            setSendMessageLoading(true)
            const token = await getToken()
            let formdata = new FormData()
            formdata.append("content", userMessage)

            if (media && media.length > 0) {
                media.forEach((file, index) => {
                    formdata.append("media", file)
                })
            }
            const response = await axios.post(
                `${BASE_URL}messages/${user._id}`,
                formdata,
                {
                    headers: {
                        'Content-Type': "multipart/form-data",
                        'token': token
                    }
                }
            );

            const data = response.data
            setMedia([])
            setUserMessage("")
            setSendMessageLoading(false)

        }
        catch (err) {
            console.log(err)
            setMedia([])
            setUserMessage("")
            setSendMessageLoading(false)
        }
    }

    const readAllMessages = async () => {
        try {
            const token = await getToken()
            const path = `${BASE_URL}messages/${user._id}/read_all`
            console.log(path)
            const response = await axios.patch(path, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            });

            console.log(response.data)
        }
        catch (err: any) {
            console.log(err)
        }
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            socketRef.current?.disconnect()
            return true;
        });

        getMessages()
        readAllMessages()
        initliseSocket()
        return () => {
            socketRef.current?.disconnect()
            backHandler.remove();
        };
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.background_color }}>
            <View style={styles.headerContainer}>
                <FontAwesome
                    onPress={() => onBackPress()}
                    name='angle-left'
                    size={scaledFont(25)}
                    color={theme.text_color}
                />
                <View style={styles.headerProfileContainer}>
                    <Image
                        source={{ uri: user.profile_picture }}
                        style={styles.imgProfileUser}
                    />
                    <View>
                        <Text style={{
                            fontSize: 15,
                            color: theme.text_color,
                            fontWeight: "bold"
                        }}>{user.fullname}</Text>
                        <Text style={{
                            fontSize: 12,
                            color: theme.text_color,
                        }}>{user.username}</Text>
                    </View>

                </View>
                <View />
            </View>
            <FlatList
                ref={ref => listRef.current = ref}
                contentContainerStyle={{
                    paddingBottom: 100
                }}
                style={{
                    flex: 1
                }}
                onScroll={(event) => {
                    const y = event.nativeEvent.contentOffset.y

                    if (y == 0 && lastOffset && !loading) {
                        getMoreMessages()
                    }
                }}
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => renderMessage(item, index)}
            />
            <View style={[styles.sendMessageContainer, {
                backgroundColor: theme.secondary_background_color,
            }]}>
                <View style={{
                    flexDirection: "row"
                }}>
                    {
                        media.map((file, index) => {
                            return (
                                <View
                                    key={file.uri}
                                    style={{
                                        margin: 5,
                                    }}>
                                    <Image
                                        source={{ uri: file.uri }}
                                        style={styles.sendMediaThumb}
                                    />
                                    <Fontisto
                                        onPress={() => removeMedia(index)}
                                        style={styles.closeUpload}
                                        name="close"
                                        color={theme.text_color}
                                        size={scaledFont(20)}
                                    />
                                </View>
                            )
                        })
                    }
                </View>
                <View style={[styles.sendMessageInnerContainer, { borderColor: theme.text_color }]}>
                    <TouchableOpacity
                        onPress={() => openImagePicker()}
                        style={[styles.btnOpenImagePicker, { borderColor: theme.text_color }]}>
                        <Fontisto
                            name="link"
                            color={theme.text_color}
                            size={scaledFont(20)}
                        />
                    </TouchableOpacity>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={userMessage}
                            onChangeText={(text) => setUserMessage(text)}
                            numberOfLines={4}
                            multiline
                            style={{
                                fontSize: scaledFont(12),
                                color: theme.text_color
                            }}
                            placeholderTextColor={theme.text_color}
                            placeholder="send a message ..."
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => !sendMessageLoading && sendMessage()}
                        style={[styles.btnSendMessage, { backgroundColor: theme.primary_color }]}
                    >
                        {sendMessageLoading ?
                            <ActivityIndicator
                                color={white}
                                size={scaledFont(20)}
                                animating
                            />
                            : <FontAwesome
                                name="send"
                                color={white_silver}
                                size={scaledFont(20)}
                            />
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default Messages
const styles = StyleSheet.create({
    headerContainer:
    {
        flexDirection: "row",
        padding: 20,
        paddingVertical: 10,
        alignItems: "center"
    },
    headerProfileContainer:
    {
        marginLeft: scaledFont(20),
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    imgProfileUser:
    {
        height: scaledFont(30),
        marginRight: scaledFont(20),
        width: scaledFont(30),
        borderRadius: scaledFont(30)
    },
    createMessageContainer:
    {
        width: "100%",
    },
    selectedMediaContainer:
    {
        flexDirection: "row",
        marginHorizontal: 20
    },
    selectedThumb:
    {
        height: scaledFont(40),
        width: scaledFont(40),
        borderRadius: scaledFont(15)
    },
    sendMessageContainer:
    {
        position: "absolute",
        bottom: scaledFont(15),
        width: "90%",
        elevation: 5,
        borderRadius: 20,
        alignSelf: 'center',
    },
    sendMediaThumb:
    {
        height: scaledFont(50),
        width: scaledFont(50),
        borderRadius: scaledFont(15)
    },
    closeUpload:
    {
        position: 'absolute',
        right: scaledFont(-5),
        top: scaledFont(-5)
    },
    sendMessageInnerContainer:
    {
        flexDirection: "row",
        borderWidth: 0.2,
        padding: 10,
        alignItems: "center",
        borderRadius: 20,
        justifyContent: "space-between",
    },
    btnOpenImagePicker:
    {
        borderRightWidth: 0.3,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        alignSelf: "flex-end"
    },
    btnSendMessage:
    {
        padding: 10,
        maxHeight: scaledFont(50),
        borderRadius: scaledFont(12),
        alignSelf: "flex-end",
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer:
    {
        flex: 4,
        justifyContent: "flex-start",
        padding: 5
    },

})