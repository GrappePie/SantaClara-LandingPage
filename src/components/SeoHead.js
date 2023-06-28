import Head from "next/head";
import { useRouter } from "next/router";


// Default value for some meta data
const defaultMeta = {
    title: 'Santa Clara Ecovillage en Mérida | AlmaViva Mexico',
    siteName: 'Santa Clara Ecovillage',
    description:
        'Santa Clara Ecovillage desarrollo Vacacional – Residencial en Mérida y acceso ilimitado a un ecoparque de más de 500 hectáreas de area natural.',
    // change base url of your web (without '/' at the end)
    url: 'https://santaclaraecovillage.com.mx',
    type: 'website',
    robots: 'follow, index',
    // change with url of your image (recommended dimension = 1.91:1)
    // used in twitter, facebook, etc. card when link copied in tweet/status
    image: '/thirteen.svg',
    author: 'GrappePie',
    verification: 'M7zVp4uZ17hknwb2opmBSwsb9pEvdt3A4D95P_Lz0_c'
};

/**
 * Next Head component populated with necessary SEO tags and title
 * props field used:
 * - title
 * - siteName
 * - description
 * - url
 * - type
 * - robots
 * - image
 * - date
 * - author
 * - templateTitle
 * all field are optional (default value defined on defaultMeta)
 * @example
 * <SeoHead title="Page's Title" />
 */
const SeoHead = (props) => {
    const router = useRouter();
    const meta = {
        ...defaultMeta,
        ...props
    };

    // Use siteName if there is templateTitle
    // but show full title if there is none
    meta.title = props.templateTitle
        ? `${props.templateTitle} | ${meta.siteName}`
        : meta.title;

    return (
        <Head>
            <title>{meta.title}</title>
            <meta name='robots' content={meta.robots} />
            <meta name='google-site-verification' content={meta.verification} />
            <meta content={meta.description} name='description' />
            <meta property='og:url' content={`${meta.url}${router.asPath}`} />
            <link rel='canonical' href={`${meta.url}${router.asPath}`} />
            {/* Open Graph */}
            <meta property='og:type' content={meta.type} />
            <meta property='og:site_name' content={meta.siteName} />
            <meta property='og:description' content={meta.description} />
            <meta property='og:title' content={meta.title} />
            <meta name='image' property='og:image' content={meta.image} />
            {/* Twitter */}
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:site' content='@F2aldi' />
            <meta name='twitter:title' content={meta.title} />
            <meta name='twitter:description' content={meta.description} />
            <meta name='twitter:image' content={meta.image} />
            {meta.date && (
                <>
                    <meta property='article:published_time' content={meta.date} />
                    <meta
                        name='publish_date'
                        property='og:publish_date'
                        content={meta.date}
                    />
                    <meta
                        name='author'
                        property='article:author'
                        content={meta.author}
                    />
                </>
            )}
            {/* Windows 8 app icon */}
            <meta name='msapplication-TileColor' content='#F53838' />
            <meta
                name='msapplication-TileImage'
                content='/thirteen.svg'
            />
            {/* Accent color on supported browser */}
            <meta name='theme-color' content='#F53838' />
        </Head>
    );
};

export default SeoHead;