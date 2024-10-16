import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/api';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated()) {
        router.replace('/login');
      }
    }, []);

    if (isAuthenticated()) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;