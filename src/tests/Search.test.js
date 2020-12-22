import React from "react";
import { shallow } from "enzyme";
import Search from "../components/Search";
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
    const wrapper = shallow(<Search />);
    expect(wrapper).toMatchSnapshot();
});

test("it renders without crashing", () => {
    render(
        <MemoryRouter>
            <Search />
        </MemoryRouter>
    );
});
