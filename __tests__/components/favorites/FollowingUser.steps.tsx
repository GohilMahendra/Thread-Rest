import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import FollowingUser from "../../../src/components/favorites/FollowingUser";
import store, { AppDispatch, RootState } from "../../../src/redux/store";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
describe("Following User component", () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <FollowingUser
                    onPress={jest.fn()}
                    user={{
                        _id: "fake_id",
                        email: "fakeEmail@gmail.com",
                        followers: 0,
                        following: 0,
                        fullname: "fake name",
                        isFollowed: false,
                        username: "mockkname",
                        verified: true,
                        bio: "my bio ...",
                        profile_picture: "profile url"
                    }}
                />
            </Provider>
        )
    })

    it("I can go to next screen on press navigate to user", () => {
        const btn_user = screen.getByTestId("btn_navigateToUser")
        fireEvent(btn_user, "press")
    })
})

