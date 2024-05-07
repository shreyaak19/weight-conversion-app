//
// Homework 3: MUI Components
// App JavaScript source code
//
// Author: Shreya Ashok Kumar
// Version: 1.0
//
import './App.css';
import Header from './Header';
import Selector from "./Selector";
import { useState } from "react";
import Container from '@mui/material/Container';
import configuration from './hw3.json'

function App() {
    // Local state variables for the weights and scales for all the 
    // Selector components
    const [selectorWeights, setSelectorWeights] = useState(
      configuration.selectors.map(selector => convertWeight(configuration.value, 
        "Pounds", selector.weightScales[selector.currentWeightScaleIndex]))
    );
    const [selectorScales, setSelectorScales] = useState(
      configuration.selectors.map(selector => selector.weightScales
        [selector.currentWeightScaleIndex]));
    // Local state variable for keeping track of either of the editable 
    // Selector's index in the array so that readonly Selectors can be correctly
    // converted
    const [activeSelIndex, setActiveSelIndex] = useState(configuration.selectors.
      findIndex((selector) => !selector.readonly));

  return (
    <Container className="App" maxWidth={false} sx={{
      backgroundColor : 'orange',
      color : 'maroon',
    }}>
      <Header text={configuration.header} />
        {
          configuration.selectors.map( (selector, i) => (
              <Selector
                  key={i}  // Required by React.
                  selectorWeights={selectorWeights} // All Selector weights
                  selectorScales={selectorScales} // All Selector scales
                  currentWeight={selectorWeights[i]} //The current weight value.
                  currentScale={selectorScales[i]} //The scale for weight value.
                  activeSelIndex={activeSelIndex}
                  readonly={selector.readonly} // The Selector edit capability.
                  // The array of values for weight scales options.
                  weightScales={selector.weightScales}
                   // The initially selected weight scale index.
                  currentWeightScaleIndex={selector.currentWeightScaleIndex}
                  // convertWeight function passed down as props
                  convertWeight={convertWeight}
                  // handleWeightChange function passed down as props along with
                  // the key index
                  handleWeightChange={weight => handleWeightChange(weight, i)}
                  // handleEditableSelectChange function passed down as props
                  // along with the key index
                  handleEditableSelectChange={(weight, newScale) => 
                    handleEditableSelectChange(weight, newScale, i)}
                  // handleReadonlySelectChange function passed down as props
                  // along with the key index
                  handleReadonlySelectChange={(newWeight, newScale) => 
                    handleReadonlySelectChange(newWeight, newScale, i)}
              />
          ))
        }
    </Container>
  );

  // Function that updates the changed readonly Selector's new scale and
  // respective new weight in the local state.
  function handleReadonlySelectChange(newWeight, newScale, i) {
    const newSelectorScales = [...selectorScales];
    newSelectorScales[i] = newScale;
    setSelectorScales(newSelectorScales);
    const newSelectorWeights = [...selectorWeights];
    newSelectorWeights[i] = newWeight;
    setSelectorWeights(newSelectorWeights);
  }

  // Function that updates the changed editable Selector's new scale, and
  // performs conversions for all other Selectors accordingly
  function handleEditableSelectChange(weight, newScale, i) {
    const newSelectorScales = [...selectorScales];
    newSelectorScales[i] = newScale;
    setSelectorScales(newSelectorScales);
    const newSelectorWeights = [];
    for (let j = 0; j < selectorWeights.length; j++) {
      const newWeight = convertWeight(weight, newScale, newSelectorScales[j])
      if (i != j) {
        newSelectorWeights[j] = newWeight;
      }
      else {
        newSelectorWeights[j] = weight;
      }
    }
    setSelectorWeights(newSelectorWeights);
  }

  // Function that updates the changed Selector's textfield weight, and
  // performs weight conversion for all other Selectors accordingly
  function handleWeightChange(weight, i) {
    const newSelectorWeights = [...selectorWeights];
    for (let j = 0; j < selectorWeights.length; j++) {
      const newWeight = convertWeight(weight, selectorScales[i], 
        selectorScales[j])
      if (i != j) {
        newSelectorWeights[j] = newWeight;
      }
      else {
        newSelectorWeights[j] = weight;
      }
    }
    setSelectorWeights(newSelectorWeights);
  }

  // Function to perform the weight conversion
  function convertWeight(weight, from, to) {
    let factor = {
      Pounds: { Pounds: 1, Ounces: 16, Kilograms: 0.457, Grams: 457},
      Ounces: { Pounds: 1/16, Ounces: 1, Kilograms: 0.457/16, Grams: 457/16},
      Kilograms: { Pounds: 1/0.457, Ounces: 16/0.457, Kilograms: 1, Grams: 1000},
      Grams: { Pounds: 1/457, Ounces: 16/457, Kilograms: 1/1000, Grams: 1}
    }
    let newWeight = undefined;
    if (weight === "") {
      newWeight = weight;
    }
    else if (isNaN(weight)) {
      newWeight = "Error!";
    }
    else {
      newWeight = Number(factor[from][to] * weight).toFixed(3).toString();
    }
    return newWeight;
  }
}

export default App;