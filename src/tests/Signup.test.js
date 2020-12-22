import React from "react";
import { shallow } from "enzyme";
import Signup from "../components/Signup";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

jest.mock("react-router-dom", () => ({
    useHistory: () => ({
        push: jest.fn(),
    }),
    useLocation: () => ({
        push: jest.fn(),
    }),
}));

test("should test NavBar component", () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper).toMatchSnapshot();
});

test("it renders without crashing", () => {
    render(
        <MemoryRouter>
            <Signup />
        </MemoryRouter>
    );
});
