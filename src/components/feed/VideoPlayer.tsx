import React, { useCallback, useRef, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Slider } from "react-native-elements";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Video from "react-native-video";
const { height, width } = Dimensions.get("screen")
type VideoPlayerPropTypes =
    {
        uri: string
    }

const VideoPlayer = (props: VideoPlayerPropTypes) => {
    const uri = props.uri
    const [paused, setPaused] = useState(false)
    const duration = useRef<number>(0)
    const [currentTime, setCurrentTime] = useState(0)
    const videoRef = useRef<Video | null>()
    const setDuration = useCallback((value: number) => {
        duration.current = value;
      }, []);
    
      const togglePause = useCallback(() => {
        setPaused(prevState => !prevState);
      }, []);
    
      const onProgress = useCallback((progress: { currentTime: number }) => {
        setCurrentTime(progress.currentTime);
      }, []);
    
      const onSlidingComplete = useCallback((value: number) => {
        videoRef.current?.seek(value);
      }, []);
    return (
        <GestureHandlerRootView>
        <TouchableOpacity
                onPress={() => togglePause()}
            >
                <Video
                    ref={ref => videoRef.current = ref}
                    repeat
                    onError={(err) => console.log(JSON.stringify(err))}
                    onProgress={(progress) => onProgress(progress)}
                    onLoad={(data) => setDuration(data.duration)}
                    paused={paused}
                    resizeMode="contain"
                    source={{ uri: uri }}
                    style={styles.videoContainer}
                />
                <Slider
                    minimumTrackTintColor="white"
                    maximumTrackTintColor="silver"
                    onSlidingStart={()=>console.log("started")}
                    thumbStyle={styles.slider}
                    value={currentTime}
                    onSlidingComplete={(value) => onSlidingComplete(value)}
                    maximumValue={duration.current}
                    animationType="timing"
                    animateTransitions
                    style={styles.sliderContainer}
                />
                {
                    paused &&
                    <FontAwesome5Icon
                        name="play"
                        style={styles.iconPlay}
                        color={"#D3D3D3"}
                        size={30}
                    />
                }
            </TouchableOpacity>
        </GestureHandlerRootView>
    )
}
export default VideoPlayer
const styles = StyleSheet.create({
    videoContainer:
    {
        height: height,
        width: width,
    },
    slider:
    {
        height: 20,
        width: 20,
        backgroundColor: "white"
    },
    sliderContainer:
    {
        height: 10,
        zIndex: 100000,
        width: width * 90 / 100,
        alignSelf: "center",
        position: "absolute",
        bottom: 50,
    },
    iconPlay:
    {
        position: "absolute",
        top: height / 2 - 20,
        shadowOffset: { height: 6, width: 4 },
        shadowColor: "grey",
        shadowOpacity: 0.8,
        alignSelf: 'center'
    }
})