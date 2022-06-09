import { Container, Group, Text, Title } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { Link } from "react-router-dom";
import "./error.css";

export const Error404 = () => {
  useDocumentTitle("404 - Not Found");
    
  return (
    <Container className="error404">
      <div className="error404__content">
        <Title className="error404__title">Nothing to see here</Title>
        <Text className="error404__description">
          Page you are trying to open does not exist. You may have mistyped the address, or the
          page has been moved to another URL. If you think this is an error contact support.
        </Text>
        <Group position="center">
          <Link to="/">
            <button className="error404__button">Take me back to home page</button>
          </Link>
        </Group>
      </div>
    </Container>
  );
};