import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { useForm } from 'react-hook-form';
import { validations } from '@/utils';
import { apuApi } from '@/api';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '@/context/auth/AuthContext';
import { isValidToken } from '@/utils/jwt';
import { useRouter } from 'next/router';


type FormData = {
    email   : string,
    password: string,
  };

const LoginPage = () => {
    const router = useRouter();
    const {loginUser} = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [showError, setShowError] = useState(false);


    const onLogInUser = async ({email, password}: FormData) => {
        setShowError(false);

        const isvalidLogin= await loginUser(email, password);
        if(!isvalidLogin){
            setShowError(true);
            setTimeout(() => setShowError(false), 4000);
            return;
        }

        //Todo: Navegar a la pantalla a la que el usuario estaba
        const destination = router.query.p?.toString() || '/';
        router.replace(destination);

    };

    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={handleSubmit(onLogInUser)} noValidate>
                <Box sx={{ width: 350, padding:'10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Iniciar Sesión</Typography>
                            <Chip
                                label="No conocemos ese usuario/ contraseña"
                                color="error"
                                icon={<ErrorOutline/>}
                                className='fadeIn'
                                sx={{display: showError ? 'flex' : 'none'}}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                type='email'
                                label="Correo" 
                                variant="filled" 
                                fullWidth 
                                {...register('email',{
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Contraseña" 
                                type='password' 
                                variant="filled" 
                                fullWidth 
                                {...register('password',{
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Minimo 6 caracteres'}
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button 
                            type="submit"
                            color="secondary" 
                            className='circular-btn' 
                            size='large' 
                            fullWidth>
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink 
                                href={router.query.p ? `/auth/register?p=${router.query.p}`: '/auth/register' }
                                passHref
                            >
                                {/* <Link underline='always'> */}
                                    ¿No tienes cuenta?
                                {/* </Link> */}
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default LoginPage