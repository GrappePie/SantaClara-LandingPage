import "@/styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import { Layout } from "@/components/Layout";
import { Provider } from "react-redux";
import {store} from "@/redux/store";
import SeoHead from "@/components/SeoHead";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
        <SeoHead title='Santa Clara Ecovillage en Mérida | AlmaViva Mexico' />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
