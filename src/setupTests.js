// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import "jest-canvas-mock";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-enzyme";
import "mutationobserver-shim";

global.MutationObserver = window.MutationObserver;

configure({ adapter: new Adapter() });

const noop = () => {};
Object.defineProperty(window, "scrollTo", { value: noop, writable: true });

global.console = {
    log: jest.fn(), // console.log are ignored in tests

    // Keep native behaviour for other methods, use those to print out things in your own tests, not `console.log`
    error: console.error,
    warn: jest.fn(),
    info: console.info,
    debug: console.debug,
};
