import { Container, Image, Button, Tab, Embed } from "semantic-ui-react";
import { search, mapImageResources } from "@/lib/cloudinary";
import { useState } from "react";

export default function Ecovillage({
  images: defaultImages,
  nextCursor: defaultNextCursor,
  folders,
}) {
  const [images, setImages] = useState(defaultImages);
  const [nextCursor, setNextCursor] = useState(defaultNextCursor);
  async function handleLoadMore(e) {
    //e.preventDefault()
    const results = await fetch("/api/images/search", {
      method: "POST",
      body: JSON.stringify({
        nextCursor,
      }),
    }).then((r) => r.json());
    const { resources, next_cursor: updatedNextCursor } = results;
    const images = mapImageResources(resources);

    setImages((prev) => {
      [...prev, ...images];
    });
    setNextCursor(updatedNextCursor);
  }

  const panes = [
    {
      menuItem: "Imagenes",
      render: () => (
        <Tab.Pane attached={false}>
          <Image.Group>
            {images.map((image) => (
              <Image key={image.id} src={image.url} />
            ))}
          </Image.Group>
          {!nextCursor ? null : (
            <Button onClick={() => handleLoadMore(nextCursor)}>Load More</Button>
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Videos",
      render: () => (
        <Tab.Pane attached={false}>
          <Embed id="711270116" source="vimeo" active />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Container>
      <Tab menu={{ attached: false }} panes={panes} />
    </Container>
  );
}

export async function getStaticProps() {
  const result = await search({
    expression: "folder:santaclara/ecovillage/images",
  });
  const { resources, next_cursor: nextCursor } = result;
  const images = mapImageResources(resources);

  return {
    props: {
      images,
      nextCursor: nextCursor || false,
    },
  };
}
