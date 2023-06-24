import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Image } from "next/image"

const slider = ({ images }) => {
    return (
        <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} dynamicHeight={true} >
            {images.map((image, index) => (
                <div key={index}>
                    <Image src={image.url} alt=""/>
                </div>
            ))}
        </Carousel>
    );
};

export default slider;