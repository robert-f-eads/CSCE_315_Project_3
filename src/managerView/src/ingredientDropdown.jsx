import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import product from '../../dataStructures/product';

import '../styles/ingredientDropdown.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

/**
 * @param {*} props data to use in display
 * @returns a dropdown to select different ingredients
 */
export default function IngredientDropdown(props) {
  const {ingredientOptions, setIngredients} = props;
  const theme = useTheme();
  const [name, setName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setName(typeof value === 'string' ? value.split(',') : value)
    setIngredients(value.map(val => {
      for(let i = 0; i < ingredientOptions.length; i++) {
        if(ingredientOptions[i].name === val) {
          return new product(ingredientOptions[i].id, ingredientOptions[i].name);
        }
      }
    }));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={name}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {ingredientOptions.map((ingredientOption) => (
            <MenuItem
              key={ingredientOption.name}
              value={ingredientOption.name}
              style={getStyles(ingredientOption.name, name, theme)}
            >
              {ingredientOption.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}