import React from "react";
import { View ,Image, TouchableOpacity} from "react-native";

type GridViewerPropTypes =
{
    uris : string[],
    onPress:(currentImage:string)=>void
}

const GridViewer = (props: GridViewerPropTypes) =>
{

    const images = props.uris

    return(
        <View style={{
            marginVertical:10,
            maxWidth:"90%"
        }}>
            {
                images.length == 1 ?
                images.map((image)=>(
                    <TouchableOpacity>
                         <Image
                            source={{uri:image}}
                            style={{
                                height:200,
                                width:"100%",
                               borderRadius:15
                            }}
                            />
                    </TouchableOpacity>
                )):
                images.length == 2 ?
                <View style={{
                    flexDirection:'row',
                     maxWidth:"100%",
                     flexWrap:'wrap'
                }}>
                    {
                         images.map((image)=>(
                           <TouchableOpacity
                           key={image}
                           >
                             <Image
                                resizeMode="cover"
                                source={{uri:image}}
                                style={{
                                    height:200,
                                    margin:2,
                                    aspectRatio:1,
                                    borderRadius:15
                                }}
                                />
                           </TouchableOpacity>
                        ))
                    }
                </View>:
                images.length == 3 ?
                <View style={{
                    flexDirection:'row',
                }}>
                   
                </View>:null
            }
        </View>
    )
}
export default GridViewer