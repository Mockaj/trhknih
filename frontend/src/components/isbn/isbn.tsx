import { Accordion, AccordionProps, createStyles } from "@mantine/core";
import { Header } from "../Header/Header";
import { Footer } from "../footer/footer";
import "./isbn.css";
import ISBN from "./assets/ISBN.png";

const useStyles = createStyles((theme, _params, getRef) => ({
  icon: { ref: getRef("icon") },

  control: {
    ref: getRef("control"),
    border: 0,
    opacity: 0.6,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    "&:hover": {
      backgroundColor: "transparent",
      opacity: 1,
    },
  },

  item: {
    borderBottom: 0,
    overflow: "hidden",
    transition: `box-shadow 150ms ${theme.transitionTimingFunction}`,
    border: "1px solid transparent",
    borderRadius: theme.radius.sm,
  },

  itemOpened: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    borderColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[3],

    [`& .${getRef("control")}`]: {
      opacity: 1,
    },

    [`& .${getRef("icon")}`]: {
      transform: "rotate(45deg)",
    },
  },

  content: {
    paddingLeft: 0,
  },
}));

function StyledAccordion(props: AccordionProps) {
  const { classes } = useStyles();
  return <Accordion classNames={classes} {...props} />;
}

export const Isbn = () => {
  return (
    <>
      <Header />
      <main className="accordion-container">
        <h2 className="heading">
          Provide all the book information with one code
        </h2>
        <StyledAccordion initialItem={0}>
          <Accordion.Item label="What is ISBN?">
            ISBN is an abbreviation for International Standard Book Number. It
            is a numeric commercial book identifier that is intended to be
            unique.
          </Accordion.Item>

          <Accordion.Item label="What for do we use ISBN?">
            By providing us with ISBN of your book we are able to find all the
            important data about the item that you own and save your time during
            the process of offering the book online.
          </Accordion.Item>

          <Accordion.Item label="Why would I care to provide ISBN?">
            During the process of posting the book for sale, you will be asked
            to fill out essential information about the book you wish to sell.
            You have two options to choose from. Either you can fill out the
            form manually and fill out all the boxes by hand or you can just
            simply type in ISBN and we will automatically fill the rest for you.
          </Accordion.Item>
          <Accordion.Item label="ISBN example">
            ISBN is a 13-digit number that is usually located above barcode.
            <div className="img-container">
              <img src={ISBN} className="img-container__img" />
            </div>
          </Accordion.Item>
        </StyledAccordion>
      </main>
      <Footer />
    </>
  );
};
