import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Home = () => {
  return (
    <div>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Home</h1>
        <div>
          <Link to="/DynamicTablePage">Create New Quotation</Link>
        </div>

        <Link to="/Update-table">Update-table</Link>
      </div>
    </div>
  );
};

export default Home;
