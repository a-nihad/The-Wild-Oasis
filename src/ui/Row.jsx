import { styled, css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(param) =>
    param.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(param) =>
    param.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
