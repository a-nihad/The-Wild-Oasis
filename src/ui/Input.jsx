import { styled } from "styled-components";

function Input() {
  const StyledInput = styled.input`
    padding: 10px;
    border: solid 2px gray; 
    margin: 2px;
  `;

  return <StyledInput type="text" placeholder="Number of Guests" />;
}

export default Input;
