//
// Homework 3: MUI Components
// Selector JavaScript source code
//
// Author: Shreya Ashok Kumar
// Version: 1.0
//
import './Selector.css';
import {useEffect, useRef, useState} from "react";
import {Box, TextField, Select, MenuItem} from '@mui/material';

function Selector(props) {
    // These local states represent individual Selector components' weight
    // and scales as the user interacts with them
    const [selectorWeight, setSelectorWeight] = useState(props.currentWeight);
    const [selectorScale, setSelectorScale] = useState(props.currentScale);

    // We want side effects to be based on changes made to the Selector
    // component's weight and scale values
    useEffect(() => {
        setSelectorWeight(props.currentWeight);
        setSelectorScale(props.currentScale);
    }, [props.currentWeight, props.currentScale]);

    return (
        <Box>
            <TextField sx={{
                textAlign : 'right',
                width : '12ch',
                backgroundColor : props.readonly ? '#ffffffCC' : 'white',
            }}
                type="text"
                size="8"
                // We set the value of the Selector textfield to be the 
                // value of the local state selectorWeight
                value={selectorWeight}
                disabled={props.readonly}
                // This handles when the user changes the values in the 
                // editable Selector's textfields
                onChange={weightChange}
            />
            <Select sx={{
                backgroundColor : 'maroon',
                color : 'white',
                width : '14ch',
            }}
                // This handles changes made to the Selector's Select dropdown
                // for both readonly and editable selectors
                onChange={props.readonly? handleReadonlySelect : 
                    handleEditableSelect}
                defaultValue={props.currentWeightScaleIndex}
            >
                {
                    props.weightScales.map((v, i) => (
                        <MenuItem
                        key={i} value={i}>{v}</MenuItem>
                    ))
                }
            </Select>
        </Box>
    );

    // Functionality for the Readonly Selector when the user changes the 
    // Select scale. This function changes the local selectorScale 
    // value according to the event, and calculates the conversion just for 
    // this Selector then updates the array of Selector components in App.js 
    // by calling functions passed down as props. This keeps all Selector 
    // weight and scale values up to date.
    function handleReadonlySelect(e) {
        const newScale = props.weightScales[e.target.value];
        setSelectorScale(newScale);
        console.log(props.activeSelIndex);
        const activeSelWeight = props.selectorWeights[props.activeSelIndex];
        const activeSelScale = props.selectorScales[props.activeSelIndex];
        const newWeight = props.convertWeight(activeSelWeight, activeSelScale, 
            newScale);
        setSelectorWeight(newWeight);
        props.handleReadonlySelectChange(newWeight, newScale);
    }

    // Functionality for performing conversion on all Selectors when the user
    // changes the weight on editable Selector textfields. Changes the local 
    // selectorWeight, and calls the function passed down as props to update
    // the App.js and all other Selectors (performs conversions for them)
    // in this method.
    function weightChange(e) {
        const newWeight = e.target.value;
        setSelectorWeight(newWeight);
        props.handleWeightChange(newWeight);
    }

    // Functionality for the Editable Selector when the user changes the scale.
    // Changes the local selectorScale, and calls the function in App.js passed
    // down as props to perform conversions for all Selectors.
    function handleEditableSelect(e) {
        const newScale = props.weightScales[e.target.value];
        setSelectorScale(newScale);
        props.handleEditableSelectChange(selectorWeight, newScale);
    }
}

export default Selector;
