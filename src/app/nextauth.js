import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
    }),
    // Add other providers as needed
  ],
  // Add additional configurations as needed
});
