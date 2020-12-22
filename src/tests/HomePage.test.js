import React from "react";
import { shallow } from "enzyme";
import HomePage from "../components/HomePage";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

test("should test NavBar component", () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper).toMatchSnapshot();
});

test("it renders without crashing", () => {
    render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    );
});
