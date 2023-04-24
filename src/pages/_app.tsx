import { type AppType } from "next/dist/shared/lib/utils";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import { useEffect } from "react";

const MyApp: AppType = ({ Component, pageProps, router }) => {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
