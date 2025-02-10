// ContactDetails.jsx
import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  max-width: 900px;
  margin: 50px auto;
  padding: 30px;
  background-color: ${(props) => props.theme.card};
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${(props) => props.theme.text};
  margin-bottom: 25px;
  text-align: center;
`;

const Content = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${(props) => props.theme.text};
  margin-bottom: 20px;
  text-align: justify;
  padding-left: 10px;
  padding-right: 10px;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.buttonBg};
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.1rem;
  display: block;
  margin: 30px auto;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
  }
`;

const ContactDetails = () => {
  return (
    <PageContainer>
      <Title>How to Contact a Representative?</Title>
      <Content>
        If you need assistance, you can contact our support team via email, live chat, or phone. Our representatives are available 24/7 to help you with any queries or issues you may have.
        <br />
        You can also schedule a call at your convenience or reach out through social media for a quicker response.
      </Content>
      <Button>Contact Support</Button>
    </PageContainer>
  );
};

export default ContactDetails;
