import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import Alert from '@mui/material/Alert';
import * as Yup from 'yup';

import { userService } from 'services';

const Login = () => {
	const router = useRouter();

	useEffect(() => {
		if (userService.userValue) {
			router.push('/');
		}
	}, []);

	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Required'),
		password: Yup.string().required('Password is required')
	});
	const formOptions = { resolver: yupResolver(validationSchema) };

	const { register, handleSubmit, setError, formState } = useForm(formOptions);
	const { errors } = formState;

	const onSubmit = ({ email, password }) => {
		return userService
			.login(email, password)
			.then(() => {
				const returnUrl = router.query.returnUrl || '/';
				router.push(returnUrl);
			})
			.catch((error) => {
				setError('apiError', { message: error });
			});
	};

	return (
		<Card sx={{ maxWidth: 400, m: 'auto' }}>
			<CardContent>
				<Typography variant="h4" component="div">
					Login
				</Typography>
				<Box
					component="form"
					sx={{
						'& .MuiTextField-root': { my: 1, width: '100%' }
					}}
					autoComplete="off"
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextField
						error={errors.email}
						label="Email"
						name="email"
						type="email"
						{...register('email')}
						helperText={errors.email?.message}
						variant="standard"
					/>
					<TextField
						error={errors.password}
						label="Password"
						name="password"
						type="password"
						{...register('password')}
						helperText={errors.password?.message}
						variant="standard"
					/>
					<LoadingButton sx={{ mt: 1 }} loading={formState.isSubmitting} type={'submit'} variant="outlined">
						Login
					</LoadingButton>
					{errors.apiError && <Alert severity="error">{errors.apiError?.message}</Alert>}
				</Box>
			</CardContent>
		</Card>
	);
};

export default Login;
