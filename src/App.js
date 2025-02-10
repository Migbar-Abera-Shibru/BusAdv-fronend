import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chatbot from './component/Chatbot';
import Calendar from './component/Calender';
import RentalDetails from "./component/RentalDetails";
import RefundDetails from "./component/RefundDetails";
import ContactDetails from "./component/ContactDetails";
import UploadPage from "./component/UploadPage";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Chatbot />} />
                <Route path="/calendar" element={<Calendar 
                />} />
                <Route path="/details/rentals" element={<RentalDetails />} />
                <Route path="/details/refund" element={<RefundDetails />} />
                <Route path="/details/contact" element={<ContactDetails />} />
                <Route path="/upload" element={<UploadPage />} />
            </Routes>
        </Router>
    );
};

export default App;


