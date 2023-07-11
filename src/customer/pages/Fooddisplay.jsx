import {
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Grid,
} from "@mui/material";

const itemData = [
  {
    img: "https://mui.com/static/images/image-list/breakfast.jpg",
    title: "Breakfast",
    author: "jill111",
  },
  {
    img: "https://mui.com/static/images/image-list/burgers.jpg",
    title: "Tasty burger",
    author: "director90",
  },
  {
    img: "https://mui.com/static/images/image-list/camera.jpg",
    title: "Camera",
    author: "Danson67",
  },
  {
    img: "https://mui.com/static/images/image-list/morning.jpg",
    title: "Morning",
    author: "fancycrave1",
  },
  {
    img: "https://mui.com/static/images/image-list/hats.jpg",
    title: "Hats",
    author: "Hans",
  },
  {
    img: "https://mui.com/static/images/image-list/honey.jpg",
    title: "Honey",
    author: "fancycravel",
  },
  {
    img: "https://mui.com/static/images/image-list/vegetables.jpg",
    title: "Vegetables",
    author: "jill111",
  },
  {
    img: "https://mui.com/static/images/image-list/plant.jpg",
    title: "Water plant",
    author: "BkrmadtyaKarki",
  },
  {
    img: "https://mui.com/static/images/image-list/mushroom.jpg",
    title: "Mushrooms",
    author: "PublicDomainPictures",
  },
];

export default function Fooddisplay() {
  return (
    <Container
      rowSpacing={1}
      columnSpacing={{ xs: 1 }}
      maxWidth="90%"
      height="auto"
      width="auto"
      maxwidth="100vh"
      sx={{ overflow: "auto" }}
    >
      <Grid
        container
        spacing={0}
        style={{ display: "flex", flexWrap: "nowrap" }}
      >
        {itemData.map((item) => (
          <Grid item key={item.img}>
            <ImageListItem>
              <img
                src={item.img}
                alt={item.title}
                style={{ maxwidth: "100vh", height: "15vh" }}
              />
              xs
              <ImageListItemBar title={item.title} />
            </ImageListItem>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
