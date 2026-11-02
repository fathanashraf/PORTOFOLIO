export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized() {
      return true;
    },
  },
  providers: [],
};
