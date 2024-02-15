import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react'
import { SafeAreaView, StyleSheet } from "react-native";
import { RootState, useAppDispatch } from '../../redux/store';
import { SignInAction } from '../../redux/actions/UserActions';
import { compositeRootUserTab } from '../../navigations/Types';
import UseTheme from '../../globals/UseTheme';
import { Image } from 'react-native';
import { applogo } from '../../globals/asstes';
import { scaledFont } from '../../globals/utilities';
import { SocketContext } from '../../globals/SocketProvider';
import io from "socket.io-client";
import { updateUnreadCount } from '../../redux/slices/ConversationSlice';
import { fetchUnreadCount } from '../../redux/actions/ConversationActions';
import { useSelector } from 'react-redux';
const SplashScreen = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation<compositeRootUserTab>()
    const { theme, setTheme } = UseTheme()
    const { socket, setSocket } = useContext(SocketContext)
    const signIn = async () => {
        try {
            const email = await AsyncStorage.getItem("email")
            const password = await AsyncStorage.getItem("password")

            if (!email || !password) {
                navigation.navigate("AuthStack")
            }
            else {
                const fullfilled = await dispatch(SignInAction({ email, password }))
                if (SignInAction.fulfilled.match(fullfilled)) {
                    const token = await AsyncStorage.getItem("token")
                    const socket = io('http://localhost:3000', {
                        auth: {
                            token: token
                        }
                    });

                    socket.on('connect', () => {
                        console.log('Connected to Socket.IO server');
                        setSocket(socket)
                    })
                    if (socket) {
                        socket.on("newMessageNotification", ({ senderId,channel }) => {
                        
                            dispatch(updateUnreadCount({
                                senderId: senderId,
                                channel: channel
                            }))
                        })
                    }
                    dispatch(fetchUnreadCount(""))
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "UserTab" }],
                    });
                }
                else {
                    navigation.navigate("AuthStack")
                }
            }
        }
        catch (err) {
            console.log(err)
        }

    }
    const checkTheme = async () => {
        const mode = await AsyncStorage.getItem("theme") as "dark" | "light"
        if (mode)
            setTheme(mode)
    }
    useEffect(() => {
        checkTheme()
        setTimeout(() => {
            signIn()
        }, 2000);
    }, [])
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background_color }]}>
            <Image
                source={applogo}
                tintColor={theme.text_color}
                style={styles.imageLogo}
            />

        </SafeAreaView>
    )
}
export default SplashScreen
const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageLogo:
    {
        height: scaledFont(100),
        width: scaledFont(100)
    }
})
