/**
 * @param   {{}}  user
 *
 * @return  {void}
 */
function initNetlifyCMS(user) {
  if (!user) {
    window.netlifyIdentity.on("login", () => {
      document.location.href = "/admin/";
    });
  }
}

if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", initNetlifyCMS);
}
