// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { database, ref, get, update } from "./firebase";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const UpdateTablePage = () => {
//   const [data, setData] = useState([]);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [sections, setSections] = useState([]);

//   useEffect(() => {
//     // Fetch existing data from Firebase
//     const fetchData = async () => {
//       const recordsRef = ref(database, "records");
//       const snapshot = await get(recordsRef);
//       const data = snapshot.val();
//       if (data) {
//         setData(Object.keys(data).map((key) => ({ id: key, ...data[key] })));
//       }
//     };

//     fetchData();
//   }, []);

//   const handleRecordSelect = async (record) => {
//     setSelectedRecord(record);
//     if (record) {
//       const sectionsRef = ref(database, `records/${record.id}/sections`);
//       const snapshot = await get(sectionsRef);
//       const sections = snapshot.val();
//       if (sections) {
//         setSections(
//           Object.keys(sections).map((key) => ({ id: key, ...sections[key] }))
//         );
//       }
//     }
//   };

//   const handleUpdate = async () => {
//     if (selectedRecord) {
//       // Update record data
//       const recordRef = ref(database, `records/${selectedRecord.id}`);
//       await update(recordRef, selectedRecord);

//       // Update sections data
//       sections.forEach(async (section) => {
//         const sectionRef = ref(
//           database,
//           `records/${selectedRecord.id}/sections/${section.id}`
//         );
//         await update(sectionRef, section);
//       });

//       alert("Record updated successfully");
//     }
//   };

//   const handleSectionChange = (sectionId, key, value) => {
//     setSections(
//       sections.map((section) =>
//         section.id === sectionId ? { ...section, [key]: value } : section
//       )
//     );
//   };

//   const handleRowChange = (sectionId, rowIndex, key, value) => {
//     const updatedSections = sections.map((section) => {
//       if (section.id === sectionId) {
//         const updatedRows = section.rows.map((row, index) =>
//           index === rowIndex ? { ...row, [key]: value } : row
//         );
//         return { ...section, rows: updatedRows };
//       }
//       return section;
//     });
//     setSections(updatedSections);
//   };

//   const handlePrintData = () => {
//     const doc = new jsPDF();
//     const margin = 10;

//     const drawOuterBox = () => {
//       const pageWidth = doc.internal.pageSize.width;
//       const pageHeight = doc.internal.pageSize.height;
//       doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
//     };

//     drawOuterBox();

//     doc.setFontSize(18);
//     doc.text("BLACK AND WHITE INTERIORS", margin + 10, margin + 10);

//     doc.setFontSize(12);
//     doc.text(
//       `Name Of The Customer: ${selectedRecord.tableName}`,
//       margin + 10,
//       margin + 20
//     );
//     doc.text(`Date: ${selectedRecord.date}`, margin + 10, margin + 30);

//     let yOffset = margin + 40;

//     sections.forEach((section, sectionIndex) => {
//       if (yOffset > 250) {
//         doc.addPage();
//         drawOuterBox();
//         yOffset = margin + 10;
//       }

//       doc.setFontSize(14);
//       doc.text(
//         `Section ${sectionIndex + 1}: ${section.sectionName}`,
//         margin + 10,
//         yOffset
//       );
//       yOffset += 10;

//       doc.setFontSize(12);

//       const headers = [
//         "Sl. No",
//         "Product",
//         "Description",
//         "sqft",
//         "rate",
//         "Amount",
//       ];

//       const columnStyles = { 0: { cellWidth: 20 }, 1: { cellWidth: 30 } };
//       headers.slice(2).forEach((header, index) => {
//         columnStyles[index + 2] = { cellWidth: "auto" };
//       });

//       doc.autoTable({
//         startY: yOffset,
//         head: [headers],
//         body: section.rows.map((row) => [
//           row.SlNo,
//           row.Product,
//           row.Description,
//           row.sqft,
//           row.rate,
//           row.Amount,
//         ]),
//         margin: { top: 10, left: margin + 10, right: margin + 10 },
//         styles: {
//           overflow: "linebreak",
//           cellWidth: "wrap",
//           minCellHeight: 20,
//         },
//         bodyStyles: {
//           valign: "top",
//           cellPadding: 2,
//         },
//         columnStyles: columnStyles,
//         didDrawPage: (data) => {
//           drawOuterBox();
//         },
//       });

//       yOffset = doc.autoTable.previous.finalY + 10;

//       const totalPrice = section.rows.reduce((total, row) => {
//         const amount = parseFloat(row.Amount) || 0;
//         return total + amount;
//       }, 0);
//       doc.text(`Total Price: ${totalPrice.toFixed(2)}`, margin + 10, yOffset);
//       yOffset += 20;
//     });

//     doc.setFontSize(14);
//     doc.text(
//       `Final Quoted Value: ${sections
//         .reduce(
//           (total, section) =>
//             total +
//             section.rows.reduce((sectionTotal, row) => {
//               const amount = parseFloat(row.Amount) || 0;
//               return sectionTotal + amount;
//             }, 0),
//           0
//         )
//         .toFixed(2)}`,
//       margin + 10,
//       yOffset
//     );

//     doc.save("updated_quoted_data.pdf");
//   };

//   return (
//     <Container>
//       <h2 className="mt-4">Update Data</h2>
//       <Row className="mt-3">
//         <Col>
//           <Form.Group controlId="selectRecord">
//             <Form.Label>Select Record to Update</Form.Label>
//             <Form.Control
//               as="select"
//               onChange={(e) =>
//                 handleRecordSelect(
//                   data.find((record) => record.id === e.target.value)
//                 )
//               }
//             >
//               <option value="">Select a record</option>
//               {data.map((record) => (
//                 <option key={record.id} value={record.id}>
//                   {record.tableName} - {record.date}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>
//         </Col>
//       </Row>

//       {selectedRecord && (
//         <>
//           <Row className="mt-4">
//             <Col>
//               <Form.Group controlId="updateTableName">
//                 <Form.Label>Name Of The Customer</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={selectedRecord.tableName}
//                   onChange={(e) =>
//                     setSelectedRecord({
//                       ...selectedRecord,
//                       tableName: e.target.value,
//                     })
//                   }
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group controlId="updateDate">
//                 <Form.Label>Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   value={selectedRecord.date}
//                   onChange={(e) =>
//                     setSelectedRecord({
//                       ...selectedRecord,
//                       date: e.target.value,
//                     })
//                   }
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Button variant="success" className="mt-4" onClick={handleUpdate}>
//                 Update Record
//               </Button>
//             </Col>
//           </Row>

//           {sections.map((section) => (
//             <div key={section.id} className="mt-4">
//               <h4>Section: {section.sectionName}</h4>
//               {section.rows.map((row, rowIndex) => (
//                 <Row key={rowIndex} className="mb-2">
//                   <Col>
//                     <Form.Group controlId={`product-${section.id}-${rowIndex}`}>
//                       <Form.Label>Product</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={row.Product}
//                         onChange={(e) =>
//                           handleRowChange(
//                             section.id,
//                             rowIndex,
//                             "Product",
//                             e.target.value
//                           )
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group
//                       controlId={`description-${section.id}-${rowIndex}`}
//                     >
//                       <Form.Label>Description</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={row.Description}
//                         onChange={(e) =>
//                           handleRowChange(
//                             section.id,
//                             rowIndex,
//                             "Description",
//                             e.target.value
//                           )
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group controlId={`sqft-${section.id}-${rowIndex}`}>
//                       <Form.Label>Sqft</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={row.sqft}
//                         onChange={(e) =>
//                           handleRowChange(
//                             section.id,
//                             rowIndex,
//                             "sqft",
//                             e.target.value
//                           )
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group controlId={`rate-${section.id}-${rowIndex}`}>
//                       <Form.Label>Rate</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={row.rate}
//                         onChange={(e) =>
//                           handleRowChange(
//                             section.id,
//                             rowIndex,
//                             "rate",
//                             e.target.value
//                           )
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group controlId={`amount-${section.id}-${rowIndex}`}>
//                       <Form.Label>Amount</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={row.Amount}
//                         onChange={(e) =>
//                           handleRowChange(
//                             section.id,
//                             rowIndex,
//                             "Amount",
//                             e.target.value
//                           )
//                         }
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//               ))}
//             </div>
//           ))}

//           <Button variant="primary" className="mt-4" onClick={handlePrintData}>
//             Generate PDF
//           </Button>
//         </>
//       )}
//     </Container>
//   );
// };

// export default UpdateTablePage;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { database, ref, get, update, set } from "./firebase"; // Import 'set' for saving new records
import jsPDF from "jspdf";
import "jspdf-autotable";
import background from "./logo2.png";

const UpdateTablePage = () => {
  const [data, setData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // Fetch existing data from Firebase
    const fetchData = async () => {
      const recordsRef = ref(database, "records");
      const snapshot = await get(recordsRef);
      const data = snapshot.val();
      if (data) {
        setData(Object.keys(data).map((key) => ({ id: key, ...data[key] })));
      }
    };

    fetchData();
  }, []);

  const handleRecordSelect = async (record) => {
    setSelectedRecord(record);
    if (record) {
      const sectionsRef = ref(database, `records/${record.id}/sections`);
      const snapshot = await get(sectionsRef);
      const sections = snapshot.val();
      if (sections) {
        setSections(
          Object.keys(sections).map((key) => ({ id: key, ...sections[key] }))
        );
      }
    }
  };

  const handleUpdate = async () => {
    if (selectedRecord) {
      // Update record data
      const recordRef = ref(database, `records/${selectedRecord.id}`);
      await update(recordRef, selectedRecord);

      // Update sections data
      sections.forEach(async (section) => {
        const sectionRef = ref(
          database,
          `records/${selectedRecord.id}/sections/${section.id}`
        );
        await update(sectionRef, section);
      });

      alert("Record updated successfully");
    }
  };

  const handleSectionChange = (sectionId, key, value) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, [key]: value } : section
      )
    );
  };

  const handleRowChange = (sectionId, rowIndex, key, value) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const updatedRows = section.rows.map((row, index) =>
          index === rowIndex ? { ...row, [key]: value } : row
        );
        return { ...section, rows: updatedRows };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handlePrintData = async () => {
    const doc = new jsPDF();

    const pageWidth1 = doc.internal.pageSize.width;
    const pageHeight1 = doc.internal.pageSize.height;

    // Set background color for the entire page
    doc.setFillColor(255, 245, 225); // Light Yellow-Orange background color (corresponds to #FFF5E1)
    doc.rect(0, 0, pageWidth1, pageHeight1, "F");

    const margin = 10;

    const dateParts = selectedRecord.date.split("-");
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

    const logoWidth = 15; // Width of the logo in mm
    const logoHeight = 15; // Height of the logo in mm
    const logoX = margin + 5; // X position for the logo
    const logoY = margin + 2; // Y position for the logo
    doc.addImage(background, "PNG", logoX, logoY, logoWidth, logoHeight);

    // Set font color for title
    doc.setTextColor(204, 85, 0);
    doc.setFont("times", "bold");
    doc.setFontSize(30);
    const title = "House Decors";
    const pageWidth = doc.internal.pageSize.width;
    const textWidth = doc.getTextWidth(title);
    const textX = (pageWidth - textWidth) / 2; // Calculate X position to center the text
    doc.text(title, textX, margin + 10);

    const drawBackgroundColor = () => {
      // Define page width and height
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      // Set background color for the entire page
      doc.setFillColor(255, 245, 225); // Light Yellow-Orange background color (#FFF5E1)
      doc.rect(0, 0, pageWidth, pageHeight, "F"); // Fill the entire page with the background color
    };

    const drawOuterBox = () => {
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
    };

    drawOuterBox();

    // Set font color for details
    doc.setTextColor(204, 85, 0);
    doc.setFont("times", "normal");
    const details = `
              No.10-B, 1st Floor, 12th Street, Landmark, North Jagannatha Nagar,Villivakkam , 
                                    Opp. to MPA Church, Chennai, Tamil Nadu - 600049.
    
                  Website Link: www.housedecors.in                                   Ph: 98400 49606`;
    // Add details below the title
    doc.setFontSize(12);
    const detailsX = margin + 10;
    const detailsY = margin + 30; // Adjusted for proper spacing
    const lineHeight = 6; // Line height for details text

    // Calculate height of the details box
    const detailsLines = details.split("\n");
    const detailsHeight = detailsLines.length * lineHeight;

    // Draw box around details
    doc.rect(
      detailsX - 2,
      detailsY - 2,
      pageWidth - 2 * margin - 16,
      detailsHeight + 4
    );

    // Add details text
    detailsLines.forEach((line, index) => {
      doc.text(line, detailsX, detailsY + index * lineHeight);
    });

    // Adjust yOffset based on the added details box
    let yOffset = detailsY + detailsHeight + 10;

    // Set font color for rest of the content
    doc.setFont("times", "normal");
    doc.setTextColor(0, 0, 0); // Black color
    doc.setFontSize(12);
    doc.text(
      `Quotation To : ${selectedRecord.tableName}`,
      margin + 10,
      yOffset
    );
    yOffset += 10;
    doc.text(`Date: ${formattedDate}`, margin + 10, yOffset);
    yOffset += 10;
    doc.text(
      `"We thank you very much for your kind enquiry in connection with your requirement of interior 
work. Please find herewith our offer for your kind consideration."`,
      margin + 10,
      yOffset
    );
    yOffset += 20;

    sections.forEach((section, sectionIndex) => {
      if (yOffset >= doc.internal.pageSize.height - 80) {
        doc.addPage();
        drawBackgroundColor();
        drawOuterBox();
        yOffset = margin + 10;
      }

      doc.setTextColor(255, 87, 51);
      doc.setFont("times", "bold");
      doc.setFontSize(18);
      doc.text(`${section.sectionName}`, margin + 80, yOffset);
      yOffset += 10;

      // Reset font style and color for other content
      doc.setTextColor(0, 0, 0); // Black color
      doc.setFont("times", "normal");
      doc.setFontSize(12);

      const headers = [
        "Sl. No",
        "Product",
        "Description",
        "Sqft",
        "Rate",
        "Amount",
      ];

      const columnStyles = { 0: { cellWidth: 20 }, 1: { cellWidth: 30 } };
      headers.slice(2).forEach((header, index) => {
        columnStyles[index + 2] = { cellWidth: "auto" };
      });

      doc.autoTable({
        startY: yOffset,
        head: [headers],
        body: section.rows.map((row) => [
          row.SlNo,
          row.Product,
          row.Description,
          row.sqft,
          row.rate,
          row.Amount,
        ]),
        margin: { top: 10, left: margin + 10, right: margin + 10 },
        styles: {
          overflow: "linebreak",
          cellWidth: "wrap",
          minCellHeight: 10,
          halign: "center",
        },
        headStyles: {
          fillColor: [255, 69, 0], // Orange Red for headers (#FF4500)
          textColor: 255, // White text
        },
        bodyStyles: {
          valign: "top",
          cellPadding: 2,
        },
        columnStyles: columnStyles,
        didDrawPage: (data) => {
          drawOuterBox();
        },
      });

      yOffset = doc.autoTable.previous.finalY + 10;

      const totalPrice = section.rows.reduce((total, row) => {
        const amount = parseFloat(row.Amount) || 0;
        return total + amount;
      }, 0);
      doc.text(`Total Price: ${totalPrice.toFixed(2)}`, margin + 135, yOffset);
      yOffset += 20;
    });

    doc.setFontSize(14);
    doc.text(
      `Final Quoted Value: ${sections
        .reduce(
          (total, section) =>
            total +
            section.rows.reduce((sectionTotal, row) => {
              const amount = parseFloat(row.Amount) || 0;
              return sectionTotal + amount;
            }, 0),
          0
        )
        .toFixed(2)}`,
      margin + 10,
      yOffset
    );

    // Add a new page for the summary
    doc.addPage();
    drawBackgroundColor();
    drawOuterBox(); // Draw outer box on the new page

    doc.setFillColor(255, 245, 225); // Light Yellow-Orange background color (corresponds to #FFF5E1)
    doc.rect(0, 0, pageWidth1, pageHeight1, "F");

    // Set font color and size for title
    doc.setTextColor(255, 87, 51);
    doc.setFontSize(18);
    doc.setFont("times", "bold");
    const summaryTitle = "Final Quotation";
    const summaryTextWidth = doc.getTextWidth(summaryTitle);
    const summaryTextX = (pageWidth - summaryTextWidth) / 2;
    doc.text(summaryTitle, summaryTextX, margin + 10);

    // Adjust yOffset to minimize space between the title and the table
    yOffset = margin + 20; // Adjust to reduce the gap after the title

    // Add section totals in a table
    const finalBillHeaders = ["Section Name", "Total Price"];
    const sectionTotals = sections.map((section) => ({
      sectionName: section.sectionName,
      totalPrice: section.rows.reduce(
        (total, row) => total + (parseFloat(row.Amount) || 0),
        0
      ),
    }));

    const finalBillBody = sectionTotals.map((section) => [
      section.sectionName,
      section.totalPrice.toFixed(2),
    ]);

    doc.autoTable({
      startY: yOffset,
      head: [finalBillHeaders],
      body: finalBillBody,
      margin: { top: 10, left: margin + 10, right: margin + 10 },
      styles: {
        overflow: "linebreak",
        cellWidth: "wrap",
        minCellHeight: 18, // Reduced minimum cell height
        lineHeight: 1.2, // Adjusted line height to reduce extra space
      },
      headStyles: {
        fillColor: [255, 69, 0], // Header background color
        textColor: 255, // Header text color (white)
        fontStyle: "bold",
      },
      bodyStyles: {
        valign: "top",
        cellPadding: 2,
      },
      columnStyles: { 0: { cellWidth: "auto" }, 1: { cellWidth: 40 } },
      didDrawPage: (data) => {
        // Draw outer box on every page
        drawOuterBox();
      },
    });

    // Update yOffset for final quoted value
    yOffset = doc.autoTable.previous.finalY + 10; // Reduce space after the table

    // Final quoted value
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Black color
    doc.setFont("times", "bold");
    doc.text(
      `Final Quoted Value: ${sections
        .reduce(
          (total, section) =>
            total +
            section.rows.reduce(
              (sectionTotal, row) =>
                sectionTotal + (parseFloat(row.Amount) || 0),
              0
            ),
          0
        )
        .toFixed(2)}`,
      margin + 10,
      yOffset
    );

    // Add a new page for the disclaimer
    doc.addPage();
    drawBackgroundColor();
    doc.rect(0, 0, pageWidth1, pageHeight1, "F");
    drawOuterBox(); // Draw outer box on the new page

    // Set font size and style for the disclaimer text
    doc.setFontSize(10);
    doc.setFont("times", "normal");

    const disclaimer = `
    Brands:
    * Plywood : kitply / Fortune Gold
    * Laminates : Merino / Greenlam
    * Telescopic wheels & Hinch's = Hettich / Ebco
    * Accessories = Ebco
    * Locks = Godrej / Europa
    * Edgeband = Star

    Note:
    * The Project cost is only with respect to woodwork.
    * Any additional or subtraction of work shall be reflected in the final invoice.
    * We at house decors are committed to providing the utmost quality and satisfaction to the
    customers and a value for their money.
    * The above quotation doesn't include any Kitchen Top, light fixtures, Profile Lights, Masking/Marking,
    sensors, or any other artifacts.
    * The price is an initial estimate and valid for 30 days. The actual quote would be provided once site
    masking is complete. Further,
    * To move forward with actual measurement design-based final quote, 10% of the actual value of the
    project needs to be paid.

    Terms & Conditions:
    * The above-mentioned is a rough estimation. The above quote may vary once the designs are finalized.
    * GST @ 18% EXTRA
    * All Rates Are Inclusive Of All Hardwares.
    * All telescopic channels will be normal close. Only kitchen will be soft close.
    * Certain profile handles will be given for kitchen base units which would meet the rate parity.
    * The total time required for the execution of the project will be 45 days from the date of the
    receipt of your confirmation.
    * If any other inclusions or modifications additional cost.
    * Final payment based on the final measurements only.
    * No hidden charges other than this Quote.

    Payment Terms:
    * 50% payment along with your confirmation
    * 30% Payment against doors delivery
    * 20% payment against 100% completion work

    Warranty:
    * All plywoods, accessories, hardware and appliances are covered as per the respective manufacturers 
    warranty policy.`;

    const printHeading = (heading, yOffset, color) => {
      // Check if color is an array and has 3 elements
      if (Array.isArray(color) && color.length === 3) {
        // Ensure color values are between 0 and 255
        color.forEach((value) => {
          if (value < 0 || value > 255) {
            throw new Error(`Invalid color value: ${value}`);
          }
        });
        doc.setTextColor(...color);
      } else {
        throw new Error("Invalid color argument");
      }
      doc.text(heading, margin + 10, yOffset);
    };

    // Print disclaimer headings
    const disclaimerLines = disclaimer.split("\n");
    let currentY = margin + 10;

    disclaimerLines.forEach((line) => {
      if (line.trim().endsWith(":")) {
        // Heading detection (ends with ':')
        printHeading(line, currentY, [255, 0, 0]); // Red color
        currentY += 10;
      } else {
        doc.setTextColor(0, 0, 0); // Black color for regular text
        doc.text(line, margin + 10, currentY);
        currentY += 6; // Line height for disclaimer text
      }
    });

    // Save the updated data as a new record in Firebase
    const newRecordRef = ref(database, `records/${Date.now()}`);
    await set(newRecordRef, {
      tableName: selectedRecord.tableName,
      date: selectedRecord.date,
      sections: sections.reduce((acc, section) => {
        acc[section.id] = section;
        return acc;
      }, {}),
    });

    doc.save("updated_quoted_data.pdf");
  };

  return (
    <Container
      style={{
        backgroundColor: "#FFF5E1", // Light Yellow-Orange for entire background
        padding: "20px",
        minHeight: "100vh",
      }}
      fluid
    >
      {/* Header with Logo */}
      <Row className="align-items-center justify-content-center">
        <Col xs="auto" className="d-flex justify-content-end">
          <img
            src={background}
            alt="Logo"
            style={{ maxHeight: "60px", marginRight: "10px" }}
          />
        </Col>
        <Col xs="auto">
          <h2
            className="mt-2 text-center"
            style={{
              color: "#CC5500", // Orange color for text
              fontFamily: "'Stylish', serif",
              fontWeight: "400",
              fontStyle: "normal",
              fontSize: "48px",
              marginLeft: "0", // Remove any unnecessary margin
            }}
          >
            Update Data
          </h2>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={6} xs={12}>
          <Form.Group controlId="selectRecord">
            <Form.Label style={{ color: "#CC5500" }}>
              Select Record to Update
            </Form.Label>
            <Form.Control
              as="select"
              style={{
                backgroundColor: "#FFF5E1",
                border: "1px solid #FF8C00",
              }}
              onChange={(e) =>
                handleRecordSelect(
                  data.find((record) => record.id === e.target.value)
                )
              }
            >
              <option value="">Select a record</option>
              {data.map((record) => (
                <option key={record.id} value={record.id}>
                  {record.tableName} - {record.date}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      {selectedRecord && (
        <>
          <Row className="mt-4">
            <Col md={6} xs={12}>
              <Form.Group controlId="updateTableName">
                <Form.Label style={{ color: "#CC5500" }}>
                  Name Of The Customer
                </Form.Label>
                <Form.Control
                  type="text"
                  value={selectedRecord.tableName}
                  onChange={(e) =>
                    setSelectedRecord({
                      ...selectedRecord,
                      tableName: e.target.value,
                    })
                  }
                  style={{
                    backgroundColor: "#FFF5E1",
                    border: "1px solid #FF8C00",
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <Form.Group controlId="updateDate">
                <Form.Label style={{ color: "#CC5500" }}>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedRecord.date}
                  onChange={(e) =>
                    setSelectedRecord({
                      ...selectedRecord,
                      date: e.target.value,
                    })
                  }
                  style={{
                    backgroundColor: "#FFF5E1",
                    border: "1px solid #FF8C00",
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={2} xs={12} className="d-flex align-items-end">
              <Button
                variant="success"
                onClick={handleUpdate}
                style={{
                  width: "100%",
                  backgroundColor: "#FF4500",
                  border: "none",
                }}
              >
                Update Record
              </Button>
            </Col>
          </Row>

          {sections.map((section) => (
            <div
              key={section.id}
              style={{
                backgroundColor: "#FFDAB9",
                padding: "15px",
                borderRadius: "8px",
                marginTop: "20px",
              }}
            >
              <h4
                style={{
                  color: "#FF6347",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  fontFamily: "'Stylish', serif",
                  fontStyle: "normal",
                }}
              >
                {section.sectionName}
              </h4>
              {section.rows.map((row, rowIndex) => (
                <Row
                  key={rowIndex}
                  className="mb-2"
                  style={{
                    backgroundColor: "#FFF0E0",
                    padding: "10px",
                    border: "1px solid #FF8C00",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <Col md={3} xs={12}>
                    <Form.Group controlId={`product-${section.id}-${rowIndex}`}>
                      <Form.Label style={{ color: "#CC5500" }}>
                        Product
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        value={row.Product}
                        onChange={(e) =>
                          handleRowChange(
                            section.id,
                            rowIndex,
                            "Product",
                            e.target.value
                          )
                        }
                        style={{
                          padding: "10px",
                          backgroundColor: "#FFF5E1",
                          border: "1px solid #FF8C00",
                          width: "100%",
                          fontSize: "16px",
                          minHeight: "100px",
                          minWidth: "150px",
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} xs={12}>
                    <Form.Group
                      controlId={`description-${section.id}-${rowIndex}`}
                    >
                      <Form.Label style={{ color: "#CC5500" }}>
                        Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        value={row.Description}
                        onChange={(e) =>
                          handleRowChange(
                            section.id,
                            rowIndex,
                            "Description",
                            e.target.value
                          )
                        }
                        style={{
                          padding: "10px",
                          backgroundColor: "#FFF5E1",
                          border: "1px solid #FF8C00",
                          width: "100%",
                          fontSize: "16px",
                          minHeight: "100px",
                          minWidth: "150px",
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2} xs={12}>
                    <Form.Group controlId={`sqft-${section.id}-${rowIndex}`}>
                      <Form.Label style={{ color: "#CC5500" }}>Sqft</Form.Label>
                      <Form.Control
                        type="number"
                        value={row.sqft}
                        onChange={(e) =>
                          handleRowChange(
                            section.id,
                            rowIndex,
                            "sqft",
                            e.target.value
                          )
                        }
                        style={{
                          padding: "10px",
                          backgroundColor: "#FFF5E1",
                          border: "1px solid #FF8C00",
                          width: "100%",
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2} xs={12}>
                    <Form.Group controlId={`rate-${section.id}-${rowIndex}`}>
                      <Form.Label style={{ color: "#CC5500" }}>Rate</Form.Label>
                      <Form.Control
                        type="number"
                        value={row.rate}
                        onChange={(e) =>
                          handleRowChange(
                            section.id,
                            rowIndex,
                            "rate",
                            e.target.value
                          )
                        }
                        style={{
                          padding: "10px",
                          backgroundColor: "#FFF5E1",
                          border: "1px solid #FF8C00",
                          width: "100%",
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2} xs={12}>
                    <Form.Group controlId={`amount-${section.id}-${rowIndex}`}>
                      <Form.Label style={{ color: "#CC5500" }}>
                        Amount
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={row.Amount}
                        onChange={(e) =>
                          handleRowChange(
                            section.id,
                            rowIndex,
                            "Amount",
                            e.target.value
                          )
                        }
                        style={{
                          padding: "10px",
                          backgroundColor: "#FFF5E1",
                          border: "1px solid #FF8C00",
                          width: "100%",
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              ))}
            </div>
          ))}

          <Button
            variant="primary"
            className="mt-4"
            onClick={handlePrintData}
            style={{
              width: "100%",
              backgroundColor: "#FFA500",
              border: "none",
            }}
          >
            Generate PDF
          </Button>
        </>
      )}
    </Container>
  );
};

export default UpdateTablePage;
