import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { BiCart, BiData, BiAddToQueue } from "react-icons/bi";
import Searchfield from "./Seachfield";

const StyledDom = styled.div`
  height: 62px;
`;

const IconOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 96px;

`;

const BiCartStyled = styled(BiCart)`
  width: 36px;
  height: 36px;
  color: black;
`;

const BiDataStyled = styled(BiData)`
  width: 36px;
  height: 36px;
  margin-left: 17px;
  color: black;
`;

const BiAddToQueueStyled = styled(BiAddToQueue)`
  width: 36px;
  height: 36px;
  margin-left: 17px;
  color: black;
`;

export default function Header() {
    const path = useLocation().pathname;

    if (path === "/") {
        return (
            <StyledDom className={["container", "fl-md", "fl-jcsb"]}>
                <div></div>
                <IconOptions>
                    <Link to={"/pantry"}>
                        <BiAddToQueueStyled />
                    </Link>
                </IconOptions>
            </StyledDom>
        );
    }

    if (path === "/pantry") {
        return (
            <StyledDom className={["container", "fl-md", "fl-jcsb"]}>
                <Searchfield />
                <IconOptions>
                    <Link to={"/"}>
                        <BiCartStyled />
                    </Link>

                    <Link to={"/manage"}>
                        <BiDataStyled />
                    </Link>
                </IconOptions>
            </StyledDom>
        );
    }

    if (path === "/manage") {
        return (
            <StyledDom className={["container", "fl-md", "fl-jcsb"]}>
                <Searchfield />
                <IconOptions>
                    <div></div>
                    <Link to={"/pantry"}>
                        <BiAddToQueueStyled />
                    </Link>
                </IconOptions>
            </StyledDom>
        );
    }

    return <></>;
}
