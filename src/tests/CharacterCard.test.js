import React from "react";
import { shallow } from "enzyme";
import CharacterCard from "../components/CharacterCard";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

test("should test NavBar component", () => {
    const wrapper = shallow(<CharacterCard />);
    expect(wrapper).toMatchSnapshot();
});

test("it renders without crashing", () => {
    render(
        <MemoryRouter>
            <CharacterCard />
        </MemoryRouter>
    );
});
