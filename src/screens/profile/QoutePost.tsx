import {
    View, Text, Image, TextInput,
    SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StyleSheet
} from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { placeholder_image } from '../../globals/asstes'
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import UseTheme from '../../globals/UseTheme';
import Loader from '../../components/global/Loader';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackType } from '../../navigations/RootStack';
import PostViewItem from '../../components/profile/PostViewItem';
import { createRepostAction } from '../../redux/actions/UserActions'
import { scaledFont } from '../../globals/utilities'

const QoutePost = () => {

    const route = useRoute<RouteProp<RootStackType, "QoutePost">>()
    const { Thread } = route.params
    const postId = Thread._id
    const navigation = useNavigation<NavigationProp<RootStackType, "CreatePost">>()
    const [content, setContent] = useState<string>("")
    const user = useSelector((state: RootState) => state.User.user)
    const loading = useSelector((state: RootState) => state.User.loading)
    const { theme } = UseTheme()
    const dispatch = useAppDispatch()
    const createPost = async () => {
        const fullfilled = await dispatch(createRepostAction({
            postId: postId,
            content: content
        }))
        if (createRepostAction.fulfilled.match(fullfilled)) {
            navigation.goBack()
        }
    }
    return (
        <SafeAreaView style={[styles.container, {
            backgroundColor: theme.secondary_background_color
        }]}>
            {loading && <Loader />}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.avoidingView}>
                {/* header starts*/}
                <View style={styles.headerContainer}>
                    <AntDesign
                        onPress={() => navigation.goBack()}
                        name='close'
                        size={20}
                        color={theme.text_color}
                    />
                    <Text style={[styles.headerText, { color: theme.text_color }]}>Qoute Post</Text>
                    <TouchableOpacity
                        onPress={() => createPost()}
                        style={[styles.btnPost, {
                            backgroundColor: theme.primary_color,
                        }]}>
                        <Text style={styles.txtPost}>Post</Text>
                    </TouchableOpacity>
                </View>
                {/* header ends */}
                <ScrollView>
                    <View style={styles.userInfoContainer}>
                        <Image
                            resizeMode='cover'
                            source={user.profile_picture ? { uri: user.profile_picture } : placeholder_image}
                            style={styles.imageUser}
                        />
                        <View style={{
                            width: "80%"
                        }}>
                            <View style={[styles.inputContainer]}>
                                <TextInput
                                    value={content}
                                    onChangeText={(text: string) => setContent(text)}
                                    placeholder={"Type the qoute here ..."}
                                    placeholderTextColor={theme.placeholder_color}
                                    multiline={true}
                                    //numberOfLines={5}
                                    style={[styles.inputQoute, { color: theme.text_color }]}
                                />
                                <AntDesign
                                    //  style={{flex:0.2}}
                                    onPress={() => setContent("")}
                                    name='close'
                                    size={15}
                                    color={theme.text_color}
                                />
                            </View>
                        </View>
                    </View>
                    <PostViewItem
                        post={Thread}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default QoutePost
const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    avoidingView:
    {
        flex: 1,
        padding: 10
    },
    headerContainer:
    {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerText:
    {
        fontSize: scaledFont(15),
        textAlign: 'center'
    },
    btnPost:
    {
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    txtPost:
    {
        color: "white",
        fontWeight: "bold"
    },
    userInfoContainer:
    {
        flexDirection: 'row',
        marginVertical: 20,
        alignItems: 'flex-start'
    },
    imageUser:
    {
        height: scaledFont(40),
        width: scaledFont(40),
        borderRadius: scaledFont(40),
        marginRight: 10
    },
    inputContainer:
    {
        padding: 15,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'flex-start',
        // backgroundColor: theme.secondary_background_color,
        // height: 150,
    },
    inputQoute:
    {
        textAlignVertical: "top",
        maxHeight: scaledFont(200),
        flex: 1,
        marginRight: scaledFont(20)
    }
})