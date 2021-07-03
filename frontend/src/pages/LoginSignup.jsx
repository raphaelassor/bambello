import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { ReactComponent as LogoRight } from '../assets/img/logos/auth-right-logo.svg'
import { ReactComponent as LogoLeft } from '../assets/img/logos/auth-left-logo.svg'
import { onLogin, onSignup, onGoogleLogin } from '../store/actions/app.actions.js'
import { ReactComponent as LoginSignupLogo } from '../assets/img/logos/login-signup-logo.svg'


export class _LoginSignup extends Component {

    state = {
        userInfo: {
            fullname: '',
            username: '',
            password: '',
            imgUrl: ''
        },
        credentials: {
            username: '',
            password: ''
        },
        pageMode: null
    }

    componentDidMount() {
        const { loggedinUser } = this.props
        if (loggedinUser) this.props.history.push('/workspace')
        const pageMode = this.props.location.pathname === '/login' ? 'login' : 'signup'
        this.setState({ pageMode })
    }

    componentDidUpdate() {
        const { loggedInUser } = this.props
        if (loggedInUser) this.props.history.push('/workspace')
    }

    validate = (values) => {
        const errors = {}
        if (!values.username) {
            errors.username = 'Required'
        } else if (values.username.length < 6) {
            errors.username = 'Please use at least 6 characters'
        }
        if (values.password.length < 4) {
            errors.password = 'Password too short'
        }
        if (!values.fullname) {
            errors.fullname = 'Required'
        } else if (values.fullname.length < 4) {
            errors.fullname = 'Please use at least 4 characters'
        }
        return errors
    }

    onSubmit = (values) => {
        const { pageMode } = this.state
        const { onLogin, onSignup } = this.props
        pageMode === 'login' ? onLogin(values) : onSignup(values)
    }

    onSuccessGoogle = (res) => {
        const { tokenId } = res
        const { onGoogleLogin } = this.props
        onGoogleLogin(tokenId)
    }

    onFailureGoogle = (res) => {
        console.log('Login with google failed', res)
    }


    render() {
        const { pageMode, credentials, userInfo } = this.state
        const { loginErr } = this.props
        if (!pageMode) return ''
        return (<section className="login-signup-container">
            <Link to="/" className="clean-link"><div className="logo flex align-center justify-center">
                <LoginSignupLogo />
                <h1>Bambello</h1>
            </div>
            </Link>
            {pageMode === 'login' && <div className="login-signup flex column">
                <h3>Log in to Bambello</h3>
                <Formik initialValues={credentials} onSubmit={this.onSubmit} >
                    <Form className="flex column">
                        <Field type="username" placeholder="Enter username" name="username" autoFocus />
                        <ErrorMessage name="username" component="div" />
                        <Field type="password" placeholder="Enter password" name="password" />
                        <ErrorMessage name="password" component="div" />
                        {loginErr && <p>{loginErr}</p>}
                        <button type="submit" className="primary-btn login-signup-btn">Log in</button>
                    </Form>
                </Formik>
                <p>OR</p>
                <GoogleLogin
                    className="google-login-btn flex align-center justify-center"
                    clientId='640315421255-e4mv3dirnt2lbm4ati92b1euclri0j8d.apps.googleusercontent.com'
                    buttonText='Continue with Google'
                    onSuccess={this.onSuccessGoogle}
                    onFailure={this.onFailureGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <hr />
                <Link to="/signup">Sign up for an account</Link>
            </div>}
            {pageMode === 'signup' &&
                <div className="login-signup flex column ">
                    <h3>Sign up for your account</h3>
                    <Formik initialValues={userInfo} validateOnChange={false} validateOnBlur={false} validate={this.validate} onSubmit={this.onSubmit}>
                        <Form className="flex column">
                            <Field type="fullname" placeholder="Enter fullname" name="fullname" autoFocus />
                            <ErrorMessage name="fullname" component="p" />
                            <Field type="username" placeholder="Enter username" name="username" />
                            <ErrorMessage name="username" component="p" />
                            <Field type="password" placeholder="Enter password" name="password" />
                            <ErrorMessage name="password" component="p" />
                            <button type="submit" className="primary-btn login-signup-btn">Sign up</button>
                        </Form>
                    </Formik>
                    <hr />
                    <Link to="/login">Already have an account ? Log In</Link>
                </div>}
            <div className="left-logo">
                <LogoLeft />
            </div>
            <div className="right-logo">
                <LogoRight />
            </div>
        </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.appModule.loggedInUser,
        loginErr: state.appModule.loginErr
    }
}


const mapDispatchToProps = {
    onLogin,
    onSignup,
    onGoogleLogin
}

export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)


