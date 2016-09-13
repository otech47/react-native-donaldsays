/*
 *  validation functions for reduxForm
 *  must return an 'errors' object with keys matching form fields
 */

function testEmail(email) {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
}

export function validateSignUp(values) {
    const errors = {};

    // email
    if (!values.email) {
        errors.email = 'Required';
    } else if (testEmail(values.email)) {
        errors.email = 'Invalid email address';
    }

    // password
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password !== values.confirm) {
        errors.confirm = 'Passwords must match';
    }

    return errors;
}

export function validateSignIn(values) {
    const errors = {};

    // email
    if (!values.email) {
        errors.email = 'Required';
    } else if (testEmail(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    }

    return errors;
}

export function validateChangePassword(values) {
    const errors = {};
    if (values.newPassword !== values.confirm) {
        errors.confirm = 'Passwords must match';
    }

    return errors;
}