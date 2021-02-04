import React, { useState } from "react";
import { Link } from "react-router-dom";
import { resendEmail, resendPassword } from "../helpers/GrubbyAPI";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Col, Form, FormGroup, Label, Input } from "reactstrap";
import { Card, CardBody, CardTitle } from "reactstrap";

import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

import "./Login.css";

const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            backgroundImage: "none",
        },
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

const ResendEmailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
});

const ResendEmailForm = ({ type }) => {
    const classes = useStyles();
    const [error, setError] = useState("");

    const [sentEmail, setSentEmail] = useState(false);
    const [previousEmail, setPreviousEmail] = useState("");

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: ResendEmailSchema,
        onSubmit: async (values) => {
            try {
                if (values.email !== previousEmail) {
                    if (type === "verification") {
                        await resendEmail(values.email);
                    } else if (type === "password") {
                        await resendPassword(values.email);
                    }
                    // await resendEmail(values.email);
                    setPreviousEmail(() => values.email);
                    setSentEmail(() => values.email);
                } else {
                    return;
                }
            } catch (error) {
                setPreviousEmail(() => values.email);
                setError(error);
            }
        },
    });

    if (sentEmail && type === "verification") {
        return (
            <div className={classes.alertWrapper}>
                <Alert severity="success" className={classes.alert}>
                    A verification email was sent to {sentEmail}
                </Alert>
                <Button className={classes.login} to="/" component={Link}>
                    Return Home
                </Button>
            </div>
        );
    }
    if (sentEmail && type === "password") {
        return (
            <div className={classes.alertWrapper}>
                <Alert severity="success" className={classes.alert}>
                    If a user with that email exists, an email was sent with further instructions.
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
                        <CardTitle className="Login-Card-Title">
                            {type === "verification" ? "Resend Email" : "Reset Password"}
                        </CardTitle>
                        {error && <Alert severity="error">{error}</Alert>}
                        <Form className="LoginForm" onSubmit={formik.handleSubmit}>
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
                                <Col>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        onClick={formik.handleSubmit}
                                        className="login-button"
                                        disabled={sentEmail ? true : false}
                                    >
                                        Send
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ResendEmailForm;
