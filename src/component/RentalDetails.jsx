// RentalDetails.jsx
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

const RentalDetails = () => {
  return (
    <PageContainer>
      <Title>How to use the Assitant?</Title>
      <Content>
      Our Business Advisor Assistant is designed to make your experience seamless and efficient. Whether you’re looking to book rentals, understand refund policies, or connect with our support team, we’re here to help. 
        <br />
        Explore our easy-to-navigate FAQ section to find quick answers to common questions. Each card takes you to a detailed guide with all the information you need, so you can stay informed and make the best decisions for your business needs.      </Content>
      <Button>Use the Assitant</Button>
    </PageContainer>
  );
};

export default RentalDetails;
