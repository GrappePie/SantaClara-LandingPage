import { Container, Button } from "semantic-ui-react";
import { search, mapImageResources } from "@/lib/cloudinary";
import { useState } from "react";
import Image from 'next/image'

export default function Ecovillage({ images: defaultImages, nextCursor: defaultNextCursor, folders }) {
  const [images, setImages] = useState(defaultImages)
  const [nextCursor, setNextCursor] = useState(defaultNextCursor)
  async function handleLoadMore(e) {
    //e.preventDefault()
    const results = await fetch("/api/images/search",{
      method: "POST",
      body: JSON.stringify({
        nextCursor
      })
    }).then(r => r.json());
    const { resources, next_cursor: updatedNextCursor } = results
    const images = mapImageResources(resources)

    setImages(prev => {[...prev, ...images]})
    setNextCursor(updatedNextCursor)
  }
  
  return (
    <Container>
        {images.map((image) => (
          <Image
          src={image.url}
          alt=""
          width={image.width}
          height={image.height}
          key={image.id}
          />
        ))}
          {!nextCursor?null:<Button onClick={() => handleLoadMore(nextCursor)}>Load More</Button>}
    </Container>
  );
}

export async function getStaticProps() {
  const result = await search({
    expression: "folder:santaclara/ecovillage/images",
  });
  const { resources, next_cursor: nextCursor } = result
  const images = mapImageResources(resources)
  console.log(images)
  return {
    props: {
      images,
      nextCursor: nextCursor || false,
    },
  };
  
}