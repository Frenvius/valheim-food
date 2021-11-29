import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Page404 = () => {
	const router = useRouter();

	useEffect(() => {
		router.replace('/');
	});

	return null;
};

export default Page404;