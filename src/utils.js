const PATCHES = {
  MAIN: "/",
  LOGIN: "/login",
  INFO: "/info",
  PROFILE: "/profile",
  TABLE: "/table"
}

const getCookie = (name) => {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export {PATCHES, getCookie};
