import React from "react";
import { shallow } from "enzyme";
import AllComics from "../components/AllComics";
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

test("should test AllComics component", () => {
    const wrapper = shallow(<AllComics />);
    expect(wrapper).toMatchSnapshot();
});

test("it renders without crashing", () => {
    render(
        <MemoryRouter>
            <AllComics />
        </MemoryRouter>
    );
});
