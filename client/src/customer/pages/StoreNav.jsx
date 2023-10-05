import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import BeeLine from "../images/beeline.png";

const itemData = [
  {
    img: "https://mui.com/static/images/image-list/breakfast.jpg",
    title: "Store A",
  },
  {
    img: "https://mui.com/static/images/image-list/mushroom.jpg",
    title: "Store B",
  },
  {
    img: "https://mui.com/static/images/image-list/breakfast.jpg",
    title: "Store A",
  },
  {
    img: "https://mui.com/static/images/image-list/mushroom.jpg",
    title: "Store B",
  },
  {
    img: "https://mui.com/static/images/image-list/breakfast.jpg",
    title: "Store A",
  },
  {
    img: "https://mui.com/static/images/image-list/mushroom.jpg",
    title: "Store B",
  },
  {
    img: "https://mui.com/static/images/image-list/breakfast.jpg",
    title: "Store A",
  },
  {
    img: "https://mui.com/static/images/image-list/mushroom.jpg",
    title: "Store B",
  },
  {
    img: "https://mui.com/static/images/image-list/breakfast.jpg",
    title: "Store A",
  },
  {
    img: "https://mui.com/static/images/image-list/mushroom.jpg",
    title: "Store B",
  },
  {
    img: "https://mui.com/static/images/image-list/breakfast.jpg",
    title: "Store A",
  },
  {
    img: "https://mui.com/static/images/image-list/mushroom.jpg",
    title: "Store B",
  },
];

export default function StoreNav() {
  return (
    <div style={{ overflowX: "scroll" }}>
      <Grid
        container
        spacing={2}
        wrap="nowrap"
        justifyContent="flex-start"
        sx={{ maxWidth: "md" }}
      >
        {itemData.map((item, index) => (
          <Grid item key={index}>
            <Card
              sx={{
                minWidth: "150px",
                maxWidth: "500px", // Adjust the maxWidth value as desired
                width: "15vw",
                padding: "10px",
                border: "1px solid #ccc",
                alignItems: "left",
              }}
            >
              <CardActionArea
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.5,
                  }}
                  image={item.img}
                  alt="Card Image"
                />
                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
