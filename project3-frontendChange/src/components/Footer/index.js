import React from 'react'
import {FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin} from 'react-icons/fa'

import {FooterContainer, FooterWrap, FooterLinksContainer, FooterLinksWrapper, FooterLinkItems, FooterLinkTitle, FooterLink, SocialMedia,SocialMediaWrap, SocialLogo, WebsiteRights, SocialIcons, SocialIconLink} from './FooterElements';

const Footer= () => {
    return (
     <>
      <FooterContainer>
          <FooterWrap>
              <FooterLinksContainer>
                  <FooterLinksWrapper>
                      <FooterLinkItems>
                          <FooterLinkTitle> How it works </FooterLinkTitle>
                              <FooterLink to= '/'>About</FooterLink>
                              <FooterLink to= '/'>Press</FooterLink>
                              <FooterLink to= '/'>Teams</FooterLink>
                              <FooterLink to= '/'>Investors</FooterLink>
                              <FooterLink to= '/profile'>APIs</FooterLink>
                      </FooterLinkItems>
                      <FooterLinkItems>
                          <FooterLinkTitle> Testimonials </FooterLinkTitle>
                              <FooterLink to= '/'>Features</FooterLink>
                              <FooterLink to= '/'>Pricing</FooterLink>
                              <FooterLink to= '/'>Clients</FooterLink>
                              <FooterLink to= '/'>Benefits</FooterLink>
                              <FooterLink to= '/'>Satisfaction</FooterLink>
                      </FooterLinkItems>
                  </FooterLinksWrapper>
                  <FooterLinksWrapper>
                      <FooterLinkItems>
                          <FooterLinkTitle> Careers </FooterLinkTitle>
                              <FooterLink to= '/'>Marketing</FooterLink>
                              <FooterLink to= '/'>Software Development</FooterLink>
                              <FooterLink to= '/'>Databases</FooterLink>
                              <FooterLink to= '/'>Leadership</FooterLink>
                              <FooterLink to= '/'>Investing</FooterLink>
                      </FooterLinkItems>
                      <FooterLinkItems>
                          <FooterLinkTitle> Investors </FooterLinkTitle>
                              <FooterLink to= '/'>Affiliates</FooterLink>
                              <FooterLink to= '/'>Partners</FooterLink>
                              <FooterLink to= '/'>Stocks</FooterLink>
                              <FooterLink to= '/'>Consumers</FooterLink>
                              <FooterLink to= '/'>Services</FooterLink>
                      </FooterLinkItems>
                      <FooterLinkItems>
                          <FooterLinkTitle> Terms of Service </FooterLinkTitle>
                              <FooterLink to= '/'>Software</FooterLink>
                              <FooterLink to= '/'>Licenses</FooterLink>
                              <FooterLink to= '/'>Trademarks</FooterLink>
                              <FooterLink to= '/'>Privacy</FooterLink>
                              <FooterLink to= '/'>Security</FooterLink>
                      </FooterLinkItems>
                  </FooterLinksWrapper>
                  
              </FooterLinksContainer>
              <SocialMedia>
                  <SocialMediaWrap>
                      <SocialIcons>
                          <SocialIconLink href='//www.facebook.com' target='_blank' aria-label="Facebook">
                              <FaFacebook/>
                          </SocialIconLink>
                          <SocialIconLink href='//www.instagram.com' target='_blank' aria-label="Instagram">
                              <FaInstagram/>
                          </SocialIconLink>
                          <SocialIconLink href='//www.youtube.com' target='_blank' aria-label="Youtube">
                              <FaYoutube/>
                          </SocialIconLink>
                          <SocialIconLink href='//www.twitter.com' target='_blank' aria-label="Twitter">
                              <FaTwitter/>
                          </SocialIconLink>
                          <SocialIconLink href='//www.LinkedIn.com' target='_blank' aria-label="Linkedin">
                              <FaLinkedin/>
                          </SocialIconLink>
                      </SocialIcons>
                  </SocialMediaWrap>
              </SocialMedia>
          </FooterWrap>
      </FooterContainer>      
     </>
    )
}

export default Footer
