import { Box, Button } from "@mui/material";

// const style = {
//     background:
//         "radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,152,155,1) 0.1%, rgba(0,94,120,1) 94.2% )",
//     p: 2,
//     fontFamily: "Anton",
//     letterSpacing: 1,
//     fontSize: "1.2rem",
//     // textTransform: "uppercase",
//     color: "background.paper"
// };
const CategoryItem = (props) => {
    const { name } = props;

    return (
        <Box>
            <Button
                variant="outlined"
                size="large"
                sx={{
                    letterSpacing: 2,
                    color: "background.paper",
                    textTransform: "none",
                    // fontFamily: "Anton",
                    fontWeight: "200"
                }}
                color="warning"
                href="#"
            >
                {name}
            </Button>
        </Box>
    );
};

export default CategoryItem;
