import React, {useState} from "react";
import styled, { keyframes } from "styled-components";
import LazyLoad from "react-lazyload";

const ImageWrapper = styled.div`
  position: relative;
  width: auto;
  height: auto;
`;

const loadingAnimation = keyframes`
  0% {
    background-color: #fff;
  }
  50% {
    background-color: #ccc;
  }
  100% {
    background-color: #fff;
  }
`;

const Placeholder = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  animation: ${loadingAnimation} 1s infinite;
`;

const StyledImage = styled.img`
  left: 0;
  width: 200px;
  height: 200px;
  padding-bottom: 20px;
  border: ${props => props.selected === true ? "2px solid red" :"none"}
`;

const LazyImage = ({ iterator1=null, src, alt, selectedList=null }) => {
  const refPlaceholder = React.useRef();
  const [toggleState, setToggleState] = useState(false);

  const removePlaceholder = () => {
    refPlaceholder.current.remove();
  };

  return (
    <ImageWrapper>
      <Placeholder ref={refPlaceholder} />
      <LazyLoad>
        <StyledImage
          onLoad={removePlaceholder}
          onError={removePlaceholder}
          src={src}
          onClick = {()=> {
            if(selectedList) {
            if(!toggleState) {
              selectedList[iterator1] = src;
            } else {
              selectedList[iterator1] = null;
            }
            setToggleState(!toggleState);
          }}}
          alt={alt}
          selected={toggleState}
        />
      </LazyLoad>
    </ImageWrapper>
  );
};

export default LazyImage;