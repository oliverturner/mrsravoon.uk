interface Window {
  netlifyIdentity: {
    on: (event: string, cb: (user: {}) => void) => void;
  };
}
