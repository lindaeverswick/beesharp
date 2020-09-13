import React, { useState, useEffect } from "react";
// import Feed from "../containers/Feed";
import InstrumentDetailSelector from "./InstrumentDetailSelector";

const InstrumentSelectors = () => {
  const [instrumentTypes, setInstrumentTypes] = useState([]);
  const [instruments, setInstruments] = useState([]);

  const setTypesFromInstruments = (instrs) => {
    const categories = [... new Set(instrs.map(
      instrument => instrument.category
    ))]
    setInstrumentTypes(categories)
  }
  useEffect(() => {
    fetch("/api/instruments")
      .then((data) => data.json())
      .then((data) => setInstruments(data.payload));
  }, []);

  useEffect(() => {
    setTypesFromInstruments(instruments)
  }, [instruments])

  const [currentType, setCurrentType] = useState(null);

  const typeClickHandlerFor = (instrumentType) => (
    (e) => {
      if (instrumentType === currentType) {
        setCurrentType(null)
      } else {
        setCurrentType(instrumentType)
      }
    }
  )

  const instrumentsOfType = (instrumentType) => (
    instruments.filter(
      instrument => instrument.category === instrumentType
    )
  )

  return (
    <div className="categories">
        <ul className="instrumentCategories">
          {instrumentTypes.map( (instrumentType, index) => (
            <li className="category" key={`instrument-type-${index}`}>
              <button
                type="button"
                className="categoryButton"
                value={instrumentType}
                onClick={typeClickHandlerFor(instrumentType)}
              >
                { instrumentType === currentType ? '-' : '+'}
              </button>
              {instrumentType}
            </li>
          ))}
        </ul>
        <div>
          <InstrumentDetailSelector
            instruments={
              currentType ? instrumentsOfType(currentType) : []
            }
          />
        </div>
    </div>
  );
};

export default InstrumentSelectors;
 