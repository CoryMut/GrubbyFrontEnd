import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
// import { useNavigate, Navigate, Link } from "react-router-dom";
import { Navigate, Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
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

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

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
    passWrapper: {
        position: "relative",
        display: "flex",
        // alignItems: "center",
    },
    passIcon: {
        marginLeft: "30%",
        cursor: "pointer",
    },
    passText: {
        position: "absolute",
        top: "100%",
        width: "100%",
    },
    iconWrapper: {
        display: "flex",
        alignItems: "center",
    },
    alertWrapper: {
        marginTop: "20vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
    },
    alert: {
        margin: "auto",
        maxWidth: "80vw",
    },
    login: {
        color: "white",
        backgroundColor: "#645579",
        // width: "50%",
        margin: "2vh auto 0 auto",
        "&:hover": {
            backgroundColor: "#645579",
            color: "white",
        },
    },
}));

const SignupSchema = Yup.object().shape({
    username: Yup.string().min(2, "Too Short!").max(30, "Too Long!").required("Required"),
    password: Yup.string()
        .min(7, "Too Short!")
        .max(50, "Too Long!")
        .required("Required")
        .matches(/^\S*$/, "Must not contain spaces."),
    passwordCheck: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
});

const Signup = () => {
    // const navigate = useNavigate();
    const classes = useStyles();
    const authContext = useContext(UserContext);
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);

    const [email, setEmail] = useState("");
    // const [verify, setVerify] = useState(false);

    const toggleVisible = () => {
        setVisible(visible ? false : true);
    };

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            passwordCheck: "",
            email: "",
        },
        validationSchema: SignupSchema,
        onSubmit: async (values) => {
            try {
                let data = { username: values.username, password: values.password, email: values.email };
                await registerUser(data);
                setEmail(() => data.email);
            } catch (error) {
                setError(error.message);
            }
        },
    });

    if (authContext.user) {
        return <Navigate to="/"></Navigate>;
    }

    if (email) {
        return (
            <div className={classes.alertWrapper}>
                <Alert severity="success" className={classes.alert}>
                    A verification email was sent to {email}
                </Alert>
                <Button className={classes.login} to="/" component={Link}>
                    Return Home
                </Button>
            </div>
        );
    }

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
                                    <div className={classes.passWrapper}>
                                        <Input
                                            type={visible ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            onBlur={formik.handleBlur}
                                            placeholder="password"
                                        />
                                        <div className={classes.passText}>
                                            {formik.touched.password && formik.errors.password ? (
                                                <div className="error">{formik.errors.password}</div>
                                            ) : null}
                                        </div>
                                        <div className={classes.iconWrapper}>
                                            {visible ? (
                                                <VisibilityIcon
                                                    className={classes.passIcon}
                                                    onClick={toggleVisible}
                                                    title="Hide Password"
                                                ></VisibilityIcon>
                                            ) : (
                                                <VisibilityOffIcon
                                                    className={classes.passIcon}
                                                    onClick={toggleVisible}
                                                    title="Show Password"
                                                ></VisibilityOffIcon>
                                            )}
                                        </div>
                                    </div>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="passwordCheck" sm="auto">
                                    Confirm Password
                                </Label>
                                <Col sm={12}>
                                    <Input
                                        type={visible ? "text" : "password"}
                                        name="passwordCheck"
                                        id="passwordCheck"
                                        onChange={formik.handleChange}
                                        value={formik.values.passwordCheck}
                                        onBlur={formik.handleBlur}
                                        placeholder="confirm password"
                                        style={{ width: "92.9%" }}
                                    />
                                    {formik.touched.passwordCheck && formik.errors.passwordCheck ? (
                                        <div className="error">{formik.errors.passwordCheck}</div>
                                    ) : null}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        onClick={formik.handleSubmit}
                                        className="login-button"
                                    >
                                        Signup
                                    </Button>
                                </Col>
                            </FormGroup>

                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className={classes.tableCellLeft}>Have an account?</TableCell>
                                        <TableCell className={classes.tableCellRight}>
                                            <Button component={Link} to="/login" color="primary">
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
