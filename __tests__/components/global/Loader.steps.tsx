import React from "react";
import { render, screen } from "@testing-library/react-native";
import Loader from "../../../src/components/global/Loader";

describe("Loader component",()=>{
    beforeEach(()=>{
        render(
            <Loader/>
        )
    })

    it("Loads successfully when comes into screen",()=>{
        const loader = screen.getByTestId("loader")
        expect(loader).toBeDefined()
    })
})