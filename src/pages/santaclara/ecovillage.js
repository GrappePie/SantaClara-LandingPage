import { Container, Image, Button, Tab, Embed } from "semantic-ui-react";
import { search, mapImageResources } from "@/lib/cloudinary";
import { useState } from "react";

export default function Ecovillage({
  images: defaultImages,
  videos: defaultVideos,
  nextCursor: defaultNextCursor,
  folders,
}) {
  const [images, setImages] = useState(defaultImages);
  const [videos, setVideos] = useState(defaultVideos);
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
          {videos.map((video) => (
            <Embed 
            key={video.id}
            active url={video.url} 
            autoplay
            iframe={{
              allowFullScreen: true,
            }}
            />
          ))}
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
  const imgResults = await search({
    expression: "folder:santaclara/ecovillage/images",
  });
  const vidResults = await search({
    expression: "folder:santaclara/ecovillage/videos",
  });
  const { resources: imgResources, next_cursor: imgNextCursor } = imgResults;
  const { resources: vidResources, next_cursor: vidNextCursor } = vidResults;
  const images = mapImageResources(imgResources);
  const videos = mapImageResources(vidResources);

  return {
    props: {
      images: images || [],
      videos: videos || [],
      nextCursor: imgNextCursor || false,
    },
  };
}
