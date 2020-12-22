import React from "react";
import { shallow } from "enzyme";
import Logo from "../components/Logo";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "/",
    }),
}));

test("should test Logo component", () => {
    const wrapper = shallow(<Logo />);
    expect(wrapper).toMatchSnapshot();
});

test("it renders without crashing", () => {
    render(
        <MemoryRouter>
            <Logo />
        </MemoryRouter>
    );
});

test("should test Logo component", () => {
    const scrollToSpy = jest.fn();
    global.scrollTo = scrollToSpy;
    const wrapper = shallow(<Logo />);
    wrapper.find("Link").simulate("click");
    expect(location.pathname).toBe("/");
    expect(scrollToSpy).toHaveBeenCalled();
});
