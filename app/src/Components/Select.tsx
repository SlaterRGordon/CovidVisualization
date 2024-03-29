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
    { value: 'BC', label: 'British Columbia', color: '#0052CC' },
    { value: 'AB', label: 'Alberta', color: '#5243AA' },
    { value: 'MB', label: 'Manitoba', color: '#5243AA' },
    { value: 'NB', label: 'New Brunswick', color: '#FF8B00' },
    { value: 'NL', label: 'Newfoundland', color: '#FFC400' },
    { value: 'NS', label: 'Nova Scotia', color: '#36B37E' },
    { value: 'NT', label: 'Northwest Territories', color: '#8250C4' },
    { value: 'NU', label: 'Nunavut', color: '#73B761' },
    { value: 'ON', label: 'Ontario', color: '#00B8D9' },
    { value: 'PE', label: 'PEI', color: '#0EB194' },
    { value: 'QC', label: 'Quebec', color: '#FF5630' },
    { value: 'SK', label: 'Saskatchewan', color: '#666666' },
    { value: 'NB', label: 'New Brunswick', color: '#FF8B00' },
    { value: 'YT', label: 'Yukon', color: '#ECC846' },
]

const Select = ({ selected, handleSelectChange }) => {
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
                components={animatedComponents}
                closeMenuOnSelect={false}
                defaultValue={selected[0]}
                isMulti
                options={selectOptions}
                styles={colourStyles}
                onChange={handleSelectChange}
            />
        </Box>
    );
}

export default Select;