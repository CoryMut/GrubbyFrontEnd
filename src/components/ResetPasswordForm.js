import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import { resetPassword } from "../helpers/GrubbyAPI";

import { Col, Form, FormGroup, Label, Input } from "reactstrap";
import { Card, CardBody, CardTitle } from "reactstrap";

import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import "./Login.css";

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            backgroundImage: "none",
        },
    },
    passWrapper: {
        position: "relative",
        display: "flex",
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
        margin: "2vh auto 0 auto",
        "&:hover": {
            backgroundColor: "#645579",
            color: "white",
        },
    },
}));

const ResendEmailSchema = Yup.object().shape({
    new_password: Yup.string()
        .min(7, "Too Short!")
        .max(50, "Too Long!")
        .required("Required")
        .matches(/^\S*$/, "Must not contain spaces."),
    passwordCheck: Yup.string()
        .oneOf([Yup.ref("new_password"), null], "Passwords must match")
        .required("Required"),
});

const ResetPasswordForm = () => {
    const classes = useStyles();
    const [error, setError] = useState("");
    const [visible, setVisible] = useState(false);
    const [success, setSuccess] = useState(false);

    let { id, token } = useParams();

    const toggleVisible = () => {
        setVisible(visible ? false : true);
    };

    const formik = useFormik({
        initialValues: {
            new_password: "",
            passwordCheck: "",
        },
        validationSchema: ResendEmailSchema,
        onSubmit: async (values) => {
            try {
                await resetPassword(id, token, values.new_password);
                setSuccess(() => true);
            } catch (error) {
                setError(error);
            }
        },
    });

    if (success) {
        return (
            <div className={classes.alertWrapper}>
                <Alert severity="success" className={classes.alert}>
                    Password reset successful.
                </Alert>
                <Button className={classes.login} to="/login" component={Link}>
                    Login
                </Button>
            </div>
        );
    }

    return (
        <div className="Login">
            <div className="Login-Container">
                <Card className="Login-Card">
                    <CardBody className="Login-Card-Body">
                        <CardTitle className="Login-Card-Title">Password Reset</CardTitle>
                        {error && <Alert severity="error">{error}</Alert>}

                        <Form className="LoginForm" onSubmit={formik.handleSubmit}>
                            <FormGroup row>
                                <Label for="password" sm="auto">
                                    New Password
                                </Label>
                                <Col sm={12}>
                                    <div className={classes.passWrapper}>
                                        <Input
                                            type={visible ? "text" : "password"}
                                            name="new_password"
                                            id="new_password"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            onBlur={formik.handleBlur}
                                            placeholder="new password"
                                        />
                                        <div className={classes.passText}>
                                            {formik.touched.new_password && formik.errors.new_password ? (
                                                <div className="error">{formik.errors.new_password}</div>
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
                                    Confirm New Password
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
                                        Change Password
                                    </Button>
                                </Col>
                            </FormGroup>

                            {/* <Table>
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
                                </Table> */}
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
