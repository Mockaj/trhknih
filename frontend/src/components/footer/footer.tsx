import { ActionIcon, Anchor, Grid } from "@mantine/core";
import "./footer.css"
import { Mail, BrandFacebook, BrandInstagram, Phone } from 'tabler-icons-react';
import { Link } from "react-router-dom";

export const Footer = () => {

  const iconSize =  30

  return (
    <div className="footer">
      <Grid columns={12} justify="center" align="space-evenly" className="footer__grid">
        <Grid.Col className="footer__flex-column" span={4}>
          <Grid columns={1} align="center">
           <Grid.Col className="footer__flex-cell" span={1}>
              <Link to="/faq?topic=faq" className="footer__text">FAQ</Link>
            </Grid.Col>
          </Grid>
        </Grid.Col>

        <Grid.Col className="footer__flex-column" span={4}>
          <Grid columns={1} align="center">
           <Grid.Col className="footer__flex-cell" span={1}>
              <Mail size={iconSize} className="footer__icon" />readee@readee.com
            </Grid.Col>
            <Grid.Col className="footer__flex-cell footer__text footer__img-text footer__flex-cell--bottom" span={1}>
              <Phone size={iconSize} className="footer__icon" />+01 234 567 890
            </Grid.Col>
          </Grid>
        </Grid.Col>

        <Grid.Col className="footer__flex-column" span={3}>
          <Grid columns={1} align="center">
            <Grid.Col className="footer__flex-cell footer__flex-cell--last" span={1}>
            <ActionIcon component="a" href="https://www.facebook.com">
              <BrandFacebook size={iconSize} className="footer__icon" />
            </ActionIcon>
            </Grid.Col>
            <Grid.Col className="footer__flex-cell footer__flex-cell--last footer__flex-cell--bottom" span={1}>
            <ActionIcon component="a" href="https://www.instagram.com" className="footer__action-icon" >
              <BrandInstagram size={iconSize}  className="footer__icon"/>
            </ActionIcon>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </div>
  )
}