import React from "react";
import { shallow } from "enzyme";
import { render } from "@testing-library/react";
import AdminPortal from "../components/AdminPortal";

const UserContext = React.createContext();

test("should test AllComics component", () => {
    const wrapper = shallow(<AdminPortal />);
    expect(wrapper).toMatchSnapshot();
});

test("it renders without crashing", () => {
    render(<AdminPortal />);
});

// test("it renders with user and Admin", () => {
//     render(
//         <UserContext.Provider value={{ user: "Cory", isAdmin: true }}>
//             <AdminPortal />
//         </UserContext.Provider>
//     );
// });
test("it renders with user and Admin", () => {
    const wrapper = shallow(<AdminPortal />);
    wrapper.instance().setIsLoading(false);
    expect("Admin Portal").toBeInTheDocument();
});
