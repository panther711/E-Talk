import React from "react";
import styled from "styled-components";
import {BsGithub} from "react-icons/bs";
import {Link} from "react-scroll";

const Footer = () => {
  return (
    <Wrapper id="footer">
      <div className="footer-container flex flex-col justify-between items-center">
        <div className="footer-block flex flex-col flex-wrap justify-center">

          <div className="footer-content">
           <div className="logo" data-aos="fade-up" data-aos-delay="100">
            <a href="/">
              <img src="/images/logo.png" alt="" loading="lazy" />
            </a>
           </div>
          </div>


          <div className="links">
            <div className="footer-content" data-aos="fade-up">
              <ul>
                <li data-aos="fade-up" data-aos-delay="200"><Link to="home" className="navlink">Home</Link></li>
                <li data-aos="fade-up" data-aos-delay="400"><Link to="features" className="navlink">Features</Link></li>
                <li data-aos="fade-up" data-aos-delay="600"><Link to="team" className="navlink">Team</Link></li>
                <li data-aos="fade-up" data-aos-delay="800"><Link to="contact" className="navlink">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="links" >
            <div className="social-links">
              <ul>
                <li data-aos="fade-up" data-aos-delay="900">
                  <a href="https://github.com/Nitesh52221/E-Talk" title="github">
                  <BsGithub/>
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <div className="footer-copywrite ">
        <div className="custom-container flex justify-center items-center" >
          <div className="footer-bottom text-center">
            <p>© 2023. All rights reserved | Made with 💙 by E-Talk</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
   max-width: 100vw;
   height: 100%;
  background-color: ${({ theme }) => theme.colors.bg2.secondary};
  .footer-container {
    padding: 3rem 0 3rem 0;
  }

  .links {
    margin: 2rem auto 0 auto;
    .footer-content{
      max-width: 100%;
      margin: 0;
      ul{
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li{
        padding: 0 1rem;
        cursor: pointer;
        .navlink{
          padding: 1rem 0;
          font-size: 1.2rem;
          color: ${({ theme }) => theme.colors.heading};
          transition: all 0.1s;
          &:hover{
          border-bottom: 2px solid ${({ theme }) => theme.colors.cyan};
          color: ${({ theme }) => theme.colors.cyan};
        }
        }
      }
    }
    }
    .social-links{
      max-width: 100%;
      margin: 0;
      ul{
        li{
       a{
        color: ${({ theme }) => theme.colors.heading};
        font-size: 2rem;
        cursor: pointer;
       }
      }
    }
    }
   
  }

  .footer-content{
    max-width: 13%;
    margin: 0 auto;
    padding: 0 1rem;
    
    img{
      width: 100%;
      height: auto;
    }
  }

  .footer-copywrite {
    background-color: rgba(0,0,0,0.02);
    border-top: 1px solid ${({ theme }) => theme.colors.border2.primary};
    width: 100vw;
    height: 100%;
    padding: 30px 0;
    .custom-container {
      .footer-bottom {
        p {
          font-size: 1rem;
          margin-bottom: 0;
        }
      }
    }
  }
`;
