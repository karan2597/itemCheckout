import React, { useState } from 'react';
import { createGlobalStyle } from "styled-components";
import {Button} from 'reactstrap';
import LazyImage from "./LazyImage";

const Global = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-align: center;
  }
`;

const renderSelectedItemsList = ({selectedList}) => (
   Object.keys(selectedList).map((key) => {
     console.log(selectedList);
    if(selectedList[key]) {
      return(
    <LazyImage
      key={key}
      src={`https://picsum.photos/1000/1000?random=${key}`}
      alt={`Selected image ${key}`}
      />
      )}
   })
);

export default function App() {
  const [selectedList, setSelectedList]= useState({});
  const [nextBtnClicked, setNextBtnClicked] = useState(false);

  const renderNextButton = () => (
    <Button
      color="primary"
      onClick= {() => {
        setSelectedList(selectedList);
        setNextBtnClicked(true)}}
      >
      Next
    </Button>
  );

  return (
    <div className="App">
      <Global />
      <h1>{nextBtnClicked ? 'Selected Images' : 'Images'}</h1>
      {!nextBtnClicked ? renderNextButton(): ''}
      {!nextBtnClicked ? [...Array(50).keys()].map(i => (
          <LazyImage
            key={i}
            iterator1={i}
            src={`https://picsum.photos/1000/1000?random=${i}`}
            alt={`Random image ${i}`}
            selectedList={selectedList}
          />
        )): renderSelectedItemsList({selectedList})}
    </div>
  );
}