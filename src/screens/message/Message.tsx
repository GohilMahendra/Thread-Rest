import React, { useEffect, useRef, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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
const { width } = Dimensions.get("screen")
const Message = () => {
    const { theme } = UseTheme()
    const navigation = useNavigation<NavigationProp<RootStackType, "Messages">>()
    const route = useRoute<RouteProp<RootStackType, "Messages">>()
    const user = route.params.user
    const [messages, setMessages] = useState<string[]>([])
    const [userMessage, setUserMessage] = useState("")
    const socketRef = useRef<any>(null);
    const initliseSocket = async () => {
        const socket = io("http://localhost:3000");

        socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
        })
        socketRef.current = socket;
        // Handle socket events here
        // For example, you can listen for a custom event named 'newMessage'
        socket.on('newMessage', (msg) => {

            if (msg.content)
                setMessages(prevMessages => [...prevMessages, msg.content]);
            // Update your romponent state or perform any other actions
        });
    }
    const getMessages = async () => {
        try {
            const token = await getToken()
            const response = await axios.get(`${BASE_URL}messages/${user._id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                }
            )
            const data: any[] = response.data?.data
            if (data) {
                let msgs: string[] = []
                data.forEach((msg: any, index: number) => {
                    if (msg.content) {
                        msgs.push(msg.content)
                    }
                });

                setMessages(msgs)
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
            const response = await axios.post(
                `${BASE_URL}messages/${user._id}`,
                { content: text },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                }
            );

        }
        catch (err) {
            console.log(err)
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
                        fontSize:15
                    }}>{user.fullname}</Text>
                </View>
                <View />
            </View>
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
                            <Text>{message}</Text>
                        </View>

                    )
                })
            }

            <View style={{
                position: "absolute",
                width: "100%",
                paddingVertical: 5,
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "space-between",
                bottom: 20
            }}>
                <TextInput
                    value={userMessage}
                    onChangeText={(text) => setUserMessage(text)}
                    multiline
                    style={{
                        width: "70%",
                        borderWidth: 1,
                        padding: 10,
                        fontSize: 15,
                        backgroundColor: "white",
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
        </SafeAreaView>
    )
}
export default Message
const styles = StyleSheet.create({
    headerContainer:
    {
        flexDirection: "row",
        padding: 20,
        paddingVertical: 10,
        alignItems: "center"
    }
})