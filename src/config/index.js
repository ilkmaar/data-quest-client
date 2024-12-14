export const CLIENT_APP_DOMAIN =
  process.env.VUE_APP_CLIENT_APP_DOMAIN || ".ilkmaar.com";

export const CLIENT_APP_URL =
  process.env.VUE_APP_CLIENT_APP_URL || "https://ilkmaar.com";
export const CLIENT_CALLBACK_URL = `${CLIENT_APP_URL}/auth/callback`;

export const SERVER_URL = process.env.VUE_APP_SERVER_URL;
export const SERVER_CALLBACK_URL = `${SERVER_URL}/auth/callback`;

export const LOGOUT_URL = `${SERVER_URL}/auth/logout`;

export const GRAPHQL_URL = `${SERVER_URL}/graphql`;

export const FV_GAME_URL =
  "https://isles-of-ilkmaar.fablevision-dev.com/launch";

export const BACKGROUND_IMAGE_URL = "images/ILKMAAR_COVER_IMAGE.png";

export const PLACEHOLDER_AVATAR_URL = "images/logo.svg";

export const FOOTER_LOGO_URL = "icons/discord-logo.svg";

export const FV_JWT_KEY = process.env.VUE_APP_FV_JWT_KEY;

export const USE_TOKENS = false;
