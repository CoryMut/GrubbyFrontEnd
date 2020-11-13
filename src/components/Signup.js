import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";

import { registerUser } from "../helpers/GrubbyAPI";

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
}));

const validate = (values) => {
    const errors = {};
    if (!values.username) {
        errors.username = "Required";
    }

    if (!values.password) {
        errors.password = "Required";
    }

    if (!values.email) {
        errors.email = "Required";
    }

    return errors;
};

const Signup = () => {
    // const history = useHistory();
    const classes = useStyles();

    // const dispatch = useDispatch();
    const [error, setError] = useState("");

    // if (window.localStorage.getItem("_token")) {
    //     history.push("/");
    // }

    // function to handle data validation with formik
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            email: "",
        },
        validate,
        onSubmit: async (values) => {
            try {
                await registerUser(values);
                // history.push("/");
            } catch (error) {
                setError("Invalid Credentials");
            }
        },
    });

    return (
        <div className="Login">
            <div className="Login-Container">
                <Card className="Login-Card">
                    <CardBody className="Login-Card-Body">
                        <CardTitle className="Login-Card-Title">Signup</CardTitle>
                        {error && <Alert severity="error">{error}</Alert>}

                        <Form className="LoginForm" onSubmit={formik.handleSubmit}>
                            <FormGroup row>
                                <Label for="username" sm="auto">
                                    Username
                                </Label>
                                <Col sm={12}>
                                    <Input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="username"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.username && formik.errors.username ? (
                                        <div className="error">{formik.errors.username}</div>
                                    ) : null}
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="email" sm="auto">
                                    Email
                                </Label>
                                <Col sm={12}>
                                    <Input
                                        type="email"
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
                                    <Button variant="contained" onClick={formik.handleSubmit}>
                                        Signup
                                    </Button>
                                </Col>
                            </FormGroup>

                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className={classes.tableCellLeft}>Have an account?</TableCell>
                                        <TableCell className={classes.tableCellRight}>
                                            <Button href="/login" color="primary">
                                                Login
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
export default Signup;
