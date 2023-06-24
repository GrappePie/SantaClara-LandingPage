import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const slider = ({ images }) => {
    return (
        <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} dynamicHeight={true} >
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image.url} className="image-height" alt=""/>
                </div>
            ))}
        </Carousel>
    );
};

export default slider;