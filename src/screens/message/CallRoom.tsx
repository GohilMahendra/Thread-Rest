import { useContext, useEffect, useRef, useState } from "react";
import { Dimensions, Modal, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { MediaStream, RTCIceCandidate, RTCPeerConnection, RTCView, mediaDevices } from "react-native-webrtc";
import { scaledFont } from "../../globals/utilities";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { white } from "../../globals/Colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackType } from "../../navigations/RootStack";
import { SocketContext } from "../../globals/SocketProvider";
import UseTheme from "../../globals/UseTheme";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { WebRTCContext } from "../../globals/WebRTCProvider";
const { height, width } = Dimensions.get("screen")
type RTCCandidateEventType = Event & { candidate: RTCIceCandidate | null };
const CallRoom = () => {
    const { theme } = UseTheme()
    const navigation = useNavigation<NavigationProp<RootStackType, "CallRoom">>()
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [localMicOn, setlocalMicOn] = useState(true);
    const { socket } = useContext(SocketContext)
    const [localWebcamOn, setlocalWebcamOn] = useState(true);
    // When a call is connected, the video stream from the receiver is appended to this state in the stream
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const call = useSelector((state: RootState) => state.Call)
    const { peerConnection, setPeerConnection } = useContext(WebRTCContext)
    let remoteRTCMessage = useRef(null);

    const onHangUp = async () => {

        peerConnection?.close();
        peerConnection?.restartIce
        if (localStream) {
            localStream.getTracks().forEach(track => {
                track.stop();
            });
        }

        // Reset state variables
        setLocalStream(null);
        setRemoteStream(null);

        socket?.emit("hang-up")
        navigation.goBack()
    }

    const handelIceCandidate = (event: any) => {
        console.log(event)
        if (event.candidate) {
            console.log(event, "Ice candidate found callroom")
            // Emit ICE candidate to other peer over signaling channel
            socket?.emit("ice-candidate", event.candidate);
        }
    }

    const setUpWebRTCConnection = async () => {
        try {
            const stream = await mediaDevices
                .getUserMedia({
                    audio: true,
                    video: {
                        mandatory: {
                            minWidth: 500, // Provide your own width, height and frame rate here
                            minHeight: 300,
                            minFrameRate: 30,
                        },
                        facingMode: 'user'
                    },
                })

            setLocalStream(stream);

            socket?.on('on-ice-candidate', candidate => {
                // Add received ICE candidate to RTCPeerConnection
                peerConnection?.addIceCandidate(candidate)
                    .then(() => {
                        console.log('ICE candidate added successfully');
                    })
                    .catch(error => {
                        console.error('Error adding ICE candidate:', error);
                    });
            });
         //   peerConnection?.addEventListener('icecandidate', handelIceCandidate);

            // Add event listener for remote stream
            peerConnection?.addEventListener('track', (event: any) => {
                // Start the remote stream
                console.log(event, "tracks are coming from backend")
                setRemoteStream(event.streams[0]);
            });
        }
        catch (err) {
            console.log(err, "Error while adding webrtc")
        }

    }

    useEffect(() => {


        socket?.on("call-ended", async () => {
            onHangUp()
        })
        setUpWebRTCConnection()

        return () => {
            peerConnection?.removeEventListener("icecandidate", handelIceCandidate)
            peerConnection?.close();

            if (localStream) {
                localStream.getTracks().forEach(track => {
                    track.stop();
                });
            }

            setLocalStream(null);
            setRemoteStream(null);
            socket?.off("call-ended")
        }

    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {localStream ? (
                <View style={{
                    position: "absolute",
                    height: 200,
                    width: 150,
                    right: 20
                }}>
                    <RTCView
                        objectFit={'cover'}
                        style={{ flex: 1, backgroundColor: '#050A0E' }}
                        streamURL={localStream.toURL()}
                    />
                </View>
            ) : null}
            {remoteStream ? (
                <RTCView
                    objectFit={'cover'}
                    style={{
                        flex: 1,
                        backgroundColor: '#050A0E',
                        marginTop: 8,
                    }}
                    streamURL={remoteStream.toURL()}
                />
            ) : null}
            <View style={{
                position: "absolute",
                bottom: scaledFont(50),
                alignSelf: "center"
            }}>
                <TouchableOpacity
                    onPress={() => onHangUp()}
                    style={{
                        padding: scaledFont(20),
                        backgroundColor: "red",
                        borderRadius: scaledFont(20)
                    }}
                >
                    <MaterialCommunityIcons
                        color={white}
                        size={scaledFont(20)}
                        name="phone-hangup"
                    />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}
export default CallRoom