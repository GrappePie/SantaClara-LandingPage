import "@/styles/globals.css";
import "@/styles/ubicaciones.css";
import "semantic-ui-css/semantic.min.css";
import {Layout} from "@/components/Layout";
import {Provider} from "react-redux";
import {store} from "@/redux/store";
import SeoHead from "@/components/SeoHead";
import {DevSupport} from "@react-buddy/ide-toolbox-next";
import {ComponentPreviews, useInitial} from "@/components/dev";

export default function App({Component, pageProps}) {
    return (
        <Provider store={store}>
            <SeoHead title='Santa Clara Ecovillage en Mérida | AlmaViva Mexico'/>
            <Layout>
                <DevSupport ComponentPreviews={ComponentPreviews}
                            useInitialHook={useInitial}
                >
                    <Component {...pageProps} />
                </DevSupport>
            </Layout>
        </Provider>
    );
}
