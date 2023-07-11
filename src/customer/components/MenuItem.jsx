import { Accordion, AccordionSummary, Stack, Typography } from "@mui/material";
import DishCard from "./CardItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function MenuItem() {
  return (
    <Accordion defaultExpanded="true">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="Store"
        id="Store"
      >
        <Typography variant="h5">Store</Typography>
      </AccordionSummary>
      <Stack direction={"row"} spacing={2}>
        <DishCard title={"Chicken Rice"} />
        <DishCard title={"Chicken Rice"} />
        <DishCard title={"Chicken Rice"} />
        <DishCard title={"Chicken Rice"} />
      </Stack>
    </Accordion>
  );
}
