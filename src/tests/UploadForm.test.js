import React from "react";
import { shallow } from "enzyme";
import UploadForm from "../components/UploadForm";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

test("should test UploadForm component", () => {
    const wrapper = shallow(<UploadForm />);
    expect(wrapper).toMatchSnapshot();
});

test("it renders without crashing", () => {
    render(
        <MemoryRouter>
            <UploadForm />
        </MemoryRouter>
    );
});
