import { createMedia } from "@artsy/fresnel";

const AppMedia = createMedia({
    breakpoints: {
        mobile: 0,
        tablet: 1024,
        computer: 3840,
    }
});

export const { MediaContextProvider, Media } = AppMedia;
export const mediaStyles = AppMedia.createMediaStyle();