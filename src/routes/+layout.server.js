// expose user to frontend pages
export function load({ locals }) {
  // @ts-ignore
  return { 
    streamed: {
      user: locals.user
    }
  };
};