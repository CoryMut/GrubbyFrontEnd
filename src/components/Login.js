import React, { useState, useContext } from "react";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { useFormik } from "formik";
import { UserContext } from "./UserContext";

import { loginUser } from "../helpers/GrubbyAPI";

import { Col, Form, FormGroup, Label, Input } from "reactstrap";
import { Card, CardBody, CardTitle } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import "./Login.css";

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            backgroundImage: "none",
        },
    },
    tableCellLeft: {
        border: "none",
        margin: 0,
        padding: 0,
        textAlign: "left",
    },
    tableCellRight: {
        border: "none",
        margin: 0,
        padding: 0,
        textAlign: "right",
    },
    title: {
        textAlign: "center",
    },
}));

const validate = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = "Required";
    }

    if (!values.password) {
        errors.password = "Required";
    }

    return errors;
};

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Login = () => {
    const authContext = useContext(UserContext);
    const query = useQuery();
    const destination = query.get("d");
    const history = useHistory();
    const classes = useStyles();
    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate,
        onSubmit: async (values) => {
            try {
                let { token, user } = await loginUser(values);
                authContext.login(token);
                authContext.handleAdmin(user.is_admin);
                authContext.handleUser(user.username);
                authContext.setRecentLogin(true);

                if (destination) {
                    history.push(`/${destination}`);
                } else {
                    history.push("/");
                }
            } catch (error) {
                console.log(error);
                setError("Invalid Credentials");
            }
        },
    });

    if (authContext.user) {
        return <Redirect to="/"></Redirect>;
    }

    return (
        <div className="Login">
            <div className="Login-Container">
                <Card className="Login-Card">
                    <CardBody className="Login-Card-Body">
                        <CardTitle className="Login-Card-Title">Login</CardTitle>
                        {error && <Alert severity="error">{error}</Alert>}

                        <Form className="LoginForm" onSubmit={formik.handleSubmit}>
                            <FormGroup row>
                                <Label for="email" sm="auto">
                                    Email
                                </Label>
                                <Col sm={12}>
                                    <Input
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="error">{formik.errors.email}</div>
                                    ) : null}
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="password" sm="auto">
                                    Password
                                </Label>
                                <Col sm={12}>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        onBlur={formik.handleBlur}
                                        placeholder="password"
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="error">{formik.errors.password}</div>
                                    ) : null}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col>
                                    <Button type="submit" variant="contained" onClick={formik.handleSubmit}>
                                        Login
                                    </Button>
                                </Col>
                            </FormGroup>

                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className={classes.tableCellLeft}>Don't have an account?</TableCell>
                                        <TableCell className={classes.tableCellRight}>
                                            <Button href="/signup" color="primary">
                                                Signup
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableCellLeft}>Forgot Password?</TableCell>
                                        <TableCell className={classes.tableCellRight}>
                                            <Button href="/reset" color="primary">
                                                Reset
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};
export default Login;
