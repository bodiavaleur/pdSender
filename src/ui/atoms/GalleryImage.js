import styled from "styled-components";

export const GalleryImage = styled.div`
  width: 100px;
  height: 100px;
  margin: 10px;
  background: url(${props => props.img});
  background-size: cover;
  border-radius: 10px;

  ${({ selected }) =>
    selected &&
    `
    border: 3px solid rgb(255, 69, 58);
  `}
`;
