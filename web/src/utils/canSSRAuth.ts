import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { AuthTokenError } from '../services/errors/AuthTokenError';

export function canSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context);

    const token = cookies['@nextauth.token'];

    if (!token) {
      destroyCookie(context, '@nextauth.token');
      
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    try {
      return await fn(context);
    } catch (error) {
      if (error instanceof AuthTokenError) {
        destroyCookie(context, '@nextauth.token');

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    }
  };
}
