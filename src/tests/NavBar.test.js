import React from "react";
import { shallow } from "enzyme";
import NavBar from "../components/NavBar";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

test("should test NavBar component", () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper).toMatchSnapshot();
});

test("it renders without crashing", () => {
    render(
        <MemoryRouter>
            <NavBar />
        </MemoryRouter>
    );
});
