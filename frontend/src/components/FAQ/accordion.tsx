import { Accordion, AccordionProps, createStyles } from "@mantine/core";
import ISBN from "./assets/ISBN.png";
import { Link } from "react-router-dom";
import "./styles/accordion.css";
import { useAuth0 } from "@auth0/auth0-react";

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

export function StyledAccordion(props: AccordionProps) {
  const { classes } = useStyles();
  return <Accordion classNames={classes} {...props} iconPosition="right" />;
}
export const accordion = (questions: string, setQuestions: any) => {
  const { loginWithRedirect } = useAuth0();
  switch (questions) {
    case "faq":
      return (
        <StyledAccordion initialItem={1}>
          <Accordion.Item label="Why use Readee?">
            We take 0% commission from the sales you make. Simply offer a book,
            pick your price and wait for an applicant.
          </Accordion.Item>

          <Accordion.Item label="Why sell books?">
            However library full of books might make your apartment really cosy
            that is all there is in it for you. Some of the books are a one time
            read, so why don't you get some additional value out of them by
            passing them to someone else while receiving funds for further
            reading. Check out what{" "}
            <Link to="/categories" className="accordion-links">
              others offer
            </Link>
            .
          </Accordion.Item>

          <Accordion.Item label="How are 0% commissions sustainable for this project?">
            As we mentioned in above question we take 0% commissions on all the
            sales. Meaning you don't share the money you get from the sales with
            us. How does this project make money then? It doesn't and that is
            okay. Developers are billionaires who don't care about money
            anyways😎
          </Accordion.Item>
          <Accordion.Item label="How can I support this project?">
            If you wish to support this project the best way to do it is to
            spread the word around about Readee and get more people into reading
            that way.
          </Accordion.Item>
        </StyledAccordion>
      );
    case "isbn":
      return (
        <StyledAccordion initialItem={1}>
          <Accordion.Item label="What for do we use ISBN?">
            By providing us with ISBN of your book we are able to find all the
            important data about the item that you own and save your time during
            the process of offering the book online.
          </Accordion.Item>
          <Accordion.Item label="What is ISBN?">
            ISBN is an abbreviation for International Standard Book Number. It
            is a numeric commercial book identifier that is intended to be
            unique.
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
      );
    case "sell":
      return (
        <StyledAccordion initialItem={1}>
          <Accordion.Item label="Log in">
            To be able to sell a book you have to be logged in. If you are not logged in (there is a "Log in" button in the top menu)
            click on the "Log in" button (or click
            <span onClick={() => loginWithRedirect()} className="accordion-links"> here</span>) 
            and fill out the username/email and password or register to our page if you don't have an account.
          </Accordion.Item>

          <Accordion.Item label="Take a picture of the book">
            Take anything from 1 up to 5 pictures of the book you wish to sell.
            For safety reason, when selling a book more expensive than 50$, a
            picture containig ISBN of a book is required. That way we can verify
            that you are the owner of the book.
          </Accordion.Item>

          <Accordion.Item label="Fill out the form">
            Go to sell books [<Link to="/sell-a-book" className="accordion-links">sell books</Link>] page and fill out
            the form. You can choose from two variants. Either you provide the
            book info manually (not recommended as there is high chance you make
            a mistake and confuse future customer) or provide{" "}
            <div className="tooltip">
              ISBN
              <span className="tooltiptext">
                Don't know what ISBN is? Find out more{" "}
                <span
                  className="accordion-links"
                  onClick={() => setQuestions("isbn")}
                >
                  here
                </span>{" "}
              </span>
            </div>
            &nbsp;and let us fill all the data for you.
          </Accordion.Item>

          <Accordion.Item label="How to send the book">
            Pack the book into hard paper to prevent any damage on transport.
            Send it through delivery service of your choice and use the "cash on
            delivery" option. That way you will receive the money once the buyer
            obtained his package.
          </Accordion.Item>
        </StyledAccordion>
      );
  }
};
