import { default as ReactSelect, StylesConfig } from 'react-select'
import makeAnimated from 'react-select/animated';
import chroma from 'chroma-js';
import { Box } from "@mui/system";

export interface SelectOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
}

const selectOptions = [
    { value: 'MonthlyCases', label: 'Cases', color: '#5243AA' },
    { value: 'MonthlyDeaths', label: 'Deaths', color: '#FF5630' },
    { value: 'MonthlyHospitalized', label: 'Hospitalizations', color: '#FF8B00' },
    { value: 'MonthlyICU', label: 'ICU', color: '#36B37E' },
]

const FeatureSelect = ({ selected, handleSelectChange }) => {
    const animatedComponents = makeAnimated();
    const colourStyles: StylesConfig<SelectOption, true> = {
        control: (styles) => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? color.alpha(0.1).css()
                            : undefined,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? chroma.contrast(color, 'white') > 2
                            ? 'white'
                            : 'black'
                        : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color.alpha(0.3).css()
                        : undefined,
                },
            };
        },
        multiValue: (styles, { data }) => {
            const color = chroma(data.color ?? 'black');
            return {
                ...styles,
                backgroundColor: color.alpha(0.1).css(),
            };
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: data.color,
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: data.color,
            ':hover': {
                backgroundColor: data.color,
                color: 'white',
            },
        }),
    };

    return (
        <Box sx={{ width: "80%" }}>
            <ReactSelect
                defaultValue={selected}
                options={selectOptions}
                styles={colourStyles}
                onChange={handleSelectChange}
            />
        </Box>
    );
}

export default FeatureSelect;