import React, { useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";

// Define light and dark themes
const lightTheme = {
  background: "#ffffff",
  text: "#333333",
  card: "#f5f5f5",
  chatBg: "#f0f0f0",
  inputBg: "#ffffff",
  buttonBg: "rgb(111, 111, 116)",
  buttonHover: "#5549cc",
};

const darkTheme = {
  background: "#333333",
  text: "#ffffff",
  card: "#444444",
  chatBg: "#555555",
  inputBg: "#444444",
  buttonBg: "#6666ff",
  buttonHover: "#8888ff",
};

// Global styles for applying theme colors
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: all 0.3s ease-in-out;
  }
`;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin: 10px 0;
`;

const SubTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: normal;
  margin-bottom: 30px;
`;

const FAQContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`;

const FAQCardStyled = styled.div`
  background-color: ${(props) => props.theme.card};
  color: ${(props) => props.theme.text};
  border-radius: 10px;
  padding: 15px 20px;
  text-align: center;
  width: 200px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  p {
    font-size: 0.9rem;
  }

  span {
    color: ${(props) => props.theme.buttonBg};
    font-weight: bold;
    font-size: 1rem;
  }
`;

const FAQCard = ({ title, link, description }) => {
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <FAQCardStyled>
        <p>{description}</p>
        <span>{title}</span>
      </FAQCardStyled>
    </Link>
  );
};

const ChatContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.chatBg};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 300px;
`;

const ChatHeader = styled.div`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.buttonBg};
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
`;

const MessageList = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.sender === "user" ? "flex-end" : "flex-start")};
`;

const Message = styled.div`
  background-color: ${(props) => (props.sender === "user" ? "#6c63ff" : "#e0e0e0")};
  color: ${(props) => (props.sender === "user" ? "white" : "black")};
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 60%;
  word-wrap: break-word;
  text-align: ${(props) => (props.sender === "user" ? "right" : "left")};
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: ${(props) => props.theme.inputBg};
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ddd;
  margin-right: 10px;
  font-size: 1rem;
`;

const FileInput = styled.input`
  margin-right: 10px;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.buttonBg};
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
  }
`;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    try {
        const response = await axios.post("http://localhost:5000/api/chat", { message: input });

        const botMessage = { sender: "bot", text: response.data.response };
        setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        const errorMessage = { sender: "bot", text: "Error: Unable to get a response." };
        setMessages((prev) => [...prev, errorMessage]);
    } finally {
        setLoading(false);
        setInput("");
    }
};

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const userMessage = { sender: "user", text: `Uploaded: ${file.name}` };
      setMessages((prev) => [...prev, userMessage]);

      setTimeout(() => {
        const botMessage = { sender: "bot", text: `Received file: ${file.name}` };
        setMessages((prev) => [...prev, botMessage]);
      }, 500);
    }
  };

  const clearHistory = () => {
    setMessages([]);
  };

  const toggleTheme = () => setDarkMode((prevMode) => !prevMode);
  const goToCalendar = () => {
    navigate("/calendar");
  };

  const goToUploadPage = () => {
    navigate("/upload");
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Container>
        <Button onClick={toggleTheme}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Button>

        <Header>
          <Logo src="/asset/busAd.png" alt="Brand Logo" />
          <Title>Welcome to Our Business Advisor Assistant</Title>
          <SubTitle>Chat with our support team for quick help.</SubTitle>
        </Header>

        <FAQContainer>
          <FAQCard
            title="Ask now"
            description="How to use the assistant?"
            link="/details/rentals"
          />
          <FAQCard
            title="Ask now"
            description="What is the refund policy?"
            link="/details/refund"
          />
          <FAQCard
            title="Ask now"
            description="How to contact a representative?"
            link="/details/contact"
          />
        </FAQContainer>

        <ChatContainer>
          <ChatHeader>Chat with Support</ChatHeader>
          <MessageList>
            {messages.map((msg, index) => (
              <MessageWrapper key={index} sender={msg.sender}>
                <Message sender={msg.sender}>{msg.text}</Message>
              </MessageWrapper>
            ))}
            {loading && (
              <MessageWrapper sender="bot">
                <Message sender="bot">Bot is typing...</Message>
              </MessageWrapper>
            )}
          </MessageList>

          <InputContainer>
            <FileInput type="file" onChange={handleFileUpload} />
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <Button onClick={sendMessage}>&#9658;</Button>
            <Button danger onClick={clearHistory}>
              Clear History
            </Button>
          </InputContainer>
        </ChatContainer>
        <Button onClick={goToCalendar} style={{ marginTop: "20px" }}>
          Go to Calendar
        </Button>
        <Button onClick={goToUploadPage} style={{ marginTop: "20px" }}>
          Upload PDF
        </Button>
      </Container>
    </ThemeProvider>
  );
};

export default Chatbot;