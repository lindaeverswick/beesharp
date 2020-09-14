import React, { useState, useEffect} from "react";
import Feed from "../containers/Feed";

const InstrumentDetailSelector = (props) => {
  const [items, setItems] = useState([])
  const { instruments } = props;

  const makes = [...new Set(
    instruments.map(instrument=>instrument.make)
  )]

  const models = [...new Set(
    instruments.map(instrument=>instrument.model)
  )]

  const colors = [...new Set(
    instruments.map(instrument=>instrument.color)
  )]

  const [currentMake, setCurrentMake] = useState(null)
  const [currentModel, setCurrentModel] = useState(null)
  const [currentColor, setCurrentColor] = useState(null)

  const makeClickHandlerFor = (make) => (
    (e) => {
      if (make === currentMake) {
        setCurrentMake(null)
      } else {
        setCurrentMake(make)
      }
    }
  )

  const modelClickHandlerFor = (model) => (
    (e) => {
      if (model === currentModel) {
        setCurrentModel(null)
      } else {
        setCurrentModel(model)
      }
    }
  )

  const colorClickHandlerFor = (color) => (
    (e) => {
      if (color === currentColor) {
        setCurrentColor(null)
      } else {
        setCurrentColor(color)
      }
    }
  )

  useEffect(() => {
    let currentItems = instruments
    if (currentMake) {
      currentItems = currentItems.filter(
        item => item.make === currentMake
      )
    }
    if (currentModel) {
      currentItems = currentItems.filter(
        item => item.model === currentModel
      )
    }
    if (currentColor) {
      currentItems = currentItems.filter(
        item => item.color === currentColor
      )
    }
    setItems(currentItems)
  }, [instruments, currentMake, currentModel, currentColor])
    
  return (
    <div className="subCategories">
      <div className="makeCategories">
        <h4>{makes.length === 0 ? "" : "Make"}</h4>
        <ul className="makeList"> {
          makes.map( (make, index) => (
            <li className="category" key={`make-${index}`}>
              <button
                type="button"
                className="subCategoryButton"
                value={make}
                onClick={makeClickHandlerFor(make)}
              >
               { make === currentMake ? '-' : '+'}
              </button>
              {make}
            </li>
          ))
        } </ul>
      </div>

      <div className="modelCategories">
        <h4>{models.length === 0 ? "" : "Model"}</h4>
        <ul className="modelList">{
          models.map( (model, index) => (
            <li className="category" key={`model-${index}`}>
              <button
                type="button"
                className="subCategoryButton"
                value={model}
                onClick={modelClickHandlerFor(model)}
              >
               { model === currentModel ? '-' : '+'}
              </button>
              {model}
            </li>
          ))
        }</ul>
      </div>

      <div className="colorCategories">
        <h4>{colors.length === 0 ? "" : "Color"}</h4>
        <ul className="colorList">{
          colors.map( (color, index) => (
            <li className="category" key={`color-${index}`}>
              <button
                type="button"
                className="subCategoryButton"
                value={color}
                onClick={colorClickHandlerFor(color)}
              >
                { color === currentColor ? '-' : '+'}
              </button>
              {color}
            </li>
          ))
        }</ul>
      </div>
      <Feed items={items} />
    </div>
  );
};

export default InstrumentDetailSelector;
