import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CallSliceType = 
{
    isModalVisible: boolean,
    isCallActive: boolean
    senderId: string,
    senderName: string,
    callType: "audio" | "video" | "none",
    duration: number,
    senderImage: string,
    offer:any
}

type OfferPayload = 
{
    senderId: string,
    senderName: string,
    senderImage: string,
    offer:any
}

type AcceptCallPayload = 
{
    callType: "audio" | "video" | "none",
}

const initalState: CallSliceType =
{
    callType: "none",
    duration:0,
    isCallActive: false,
    isModalVisible: false,
    senderId:"",
    senderName:"",
    senderImage:"",
    offer:null
}

const CallSlice = createSlice({
    initialState: initalState,
    name:"Call",
    reducers:{
        onCallEnd:(state)=>{
            state.callType = "none",
            state.duration = 0,
            state.isCallActive = false,
            state.isModalVisible = false,
            state.senderId = "",
            state.senderName = ""
        },
        onOffer:(state,action:PayloadAction<OfferPayload>)=>{
            state.isModalVisible = true,
            state.senderId =  action.payload.senderId
            state.senderName = action.payload.senderName,
            state.senderImage = action.payload.senderImage,
            state.offer = action.payload.offer
        },
        onCallAccept:(state)=>{
            state.isModalVisible = false
        }
    },
   
})
export const {  onCallEnd,onOffer,onCallAccept } = CallSlice.actions
export default CallSlice.reducer