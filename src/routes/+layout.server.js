// expose user to frontend pages
export function load({ locals }) {
  return { 
    streamed: {
      user: locals.user
    }
  };
};