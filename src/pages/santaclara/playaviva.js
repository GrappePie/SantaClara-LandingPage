import { Container, Image, Button } from "semantic-ui-react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { search, mapImageResources } from "@/lib/cloudinary";
import { useState } from "react";

export default function playaviva({ images: defaultImages, nextCursor: defaultNextCursor, folders }) {
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
      <Image.Group>
        {images.map((image) => (
          <Image key={image.id} src={image.url} />
        ))}
      </Image.Group>
          {!nextCursor?null:<Button onClick={() => handleLoadMore(nextCursor)}>Load More</Button>}
    </Container>
  )
}

export async function getStaticProps() {
  const result = await search({
    expression: "folder:santaclara/playaviva",
  });
  const { resources, next_cursor: nextCursor } = result
  const images = mapImageResources(resources)

  return {
    props: {
      images,
      nextCursor: nextCursor || false,
    },
  };
  
}