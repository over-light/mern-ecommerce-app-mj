import { styled } from "@mui/material/styles";
type HeadingProps = {
    title:string
};

const Title = styled("h1")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
}));
export const Heading: React.FC<HeadingProps> = ({title}) => {
  return <Title>{title}</Title>;
};
