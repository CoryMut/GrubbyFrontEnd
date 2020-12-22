import React from "react";
import { shallow } from "enzyme";
import SearchBar from "../components/SearchBar";
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
    const wrapper = shallow(<SearchBar />);
    expect(wrapper).toMatchSnapshot();
});

test("it renders without crashing", () => {
    render(
        <MemoryRouter>
            <SearchBar />
        </MemoryRouter>
    );
});
