import {Form, Formik} from "formik";
import * as Yup from 'yup';
import {Box, Button, Checkbox, CircularProgress, Container, createTheme, CssBaseline, FormControlLabel, Grid, Link} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import FormTextInput from "./FormTextInput";
import {login} from "../api/userApi";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addUser} from "../../store/slices/userSlice";
import {useNavigate} from "react-router-dom";


const loginValidationSchema = Yup.object().shape(
    {
        name: Yup.string().required(),
        password: Yup.string().required()
    }
);

const defaultTheme = createTheme();

const Login = () => {

    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogin = (values, helpers) => {
        login(values)
            .then(({ data, headers }) => {
                dispatch(
                    addUser({
                        user: data,
                        jwtToken: headers.authorization,
                    })
                );
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setShowError(true);
            })
            .finally(() => helpers.setSubmitting(false));
    };

    return (

        <Formik
            initialValues={ {name: '', password: ''} }

            onSubmit={ onLogin }

            validationSchema={ loginValidationSchema }>

            { props => (
                <ThemeProvider theme={ defaultTheme }>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <Box
                            sx={ {
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            } }
                        >

                            <Box noValidate sx={ {mt: 1} }>
                                <Form>
                                    <FormTextInput error={ props.touched.name && !!props.errors.name }
                                                   name="name"
                                                   label="name"
                                                   fullWidth
                                                   margin="normal"/>
                                    <FormTextInput error={ props.touched.password && !!props.errors.password }
                                                   name="password"
                                                   label="password"
                                                   fullWidth
                                                   margin="normal"
                                                   type="password"/>

                                    <FormControlLabel
                                        control={ <Checkbox value="remember" color="primary"/> }
                                        label="Remember me"
                                    />
                                    {
                                        props.isSubmitting ?
                                            <Box
                                                sx={ {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    mt: 3,
                                                    mb: 2
                                                } }
                                            >
                                                <CircularProgress size={ 36 }/>
                                            </Box> :
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={ {mt: 3, mb: 2} }>
                                                Sign In
                                            </Button>
                                    }

                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href="#" variant="body2">
                                                { "Don't have an account? Sign Up" }
                                            </Link>
                                        </Grid>
                                    </Grid>

                                </Form>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            )
            }
        </Formik>

    );
}

export default Login;
