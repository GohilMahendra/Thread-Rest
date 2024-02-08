import React, { useEffect, useRef, useState } from "react";
import { Dimensions,ScrollView, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getToken, scaledFont } from "../../globals/utilities";
import UseTheme from "../../globals/UseTheme";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import io from "socket.io-client";
import { twitter_blue } from "../../globals/Colors";
import { RootStackType } from "../../navigations/RootStack";
import axios from "axios";
import { BASE_URL } from "../../globals/constants";
import { Image } from "react-native-elements";
import { launchImageLibrary } from "react-native-image-picker";
import { UploadMedia } from "../../types/Post";
import { Message } from "../../types/Messages";
import GridViewer from "../../components/feed/GridViewer";

const { width } = Dimensions.get("screen")
const Messages = () => {
    const { theme } = UseTheme()
    const navigation = useNavigation<NavigationProp<RootStackType, "Messages">>()
    const route = useRoute<RouteProp<RootStackType, "Messages">>()
    const user = route.params.user
    const routeChannel = route.params.channel || null
    const [media, setMedia] = useState<UploadMedia[]>([])
    const [messages, setMessages] = useState<Message[]>([])
    const [userMessage, setUserMessage] = useState("")
    const socketRef = useRef<any>(null);
    const [channel, setChannel] = useState<string | null>(routeChannel)
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
        socketRef.current = socket;
        socket.emit("joinChannel",channel)

        socket.on("newMessage",(message)=>{
            console.log(JSON.stringify(message))
            setMessages(prevMessage=>[...prevMessage,message])
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
            if(!channel)
            return

            const token = await getToken()
            const response = await axios.get(`${BASE_URL}messages/${channel}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                }
            )
            const data: Message[] = response.data?.data
            if (data) {
                setMessages(data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getMessages()
        initliseSocket()
        return () => {
            socketRef.current.disconnect();
            console.log('Disconnected from Socket.IO server');
        };
    }, []);

    const sendMessage = async (text: string) => {
        try {
            const token = await getToken()
            console.log(token)
            let formdata = new FormData()
            formdata.append("content", text)
            if (channel) {
                formdata.append("channelId", channel)
            }
            formdata.append("recieverId", user._id)

            if (media && media.length > 0) {
                media.forEach((file, index) => {
                    formdata.append("media", file)
                })
            }
            const response = await axios.post(
                `${BASE_URL}messages`,
                formdata,
                {
                    headers: {
                        'Content-Type': "multipart/form-data",
                        'token': token
                    }
                }
            );
        
            const data = response.data

            if(data?.channel)
            {
                setChannel(data?.channel._id)
            }
            setMedia([])
            setUserMessage("")

        }
        catch (err) {
            console.log(err)
            setMedia([])
            setUserMessage("")
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
                <FontAwesome
                    onPress={() => navigation.goBack()}
                    name='angle-left'
                    size={scaledFont(25)}
                    color={theme.text_color}
                />
                <View />
                <View style={{
                    marginLeft: 20,
                    flexDirection: 'row',
                    alignItems: "center"
                }}>
                    <Image
                        source={{ uri: user.profile_picture }}
                        style={{
                            height: 30,
                            marginRight: 20,
                            width: 30,
                            borderRadius: 30
                        }}
                    />
                    <Text style={{
                        fontSize: 15,
                        fontWeight:"bold"
                    }}>{user.fullname}</Text>
                </View>
                <View />
            </View>
            <ScrollView contentContainerStyle={{
                paddingBottom:200
            }}>
            {
                messages.map((message, index) => {
                    return (
                        <View
                            style={{
                                maxWidth: width * 60 / 100,
                                justifyContent: 'center',
                                alignItems: "center",
                                padding: 20,
                                backgroundColor: twitter_blue,
                                margin: 10,
                                borderRadius: 20
                            }}
                            id={index.toString()}>
                            <Text>{message?.content}</Text>
                            {
                                message?.media &&
                                <GridViewer
                                media={message.media}
                                />
                            }
                        </View>

                    )
                })
            }

            </ScrollView>
            <View style={{
                position: "absolute",
                width: "100%",
                bottom: 20
            }}>
                <View style={{
                    flexDirection: "row",
                    marginHorizontal: 20
                }}>
                    {media.map((mediaObj, index) => {
                        return (
                            <View style={{
                                marginRight: 10
                            }}>
                                <Image
                                    source={{ uri: mediaObj.uri }}
                                    style={{
                                        height: 40,
                                        width: 40,
                                        borderRadius: 15
                                    }}
                                />
                            </View>
                        )
                    })}
                </View>
                <View style={{
                    paddingVertical: 5,
                    backgroundColor:"#fff",
                    elevation:10,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <MaterialIcons
                        onPress={() => openImagePicker()}
                        name="add"
                        size={30}
                        color={"black"}
                    />
                    <TextInput
                        value={userMessage}
                        onChangeText={(text) => setUserMessage(text)}
                        placeholder="Type something here.."
                        placeholderTextColor={"grey"}
                        multiline
                        style={{
                            width: "70%",
                            padding: 10,
                            paddingVertical: 20,
                            fontSize: 15,
                            borderRadius: 10
                        }}
                    />

                    <TouchableOpacity
                        onPress={() => sendMessage(userMessage)}
                        style={{
                            padding: 10,
                            justifyContent: 'center',
                            alignItems: "center",
                            backgroundColor: "blue",
                            borderRadius: 10
                        }}>
                        <Text style={{
                            color: "#fff"
                        }}>Send</Text>
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
    }
})