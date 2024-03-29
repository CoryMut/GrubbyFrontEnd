import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
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

import LoginGoogle from "../components/LoginGoogle";

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
    tableCell: {
        border: "none",
        margin: "auto",
        padding: 0,
        textAlign: "center",
        width: "100%",
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
    const navigate = useNavigate();
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
                authContext.handleUser(user.username, user.displayName, user.id);
                authContext.setDisplayName(user.displayName);
                authContext.setRecentLogin(true);

                if (destination) {
                    navigate(`/${destination}`);
                    return;
                } else {
                    navigate("/");
                    return;
                }
            } catch (error) {
                console.error(error);

                setError(error);
            }
        },
    });

    useEffect(() => {
        if (authContext.user) {
            navigate(destination ? `/${destination}` : "/", { replace: true });
            return;
        }
    }, [authContext.user, navigate, destination]);

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
                                <Col style={{ fontSize: "12px", textAlign: "center" }}>
                                    By logging in, you agree to our <Link to="/privacy">Privacy Policy</Link>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        onClick={formik.handleSubmit}
                                        className="login-button"
                                    >
                                        Login
                                    </Button>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col>
                                    <LoginGoogle />
                                </Col>
                            </FormGroup>

                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className={classes.tableCellLeft}>Don't have an account?</TableCell>
                                        <TableCell className={classes.tableCellRight}>
                                            <Button component={Link} to="/signup" color="primary">
                                                Signup
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableCellLeft}>Forgot password?</TableCell>
                                        <TableCell className={classes.tableCellRight}>
                                            <Button href="/reset" color="primary">
                                                Reset
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tableCellLeft}>Unverified email?</TableCell>
                                        <TableCell className={classes.tableCellRight}>
                                            <Button href="/resend-email" color="primary">
                                                Resend
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
