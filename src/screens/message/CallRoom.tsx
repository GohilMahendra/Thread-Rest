import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native"
import { MediaStream, RTCPeerConnection, RTCView, mediaDevices } from "react-native-webrtc";

const CallRoom = () => {
    const [localStream, setlocalStream] = useState<MediaStream | null>(null);
    const [localMicOn, setlocalMicOn] = useState(true);

    const [localWebcamOn, setlocalWebcamOn] = useState(true);
    // When a call is connected, the video stream from the receiver is appended to this state in the stream
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    let remoteRTCMessage = useRef(null);
    const peerConnection = useRef(
        new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302',
                },
                {
                    urls: 'stun:stun1.l.google.com:19302',
                },
                {
                    urls: 'stun:stun2.l.google.com:19302',
                },
            ],
        }),
    );

    useEffect(() => {
        mediaDevices
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
            .then(stream => {
                // Got stream!

                setlocalStream(stream);

                // setup stream listening

            })
            .catch(error => {
                // Log error
            });
    }, [])
    return (
        <View style={{flex:1}}>
            <Text>Call Room</Text>
            {localStream ? (
                <RTCView
                    objectFit={'cover'}
                    style={{ flex: 1, backgroundColor: '#050A0E' }}
                    streamURL={localStream.toURL()}
                />
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
        </View>
    )
}
export default CallRoom