
import { Slider as MuiSlider } from "@mui/material";
import { Box } from "@mui/system";
import { marks } from "../utils/types";

const Slider = ({ handleSliderChange }) => {


    function valuetext(value: number) {
        return `${marks[value]}`;
    }

    return (
        <Box sx={{ width: "80%" }}>
            <MuiSlider
                size="small"
                defaultValue={0}
                min={0}
                max={24}
                valueLabelFormat={valuetext}
                valueLabelDisplay="on"
                onChange={handleSliderChange}
            />
        </Box>
    );
}

export default Slider;