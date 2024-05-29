import createMiddleware from "next-intl/middleware";
import { locales } from "./lib";

export default createMiddleware({
  defaultLocale: "ja",
  locales,
});

export const config = {
  matcher: ["/", "/(ja)/:path*"],
};
