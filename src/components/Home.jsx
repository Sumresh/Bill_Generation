// import React from "react";
// import { Link } from "react-router-dom";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const Home = () => {
//   return (
//     <div>
//       <div className="p-6 bg-white rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold mb-4">Home</h1>
//         <div>
//           <Link to="/DynamicTablePage">Create New Quotation</Link>
//         </div>

//         <Link to="/Update-table">Update-table</Link>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import logo from "./logo.png";
import background from "./orange.jpg";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: "50px 0",
      }}
    >
      <Container style={{ textAlign: "center" }}>
        {/* Logo */}
        <Row className="justify-content-center">
          <Col xs="auto">
            <img src={logo} alt="Logo" style={{ maxHeight: "80px" }} />
          </Col>
        </Row>

        {/* Card with Buttons */}
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6} lg={4}>
            <Card
              className="p-4"
              style={{
                backgroundColor: "rgba(255, 245, 225, 0.8)", // Translucent light yellow-orange
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h1
                style={{
                  color: "#CC5500", // Burnt Orange for title
                  fontFamily: "'Stylish', serif",
                  fontWeight: "400",
                  fontStyle: "normal",
                  marginBottom: "20px",
                }}
              >
                Home
              </h1>

              <div className="mb-3">
                <Button
                  as={Link}
                  to="/DynamicTablePage"
                  style={{
                    backgroundColor: "#FF4500", // Orange Red for primary button
                    borderColor: "#FF4500",
                    fontSize: "18px",
                    width: "100%",
                    padding: "10px 20px",
                  }}
                >
                  Create New Quotation
                </Button>
              </div>

              <div>
                <Button
                  as={Link}
                  to="/Update-table"
                  style={{
                    backgroundColor: "#FFA500", // Orange for secondary button
                    borderColor: "#FFA500",
                    fontSize: "18px",
                    width: "100%",
                    padding: "10px 20px",
                  }}
                >
                  Update Table
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
