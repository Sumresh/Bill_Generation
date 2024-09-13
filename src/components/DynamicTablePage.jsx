// // // import React, { useState } from "react";
// // // import { Container, Row, Col, Form, Button } from "react-bootstrap";
// // // import "bootstrap-icons/font/bootstrap-icons.css";
// // // import jsPDF from "jspdf";
// // // import "jspdf-autotable";

// // // const DynamicTablePage = () => {
// // //   const [tableName, setTableName] = useState("");
// // //   const [date, setDate] = useState("");
// // //   const [sections, setSections] = useState([]);
// // //   const [newColumnName, setNewColumnName] = useState("");
// // //   const [editingColumnSectionIndex, setEditingColumnSectionIndex] =
// // //     useState(null);
// // //   const [suggestions] = useState([
// // //     "Living Room",
// // //     "Bedroom",
// // //     "Dining Room",
// // //     "Office",
// // //     "Kitchen",
// // //   ]);
// // //   const [filteredSuggestions, setFilteredSuggestions] = useState([]);
// // //   const [currentSectionName, setCurrentSectionName] = useState("");
// // //   const [showSuggestions, setShowSuggestions] = useState(false);

// // //   const addSection = () => {
// // //     setSections([
// // //       ...sections,
// // //       {
// // //         sectionName: `Section ${sections.length + 1}`,
// // //         columns: [{ name: "Price", isEditing: false }],
// // //         rows: [],
// // //       },
// // //     ]);
// // //   };

// // //   const deleteSection = (sectionIndex) => {
// // //     const updatedSections = sections.filter(
// // //       (_, index) => index !== sectionIndex
// // //     );
// // //     setSections(updatedSections);
// // //   };

// // //   const updateSectionName = (sectionIndex, newName) => {
// // //     const updatedSections = [...sections];
// // //     updatedSections[sectionIndex].sectionName = newName;
// // //     setSections(updatedSections);
// // //   };

// // //   const handleSectionNameChange = (sectionIndex, value) => {
// // //     setCurrentSectionName(value);
// // //     setShowSuggestions(true);

// // //     if (value) {
// // //       setFilteredSuggestions(
// // //         suggestions.filter((suggestion) =>
// // //           suggestion.toLowerCase().includes(value.toLowerCase())
// // //         )
// // //       );
// // //     } else {
// // //       setFilteredSuggestions([]);
// // //     }

// // //     updateSectionName(sectionIndex, value);
// // //   };

// // //   const handleSuggestionClick = (sectionIndex, suggestion) => {
// // //     setCurrentSectionName(suggestion);
// // //     setFilteredSuggestions([]);
// // //     setShowSuggestions(false);
// // //     updateSectionName(sectionIndex, suggestion);
// // //   };

// // //   const addColumn = (sectionIndex) => {
// // //     setEditingColumnSectionIndex(sectionIndex);
// // //     setNewColumnName("");
// // //   };

// // //   const confirmAddColumn = (sectionIndex) => {
// // //     if (newColumnName.trim() === "") return;

// // //     const updatedSections = [...sections];
// // //     updatedSections[sectionIndex].columns.push({
// // //       name: newColumnName,
// // //       isEditing: false,
// // //     });
// // //     updatedSections[sectionIndex].rows.forEach((row) => row.values.push(""));

// // //     setSections(updatedSections);
// // //     setEditingColumnSectionIndex(null);
// // //   };

// // //   const deleteColumn = (sectionIndex, columnIndex) => {
// // //     const updatedSections = [...sections];
// // //     updatedSections[sectionIndex].columns.splice(columnIndex, 1);
// // //     updatedSections[sectionIndex].rows.forEach((row) =>
// // //       row.values.splice(columnIndex, 1)
// // //     );
// // //     setSections(updatedSections);
// // //   };

// // //   const updateColumnName = (sectionIndex, columnIndex, newName) => {
// // //     const updatedSections = [...sections];
// // //     updatedSections[sectionIndex].columns[columnIndex].name = newName;
// // //     setSections(updatedSections);
// // //   };

// // //   const toggleEditColumnName = (sectionIndex, columnIndex) => {
// // //     const updatedSections = [...sections];
// // //     updatedSections[sectionIndex].columns[columnIndex].isEditing =
// // //       !updatedSections[sectionIndex].columns[columnIndex].isEditing;
// // //     setSections(updatedSections);
// // //   };

// // //   const addRow = (sectionIndex) => {
// // //     const updatedSections = [...sections];
// // //     updatedSections[sectionIndex].rows.push({
// // //       SlNo: updatedSections[sectionIndex].rows.length + 1,
// // //       values: new Array(updatedSections[sectionIndex].columns.length).fill(""),
// // //     });
// // //     setSections(updatedSections);
// // //   };

// // //   const deleteRow = (sectionIndex, rowIndex) => {
// // //     const updatedSections = [...sections];
// // //     updatedSections[sectionIndex].rows.splice(rowIndex, 1);
// // //     setSections(updatedSections);
// // //   };

// // //   const updateCellValue = (sectionIndex, rowIndex, columnIndex, value) => {
// // //     const updatedSections = [...sections];
// // //     updatedSections[sectionIndex].rows[rowIndex].values[columnIndex] = value;
// // //     setSections(updatedSections);
// // //   };

// // //   const calculateTotalPrice = (sectionIndex) => {
// // //     return sections[sectionIndex].rows.reduce((total, row) => {
// // //       const priceColumnIndex = sections[sectionIndex].columns.findIndex(
// // //         (col) => col.name === "Price"
// // //       );
// // //       const price = parseFloat(row.values[priceColumnIndex]) || 0;
// // //       return total + price;
// // //     }, 0);
// // //   };

// // //   const calculateFinalQuotedValue = () => {
// // //     return sections.reduce(
// // //       (total, section) =>
// // //         total + calculateTotalPrice(sections.indexOf(section)),
// // //       0
// // //     );
// // //   };

// // //   const handlePrintData = () => {
// // //     const doc = new jsPDF();

// // //     // Define margin size
// // //     const margin = 10;

// // //     // Function to draw outer box
// // //     const drawOuterBox = () => {
// // //       const pageWidth = doc.internal.pageSize.width;
// // //       const pageHeight = doc.internal.pageSize.height;
// // //       doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
// // //     };

// // //     // Draw outer box on the first page
// // //     drawOuterBox();

// // //     doc.setFontSize(18);
// // //     doc.text("House Decors", margin + 10, margin + 10);

// // //     doc.setFontSize(12);
// // //     doc.text(`Name Of The Customer: ${tableName}`, margin + 10, margin + 20);
// // //     doc.text(`Date: ${date}`, margin + 10, margin + 30);

// // //     let yOffset = margin + 40; // Initial Y offset for content

// // //     sections.forEach((section, sectionIndex) => {
// // //       if (yOffset > 250) {
// // //         doc.addPage();
// // //         drawOuterBox(); // Draw outer box on the new page
// // //         yOffset = margin + 10;
// // //       }

// // //       doc.setFontSize(14);
// // //       doc.text(
// // //         `Section ${sectionIndex + 1}: ${section.sectionName}`,
// // //         margin + 10,
// // //         yOffset
// // //       );
// // //       yOffset += 10;

// // //       doc.setFontSize(12);

// // //       // Column headers
// // //       let headers = ["Sl. No", ...section.columns.map((col) => col.name)];

// // //       // Create dynamic column styles
// // //       let columnStyles = { 0: { cellWidth: 20 }, 1: { cellWidth: 30 } };
// // //       headers.slice(2).forEach((header, index) => {
// // //         columnStyles[index + 2] = { cellWidth: "auto" };
// // //       });

// // //       doc.autoTable({
// // //         startY: yOffset,
// // //         head: [headers],
// // //         body: section.rows.map((row) => [row.SlNo, ...row.values]),
// // //         margin: { top: 10, left: margin + 10, right: margin + 10 }, // Adjust left and right margin
// // //         styles: {
// // //           overflow: "linebreak",
// // //           cellWidth: "wrap",
// // //           minCellHeight: 20, // Minimum cell height
// // //         },
// // //         bodyStyles: {
// // //           valign: "top",
// // //           cellPadding: 2,
// // //         },
// // //         columnStyles: columnStyles,
// // //         didDrawPage: (data) => {
// // //           // Draw outer box on every page
// // //           drawOuterBox();
// // //         },
// // //       });

// // //       // Update Y offset for total price
// // //       yOffset = doc.autoTable.previous.finalY + 10;

// // //       // Total price for the section
// // //       const totalPrice = calculateTotalPrice(sectionIndex);
// // //       doc.text(`Total Price: ${totalPrice.toFixed(2)}`, margin + 10, yOffset);
// // //       yOffset += 20;
// // //     });

// // //     // Final quoted value
// // //     doc.setFontSize(14);
// // //     doc.text(
// // //       `Final Quoted Value: ${calculateFinalQuotedValue().toFixed(2)}`,
// // //       margin + 10,
// // //       yOffset
// // //     );

// // //     doc.save("quoted_data.pdf");
// // //   };
// // //   // const handlePrintData = () => {
// // //   //   const doc = new jsPDF();

// // //   //   // Define margin size
// // //   //   const margin = 10;

// // //   //   // Function to draw outer box
// // //   //   const drawOuterBox = () => {
// // //   //     const pageWidth = doc.internal.pageSize.width;
// // //   //     const pageHeight = doc.internal.pageSize.height;
// // //   //     doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
// // //   //   };

// // //   //   // Draw outer box on the first page
// // //   //   drawOuterBox();

// // //   //   // Set font color for title
// // //   //   doc.setTextColor(0, 0, 0); // Black color
// // //   //   doc.setFontSize(18);
// // //   //   const title = "House Decors";
// // //   //   const pageWidth = doc.internal.pageSize.width;
// // //   //   const textWidth = doc.getTextWidth(title);
// // //   //   const textX = (pageWidth - textWidth) / 2; // Calculate X position to center the text
// // //   //   doc.text(title, textX, margin + 10);

// // //   //   // Set font color for details
// // //   //   doc.setTextColor(50, 50, 50); // Dark gray color
// // //   //   const details = `
// // //   // Shabari complex, 26 & 27,kithaganura villaganur,Margondanahalli,Bengaluru,Kithiganur,
// // //   //                                                       Karnataka 560049
// // //   // GST: 29BWUPA0578C1ZE                                          Ph: 9739185445 / 8553795482`;

// // //   //   // Add details below the title
// // //   //   doc.setFontSize(12);
// // //   //   const detailsX = margin + 10;
// // //   //   const detailsY = margin + 20;
// // //   //   const lineHeight = 6; // Line height for details text

// // //   //   // Calculate height of the details box
// // //   //   const detailsLines = details.split("\n");
// // //   //   const detailsHeight = detailsLines.length * lineHeight;

// // //   //   // Draw box around details
// // //   //   doc.rect(
// // //   //     detailsX - 2,
// // //   //     detailsY - 2,
// // //   //     pageWidth - 2 * margin - 16,
// // //   //     detailsHeight + 4
// // //   //   );

// // //   //   // Add details text
// // //   //   detailsLines.forEach((line, index) => {
// // //   //     doc.text(line, detailsX, detailsY + index * lineHeight);
// // //   //   });

// // //   //   // Adjust yOffset based on the added details box
// // //   //   let yOffset = detailsY + detailsHeight + 10;

// // //   //   // Set font color for rest of the content
// // //   //   doc.setTextColor(0, 0, 0); // Black color
// // //   //   doc.text(`Name Of The Customer: ${tableName}`, margin + 10, yOffset);
// // //   //   yOffset += 10;
// // //   //   doc.text(`Date: ${date}`, margin + 10, yOffset);
// // //   //   yOffset += 10;

// // //   //   // Array to store section totals
// // //   //   const sectionTotals = [];

// // //   //   sections.forEach((section, sectionIndex) => {
// // //   //     if (yOffset > doc.internal.pageSize.height - 30) {
// // //   //       doc.addPage();
// // //   //       drawOuterBox(); // Draw outer box on the new page
// // //   //       yOffset = margin + 10;
// // //   //     }

// // //   //     // Highlight section names
// // //   //     doc.setTextColor(0, 0, 255); // Blue color for section names
// // //   //     doc.setFont("helvetica", "bold");
// // //   //     doc.setFontSize(14);
// // //   //     doc.text(
// // //   //       `Section ${sectionIndex + 1}: ${section.sectionName}`,
// // //   //       margin + 10,
// // //   //       yOffset
// // //   //     );
// // //   //     yOffset += 10;

// // //   //     // Reset font style and color for other content
// // //   //     doc.setTextColor(0, 0, 0); // Black color
// // //   //     doc.setFont("helvetica", "normal");
// // //   //     doc.setFontSize(12);

// // //   //     // Column headers
// // //   //     let headers = ["Sl. No", ...section.columns.map((col) => col.name)];

// // //   //     // Create dynamic column styles
// // //   //     let columnStyles = { 0: { cellWidth: 20 }, 1: { cellWidth: 30 } };
// // //   //     headers.slice(2).forEach((header, index) => {
// // //   //       columnStyles[index + 2] = { cellWidth: "auto" };
// // //   //     });

// // //   //     doc.autoTable({
// // //   //       startY: yOffset,
// // //   //       head: [headers],
// // //   //       body: section.rows.map((row) => [row.SlNo, ...row.values]),
// // //   //       margin: { top: 10, left: margin + 10, right: margin + 10 }, // Adjust left and right margin
// // //   //       styles: {
// // //   //         overflow: "linebreak",
// // //   //         cellWidth: "wrap",
// // //   //         minCellHeight: 20, // Minimum cell height
// // //   //       },
// // //   //       bodyStyles: {
// // //   //         valign: "top",
// // //   //         cellPadding: 2,
// // //   //       },
// // //   //       columnStyles: columnStyles,
// // //   //       didDrawPage: (data) => {
// // //   //         // Draw outer box on every page
// // //   //         drawOuterBox();
// // //   //       },
// // //   //       didDrawCell: (data) => {
// // //   //         // Check if the cell is close to the bottom of the page
// // //   //         if (
// // //   //           data.cell.section === "body" &&
// // //   //           data.row.index === section.rows.length - 1
// // //   //         ) {
// // //   //           const pageHeight = doc.internal.pageSize.height;
// // //   //           if (data.cell.y + data.cell.height > pageHeight - margin) {
// // //   //             doc.addPage();
// // //   //             drawOuterBox(); // Draw outer box on the new page
// // //   //           }
// // //   //         }
// // //   //       },
// // //   //       willDrawCell: (data) => {
// // //   //         // Check if the cell is close to the bottom of the page and force a page break
// // //   //         const pageHeight = doc.internal.pageSize.height;
// // //   //         if (
// // //   //           data.cell.section === "body" &&
// // //   //           data.row.index === section.rows.length - 1
// // //   //         ) {
// // //   //           if (data.cell.y + data.cell.height > pageHeight - margin) {
// // //   //             data.cell.pageBreak = "auto";
// // //   //           }
// // //   //         }
// // //   //       },
// // //   //     });

// // //   //     // Update Y offset for total price
// // //   //     yOffset = doc.autoTable.previous.finalY + 10;

// // //   //     // Total price for the section
// // //   //     const totalPrice = calculateTotalPrice(sectionIndex);
// // //   //     sectionTotals.push({
// // //   //       sectionName: section.sectionName,
// // //   //       totalPrice: totalPrice.toFixed(2),
// // //   //     });
// // //   //     doc.text(`Total Price: ${totalPrice.toFixed(2)}`, margin + 10, yOffset);
// // //   //     yOffset += 20;
// // //   //   });

// // //   //   // Add a new page for the summary
// // //   //   doc.addPage();
// // //   //   drawOuterBox(); // Draw outer box on the new page

// // //   //   // Set font color and size for title
// // //   //   doc.setTextColor(0, 0, 0); // Black color
// // //   //   doc.setFontSize(18);
// // //   //   doc.text(title, textX, margin + 10);

// // //   //   // Set font color for details
// // //   //   doc.setTextColor(50, 50, 50); // Dark gray color
// // //   //   doc.setFontSize(12);
// // //   //   const summaryDetailsX = margin + 10;
// // //   //   const summaryDetailsY = margin + 20;

// // //   //   // Draw box around details
// // //   //   doc.rect(
// // //   //     summaryDetailsX - 2,
// // //   //     summaryDetailsY - 2,
// // //   //     pageWidth - 2 * margin - 16,
// // //   //     detailsHeight + 4
// // //   //   );

// // //   //   // Add details text
// // //   //   detailsLines.forEach((line, index) => {
// // //   //     doc.text(line, summaryDetailsX, summaryDetailsY + index * lineHeight);
// // //   //   });

// // //   //   // Adjust yOffset for summary content
// // //   //   yOffset = summaryDetailsY + detailsHeight + 10;

// // //   //   // Add section totals in a table
// // //   //   const finalBillHeaders = ["Section Name", "Total Price"];
// // //   //   const finalBillBody = sectionTotals.map((section) => [
// // //   //     section.sectionName,
// // //   //     section.totalPrice,
// // //   //   ]);

// // //   //   doc.autoTable({
// // //   //     startY: yOffset,
// // //   //     head: [finalBillHeaders],
// // //   //     body: finalBillBody,
// // //   //     margin: { top: 10, left: margin + 10, right: margin + 10 },
// // //   //     styles: {
// // //   //       overflow: "linebreak",
// // //   //       cellWidth: "wrap",
// // //   //       minCellHeight: 20, // Minimum cell height
// // //   //     },
// // //   //     headStyles: {
// // //   //       fillColor: [22, 160, 133], // Header background color
// // //   //       textColor: 255, // Header text color (white)
// // //   //       fontStyle: "bold",
// // //   //     },
// // //   //     bodyStyles: {
// // //   //       valign: "top",
// // //   //       cellPadding: 2,
// // //   //     },
// // //   //     columnStyles: { 0: { cellWidth: "auto" }, 1: { cellWidth: 40 } },
// // //   //     didDrawPage: (data) => {
// // //   //       // Draw outer box on every page
// // //   //       drawOuterBox();
// // //   //     },
// // //   //   });

// // //   //   // Update yOffset for final quoted value
// // //   //   yOffset = doc.autoTable.previous.finalY + 20;

// // //   //   // Final quoted value
// // //   //   doc.setFontSize(14);
// // //   //   doc.setTextColor(0, 0, 0); // Black color
// // //   //   doc.setFont("helvetica", "bold");
// // //   //   doc.text(
// // //   //     `Final Quoted Value: ${calculateFinalQuotedValue().toFixed(2)}`,
// // //   //     margin + 10,
// // //   //     yOffset
// // //   //   );

// // //   //   // Add a new page for the disclaimer
// // //   //   doc.addPage();
// // //   //   drawOuterBox(); // Draw outer box on the new page

// // //   //   // Set font size and style for the disclaimer text
// // //   //   doc.setFontSize(10);
// // //   //   doc.setFont("helvetica", "normal");

// // //   //   const disclaimer = `
// // //   // Brands:
// // //   // * Plywood : Lumber
// // //   // * Laminates : Star
// // //   // * Channels and Hinges: EBCO
// // //   // * Sliding Door Fitting : SAP
// // //   // * Tandem : Ebco
// // //   // * Locks : Godrej or Europa

// // //   // Note:
// // //   // * The Project cost is only with respect to woodwork.
// // //   // * Any additional or subtraction of work shall be reflected in the final invoice.
// // //   // * We at Black & White Interiors are committed to providing the utmost quality and satisfaction to the
// // //   // customers and a value for their money.
// // //   // * The above quotation doesn't include any Kitchen Top, light fixtures, Profile Lights, sensors, or any
// // //   // other artifacts.
// // //   // * The price is an initial estimate and valid for 90 days. The actual quote would be provided once site
// // //   // masking is complete. Further,
// // //   // * To move forward with actual measurement design-based final quote, 10% of the actual value of the
// // //   // project needs to be paid.

// // //   // Terms & Conditions:
// // //   // * The above-mentioned is a rough estimation. The above quote may vary once the designs are finalized.
// // //   // * GST @ 18% EXTRA
// // //   // All Rates Are Inclusive Of All Hardwares.
// // //   // * All telescopic channels will be normal close. Only kitchen will be soft close.
// // //   // * Certain profile handles will be given for kitchen base units which would meet the rate parity.
// // //   // * The total time required for the execution of the project will be 45 days from the date of the
// // //   // receipt of your confirmation.

// // //   // Payment Terms:
// // //   // * At the time of sign-up                       -----10%
// // //   // * At the time of production                    -----40%
// // //   // * At the time of material delivered to site    -----50%

// // //   // Warranty:
// // //   // * All your woodwork is covered under the Chattels Design up to Lifetime warranty. This safeguards you
// // //   // against any defects in all accessories, hardware, and appliances are covered as per the respective
// // //   // Manufacturer's Warranty Policy.
// // //   //   `;

// // //   //   // Function to set text color and print heading
// // //   //   // Function to set text color and print heading
// // //   //   const printHeading = (heading, yOffset, color) => {
// // //   //     // Check if color is an array and has 3 elements
// // //   //     if (Array.isArray(color) && color.length === 3) {
// // //   //       // Ensure color values are between 0 and 255
// // //   //       color.forEach((value) => {
// // //   //         if (value < 0 || value > 255) {
// // //   //           throw new Error(`Invalid color value: ${value}`);
// // //   //         }
// // //   //       });
// // //   //       doc.setTextColor(...color);
// // //   //     } else {
// // //   //       throw new Error("Invalid color argument");
// // //   //     }
// // //   //     doc.text(heading, margin + 10, yOffset);
// // //   //   };

// // //   //   // Print disclaimer headings
// // //   //   const disclaimerLines = disclaimer.split("\n");
// // //   //   let currentY = margin + 10;

// // //   //   disclaimerLines.forEach((line) => {
// // //   //     if (line.trim().endsWith(":")) {
// // //   //       // Heading detection (ends with ':')
// // //   //       printHeading(line, currentY, [255, 0, 0]); // Red color
// // //   //       currentY += 10;
// // //   //     } else {
// // //   //       doc.setTextColor(0, 0, 0); // Black color for regular text
// // //   //       doc.text(line, margin + 10, currentY);
// // //   //       currentY += 6; // Line height for disclaimer text
// // //   //     }
// // //   //   });

// // //   //   // Save the document
// // //   //   doc.save("quoted_data.pdf");
// // //   // };

// // //   return (
// // //     <Container fluid>
// // //       <h2 className="mt-4 d-flex justify-content-center">
// // //         House Decors
// // //       </h2>

// // //       <Row className="mt-3">
// // //         <Col md={6}>
// // //           <Form.Group controlId="tableName">
// // //             <Form.Label>Name Of The Customer</Form.Label>
// // //             <Form.Control
// // //               type="text"
// // //               value={tableName}
// // //               onChange={(e) => setTableName(e.target.value)}
// // //               placeholder="Enter customer name"
// // //             />
// // //           </Form.Group>
// // //         </Col>
// // //         <Col md={6}>
// // //           <Form.Group controlId="date">
// // //             <Form.Label>Date</Form.Label>
// // //             <Form.Control
// // //               type="date"
// // //               value={date}
// // //               onChange={(e) => setDate(e.target.value)}
// // //             />
// // //           </Form.Group>
// // //         </Col>
// // //       </Row>

// // //       <Row className="mt-5">
// // //         <Col>
// // //           <Button variant="primary" onClick={addSection}>
// // //             <i className="bi bi-pencil-square"></i> Add Section
// // //           </Button>

// // //           <Button variant="success" className="ms-3" onClick={handlePrintData}>
// // //             <i className="bi bi-printer-fill"></i> Print Data
// // //           </Button>

// // //           <div className="mt-4">
// // //             {sections.map((section, sectionIndex) => (
// // //               <div key={sectionIndex} className="mt-4">
// // //                 <Row>
// // //                   <Col xs={8} sm={10} className="position-relative">
// // //                     <Form.Control
// // //                       type="text"
// // //                       value={section.sectionName}
// // //                       onChange={(e) =>
// // //                         handleSectionNameChange(sectionIndex, e.target.value)
// // //                       }
// // //                       placeholder={`Section ${sectionIndex + 1} Name`}
// // //                       autoComplete="off"
// // //                     />
// // //                     {/* Suggestions dropdown */}
// // //                     {showSuggestions && filteredSuggestions.length > 0 && (
// // //                       <ul
// // //                         className="list-group position-absolute"
// // //                         style={{
// // //                           width: "100%",
// // //                           zIndex: 1000,
// // //                           maxHeight: "150px",
// // //                           overflowY: "auto",
// // //                           marginTop: "5px",
// // //                         }}
// // //                       >
// // //                         {filteredSuggestions.map((suggestion, idx) => (
// // //                           <li
// // //                             key={idx}
// // //                             className="list-group-item list-group-item-action"
// // //                             onClick={() =>
// // //                               handleSuggestionClick(sectionIndex, suggestion)
// // //                             }
// // //                           >
// // //                             {suggestion}
// // //                           </li>
// // //                         ))}
// // //                       </ul>
// // //                     )}
// // //                   </Col>
// // //                   <Col xs={4} sm={2} className="d-flex justify-content-end">
// // //                     <Button
// // //                       variant="danger"
// // //                       onClick={() => deleteSection(sectionIndex)}
// // //                     >
// // //                       <i className="bi bi-trash2-fill"></i> Section
// // //                     </Button>
// // //                   </Col>
// // //                 </Row>

// // //                 <div className="table-responsive mt-3">
// // //                   <table className="table table-bordered">
// // //                     <thead>
// // //                       <tr>
// // //                         <th>Sl. No</th>
// // //                         {section.columns.map((column, columnIndex) => (
// // //                           <th key={columnIndex}>
// // //                             {column.isEditing ? (
// // //                               <Form.Control
// // //                                 type="text"
// // //                                 value={column.name}
// // //                                 onChange={(e) =>
// // //                                   updateColumnName(
// // //                                     sectionIndex,
// // //                                     columnIndex,
// // //                                     e.target.value
// // //                                   )
// // //                                 }
// // //                                 onBlur={() =>
// // //                                   toggleEditColumnName(
// // //                                     sectionIndex,
// // //                                     columnIndex
// // //                                   )
// // //                                 }
// // //                                 autoFocus
// // //                               />
// // //                             ) : (
// // //                               <span
// // //                                 onClick={() =>
// // //                                   toggleEditColumnName(
// // //                                     sectionIndex,
// // //                                     columnIndex
// // //                                   )
// // //                                 }
// // //                               >
// // //                                 {column.name}
// // //                               </span>
// // //                             )}
// // //                             {column.name !== "Price" && (
// // //                               <Button
// // //                                 variant="danger"
// // //                                 size="sm"
// // //                                 className="ms-2"
// // //                                 onClick={() =>
// // //                                   deleteColumn(sectionIndex, columnIndex)
// // //                                 }
// // //                               >
// // //                                 <i className="bi bi-trash2-fill"></i>
// // //                               </Button>
// // //                             )}
// // //                           </th>
// // //                         ))}

// // //                         {editingColumnSectionIndex === sectionIndex && (
// // //                           <th>
// // //                             <Form.Control
// // //                               type="text"
// // //                               value={newColumnName}
// // //                               onChange={(e) => setNewColumnName(e.target.value)}
// // //                               placeholder="Enter column name"
// // //                               autoFocus
// // //                             />
// // //                             <Button
// // //                               variant="success"
// // //                               className="mt-2"
// // //                               onClick={() => confirmAddColumn(sectionIndex)}
// // //                             >
// // //                               Add Column
// // //                             </Button>
// // //                           </th>
// // //                         )}

// // //                         {editingColumnSectionIndex !== sectionIndex && (
// // //                           <th>
// // //                             <Button
// // //                               variant="success"
// // //                               onClick={() => addColumn(sectionIndex)}
// // //                             >
// // //                               <i className="bi bi-pencil-square"></i> Add Column
// // //                             </Button>
// // //                           </th>
// // //                         )}
// // //                       </tr>
// // //                     </thead>
// // //                     <tbody>
// // //                       {section.rows.map((row, rowIndex) => (
// // //                         <tr key={rowIndex}>
// // //                           <td>{row.SlNo}</td>
// // //                           {row.values.map((value, columnIndex) => (
// // //                             <td key={columnIndex}>
// // //                               <Form.Control
// // //                                 as="textarea"
// // //                                 rows={1}
// // //                                 value={value}
// // //                                 onChange={(e) =>
// // //                                   updateCellValue(
// // //                                     sectionIndex,
// // //                                     rowIndex,
// // //                                     columnIndex,
// // //                                     e.target.value
// // //                                   )
// // //                                 }
// // //                                 placeholder="Enter value"
// // //                                 style={{
// // //                                   padding: "10px",
// // //                                   width: "100%",
// // //                                   fontSize: "16px",
// // //                                   minHeight: "100px",
// // //                                   minWidth: "150px",
// // //                                 }}
// // //                               />
// // //                             </td>
// // //                           ))}
// // //                           <td>
// // //                             <Button
// // //                               variant="danger"
// // //                               onClick={() => deleteRow(sectionIndex, rowIndex)}
// // //                             >
// // //                               <i className="bi bi-trash2-fill"></i>
// // //                             </Button>
// // //                           </td>
// // //                         </tr>
// // //                       ))}
// // //                     </tbody>
// // //                   </table>
// // //                   <Button
// // //                     variant="primary"
// // //                     onClick={() => addRow(sectionIndex)}
// // //                   >
// // //                     <i className="bi bi-pencil-square"></i> Add Row
// // //                   </Button>
// // //                   <div className="mt-3">
// // //                     <strong>Total Price: </strong>
// // //                     {calculateTotalPrice(sectionIndex).toFixed(2)}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </Col>
// // //       </Row>
// // //     </Container>
// // //   );
// // // };

// // // export default DynamicTablePage;

// // // -------------------------------------------------------------------------------------------

// // import React, { useState } from "react";
// // import { Container, Row, Col, Form, Button } from "react-bootstrap";
// // import "bootstrap-icons/font/bootstrap-icons.css";
// // import jsPDF from "jspdf";
// // import "jspdf-autotable";
// // // import { getDatabase, ref, set } from "firebase/database";
// // // import { initializeApp } from "firebase/app";

// // // const firebaseConfig = {
// // //   apiKey: "AIzaSyCQ7tDQ35_T_FB1MriMRtd1o3DqdonNBqw",
// // //   authDomain: "interior-48ebc.firebaseapp.com",
// // //   databaseURL: "https://interior-48ebc-default-rtdb.firebaseio.com",
// // //   projectId: "interior-48ebc",
// // //   storageBucket: "interior-48ebc.appspot.com",
// // //   messagingSenderId: "778423071044",
// // //   appId: "1:778423071044:web:7964a08bb617c2177da711",
// // //   measurementId: "G-KDM1JE0S5X",
// // // };

// // // // Initialize Firebase
// // // const app = initializeApp(firebaseConfig);
// // // const database = getDatabase(app);

// // const DynamicTablePage = () => {
// //   const [tableName, setTableName] = useState("");
// //   const [date, setDate] = useState("");
// //   const [sections, setSections] = useState([]);
// //   const [suggestions] = useState([
// //     "Living Room",
// //     "Bedroom",
// //     "Dining Room",
// //     "Office",
// //     "Kitchen",
// //   ]);
// //   const [filteredSuggestions, setFilteredSuggestions] = useState([]);
// //   const [currentSectionName, setCurrentSectionName] = useState("");
// //   const [showSuggestions, setShowSuggestions] = useState(false);

// //   const addSection = () => {
// //     setSections([
// //       ...sections,
// //       {
// //         sectionName: `Section ${sections.length + 1}`,
// //         rows: [],
// //       },
// //     ]);
// //   };

// //   const deleteSection = (sectionIndex) => {
// //     const updatedSections = sections.filter(
// //       (_, index) => index !== sectionIndex
// //     );
// //     setSections(updatedSections);
// //   };

// //   const updateSectionName = (sectionIndex, newName) => {
// //     const updatedSections = [...sections];
// //     updatedSections[sectionIndex].sectionName = newName;
// //     setSections(updatedSections);
// //   };

// //   const handleSectionNameChange = (sectionIndex, value) => {
// //     setCurrentSectionName(value);
// //     setShowSuggestions(true);

// //     if (value) {
// //       setFilteredSuggestions(
// //         suggestions.filter((suggestion) =>
// //           suggestion.toLowerCase().includes(value.toLowerCase())
// //         )
// //       );
// //     } else {
// //       setFilteredSuggestions([]);
// //     }

// //     updateSectionName(sectionIndex, value);
// //   };

// //   const handleSuggestionClick = (sectionIndex, suggestion) => {
// //     setCurrentSectionName(suggestion);
// //     setFilteredSuggestions([]);
// //     setShowSuggestions(false);
// //     updateSectionName(sectionIndex, suggestion);
// //   };

// //   const addRow = (sectionIndex) => {
// //     const updatedSections = [...sections];
// //     updatedSections[sectionIndex].rows.push({
// //       SlNo: updatedSections[sectionIndex].rows.length + 1,
// //       Product: "",
// //       Description: "",
// //       sqft: "",
// //       rate: "",
// //       Amount: "",
// //     });
// //     setSections(updatedSections);
// //   };

// //   const deleteRow = (sectionIndex, rowIndex) => {
// //     const updatedSections = [...sections];
// //     updatedSections[sectionIndex].rows.splice(rowIndex, 1);
// //     setSections(updatedSections);
// //   };

// //   const updateCellValue = (sectionIndex, rowIndex, columnName, value) => {
// //     const updatedSections = [...sections];
// //     updatedSections[sectionIndex].rows[rowIndex][columnName] = value;

// //     if (columnName === "sqft" || columnName === "rate") {
// //       const sqft =
// //         parseFloat(updatedSections[sectionIndex].rows[rowIndex].sqft) || 0;
// //       const rate =
// //         parseFloat(updatedSections[sectionIndex].rows[rowIndex].rate) || 0;
// //       updatedSections[sectionIndex].rows[rowIndex].Amount = (
// //         sqft * rate
// //       ).toFixed(2);
// //     }

// //     setSections(updatedSections);
// //   };

// //   const calculateTotalPrice = (sectionIndex) => {
// //     return sections[sectionIndex].rows.reduce((total, row) => {
// //       const amount = parseFloat(row.Amount) || 0;
// //       return total + amount;
// //     }, 0);
// //   };

// //   const calculateFinalQuotedValue = () => {
// //     return sections.reduce(
// //       (total, section) =>
// //         total + calculateTotalPrice(sections.indexOf(section)),
// //       0
// //     );
// //   };

// // const handlePrintData = () => {
// //   const doc = new jsPDF();

// //   // Define margin size
// //   const margin = 10;

// //   // Function to draw outer box
// //   const drawOuterBox = () => {
// //     const pageWidth = doc.internal.pageSize.width;
// //     const pageHeight = doc.internal.pageSize.height;
// //     doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
// //   };

// //   // Draw outer box on the first page
// //   drawOuterBox();

// //   // Set font color for title
// //   doc.setTextColor(0, 0, 0); // Black color
// //   doc.setFontSize(18);
// //   const title = "House Decors";
// //   const pageWidth = doc.internal.pageSize.width;
// //   const textWidth = doc.getTextWidth(title);
// //   const textX = (pageWidth - textWidth) / 2; // Calculate X position to center the text
// //   doc.text(title, textX, margin + 10);

// //   // Set font color for details
// //   doc.setTextColor(50, 50, 50); // Dark gray color
// //   const details = `
// //   Shabari complex, 26 & 27,kithaganura villaganur,Margondanahalli,Bengaluru,Kithiganur,
// //                                                         Karnataka 560049
// //   GST: 29BWUPA0578C1ZE                                          Ph: 9739185445 / 8553795482`;

// //   // Add details below the title
// //   doc.setFontSize(12);
// //   const detailsX = margin + 10;
// //   const detailsY = margin + 20;
// //   const lineHeight = 6; // Line height for details text

// //   // Calculate height of the details box
// //   const detailsLines = details.split("\n");
// //   const detailsHeight = detailsLines.length * lineHeight;

// //   // Draw box around details
// //   doc.rect(
// //     detailsX - 2,
// //     detailsY - 2,
// //     pageWidth - 2 * margin - 16,
// //     detailsHeight + 4
// //   );

// //   // Add details text
// //   detailsLines.forEach((line, index) => {
// //     doc.text(line, detailsX, detailsY + index * lineHeight);
// //   });

// //   // Adjust yOffset based on the added details box
// //   let yOffset = detailsY + detailsHeight + 10;

// //   // Set font color for rest of the content
// //   doc.setTextColor(0, 0, 0); // Black color
// //   doc.text(`Name Of The Customer: ${tableName}`, margin + 10, yOffset);
// //   yOffset += 10;
// //   doc.text(`Date: ${date}`, margin + 10, yOffset);
// //   yOffset += 10;

// //   // Array to store section totals
// //   const sectionTotals = [];

// //   sections.forEach((section, sectionIndex) => {
// //     if (yOffset > doc.internal.pageSize.height - 30) {
// //       doc.addPage();
// //       drawOuterBox(); // Draw outer box on the new page
// //       yOffset = margin + 10;
// //     }

// //     // Highlight section names
// //     doc.setTextColor(0, 0, 255); // Blue color for section names
// //     doc.setFont("helvetica", "bold");
// //     doc.setFontSize(14);
// //     doc.text(
// //       `Section ${sectionIndex + 1}: ${section.sectionName}`,
// //       margin + 10,
// //       yOffset
// //     );
// //     yOffset += 10;

// //     // Reset font style and color for other content
// //     doc.setTextColor(0, 0, 0); // Black color
// //     doc.setFont("helvetica", "normal");
// //     doc.setFontSize(12);

// //     // Column headers
// //     let headers = [
// //       "Sl. No",
// //       "Product",
// //       "Description",
// //       "sqft",
// //       "rate",
// //       "Amount",
// //     ];

// //     // Prepare data for autoTable
// //     const tableBody = section.rows.map((row) => [
// //       row.SlNo,
// //       row.Product,
// //       row.Description,
// //       row.sqft,
// //       row.rate,
// //       row.Amount,
// //     ]);

// //     doc.autoTable({
// //       startY: yOffset,
// //       head: [headers],
// //       body: tableBody,
// //       margin: { top: 10, left: margin + 10, right: margin + 10 }, // Adjust left and right margin
// //       styles: {
// //         overflow: "linebreak",
// //         cellWidth: "wrap",
// //         minCellHeight: 20, // Minimum cell height
// //       },
// //       bodyStyles: {
// //         valign: "top",
// //         cellPadding: 2,
// //       },
// //       columnStyles: {
// //         0: { cellWidth: 20 }, // Sl. No
// //         1: { cellWidth: "auto" }, // Product
// //         2: { cellWidth: 50 }, // Description
// //         3: { cellWidth: 20 }, // sqft
// //         4: { cellWidth: 20 }, // rate
// //         5: { cellWidth: 30 }, // Amount
// //       },
// //       didDrawPage: (data) => {
// //         // Draw outer box on every page
// //         drawOuterBox();
// //       },
// //     });

// //     // Update Y offset for total price
// //     yOffset = doc.autoTable.previous.finalY + 10;

// //     // Total price for the section
// //     const totalPrice = calculateTotalPrice(sectionIndex);
// //     sectionTotals.push({
// //       sectionName: section.sectionName,
// //       totalPrice: totalPrice.toFixed(2),
// //     });
// //     doc.text(`Total Price: ${totalPrice.toFixed(2)}`, margin + 10, yOffset);
// //     yOffset += 20;
// //   });

// //   // Add a new page for the summary
// //   doc.addPage();
// //   drawOuterBox(); // Draw outer box on the new page

// //   // Set font color and size for title
// //   doc.setTextColor(0, 0, 0); // Black color
// //   doc.setFontSize(18);
// //   doc.text(title, textX, margin + 10);

// //   // Set font color for details
// //   doc.setTextColor(50, 50, 50); // Dark gray color
// //   doc.setFontSize(12);
// //   const summaryDetailsX = margin + 10;
// //   const summaryDetailsY = margin + 20;

// //   // Draw box around details
// //   doc.rect(
// //     summaryDetailsX - 2,
// //     summaryDetailsY - 2,
// //     pageWidth - 2 * margin - 16,
// //     detailsHeight + 4
// //   );

// //   // Add details text
// //   detailsLines.forEach((line, index) => {
// //     doc.text(line, summaryDetailsX, summaryDetailsY + index * lineHeight);
// //   });

// //   // Adjust yOffset for summary content
// //   yOffset = summaryDetailsY + detailsHeight + 10;

// //   // Add section totals in a table
// //   const finalBillHeaders = ["Section Name", "Total Price"];
// //   const finalBillBody = sectionTotals.map((section) => [
// //     section.sectionName,
// //     section.totalPrice,
// //   ]);

// //   doc.autoTable({
// //     startY: yOffset,
// //     head: [finalBillHeaders],
// //     body: finalBillBody,
// //     margin: { top: 10, left: margin + 10, right: margin + 10 },
// //     styles: {
// //       overflow: "linebreak",
// //       cellWidth: "wrap",
// //       minCellHeight: 20, // Minimum cell height
// //     },
// //     headStyles: {
// //       fillColor: [22, 160, 133], // Header background color
// //       textColor: 255, // Header text color (white)
// //       fontStyle: "bold",
// //     },
// //     bodyStyles: {
// //       valign: "top",
// //       cellPadding: 2,
// //     },
// //     columnStyles: { 0: { cellWidth: "auto" }, 1: { cellWidth: 40 } },
// //     didDrawPage: (data) => {
// //       // Draw outer box on every page
// //       drawOuterBox();
// //     },
// //   });

// //   // Update yOffset for final quoted value
// //   yOffset = doc.autoTable.previous.finalY + 20;

// //   // Final quoted value
// //   doc.setFontSize(14);
// //   doc.setTextColor(0, 0, 0); // Black color
// //   doc.setFont("helvetica", "bold");
// //   doc.text(
// //     `Final Quoted Value: ${calculateFinalQuotedValue().toFixed(2)}`,
// //     margin + 10,
// //     yOffset
// //   );

// //   // Add a new page for the disclaimer
// //   doc.addPage();
// //   drawOuterBox(); // Draw outer box on the new page

// //   // Set font size and style for the disclaimer text
// //   doc.setFontSize(10);
// //   doc.setFont("helvetica", "normal");

// //   const disclaimer = `
// //   Brands:
// //   * Plywood : Lumber
// //   * Laminates : Star
// //   * Channels and Hinges: EBCO
// //   * Sliding Door Fitting : SAP
// //   * Tandem : Ebco
// //   * Locks : Godrej or Europa

// //   Note:
// //   * The Project cost is only with respect to woodwork.
// //   * Any additional or subtraction of work shall be reflected in the final invoice.
// //   * We at Black & White Interiors are committed to providing the utmost quality and satisfaction to the
// //   customers and a value for their money.
// //   * The above quotation doesn't include any Kitchen Top, light fixtures, Profile Lights, sensors, or any
// //   other artifacts.
// //   * The price is an initial estimate and valid for 90 days. The actual quote would be provided once site
// //   masking is complete. Further,
// //   * To move forward with actual measurement design-based final quote, 10% of the actual value of the
// //   project needs to be paid.

// //   Terms & Conditions:
// //   * The above-mentioned is a rough estimation. The above quote may vary once the designs are finalized.
// //   * GST @ 18% EXTRA
// //   All Rates Are Inclusive Of All Hardwares.
// //   * All telescopic channels will be normal close. Only kitchen will be soft close.
// //   * Certain profile handles will be given for kitchen base units which would meet the rate parity.
// //   * The total time required for the execution of the project will be 45 days from the date of the
// //   receipt of your confirmation.

// //   Payment Terms:
// //   * At the time of sign-up                       -----10%
// //   * At the time of production                    -----40%
// //   * At the time of material delivered to site    -----50%

// //   Warranty:
// //   * All your woodwork is covered under the Chattels Design up to Lifetime warranty. This safeguards you
// //   against any defects in all accessories, hardware, and appliances are covered as per the respective
// //   Manufacturer's Warranty Policy.
// //     `;

// //   const printHeading = (heading, yOffset, color) => {
// //     // Check if color is an array and has 3 elements
// //     if (Array.isArray(color) && color.length === 3) {
// //       // Ensure color values are between 0 and 255
// //       color.forEach((value) => {
// //         if (value < 0 || value > 255) {
// //           throw new Error(`Invalid color value: ${value}`);
// //         }
// //       });
// //       doc.setTextColor(...color);
// //     } else {
// //       throw new Error("Invalid color argument");
// //     }
// //     doc.text(heading, margin + 10, yOffset);
// //   };

// //   // Print disclaimer headings
// //   const disclaimerLines = disclaimer.split("\n");
// //   let currentY = margin + 10;

// //   disclaimerLines.forEach((line) => {
// //     if (line.trim().endsWith(":")) {
// //       // Heading detection (ends with ':')
// //       printHeading(line, currentY, [255, 0, 0]); // Red color
// //       currentY += 10;
// //     } else {
// //       doc.setTextColor(0, 0, 0); // Black color for regular text
// //       doc.text(line, margin + 10, currentY);
// //       currentY += 6; // Line height for disclaimer text
// //     }
// //   });

// //   doc.save(`${tableName}_quote.pdf`);
// //   };

// //   return (
// //     <Container fluid>
// //       <h2 className="mt-4 d-flex justify-content-center">House Decors</h2>

// //       <Row className="mt-3">
// //         <Col md={6}>
// //           <Form.Group controlId="tableName">
// //             <Form.Label>Name Of The Customer</Form.Label>
// //             <Form.Control
// //               type="text"
// //               value={tableName}
// //               onChange={(e) => setTableName(e.target.value)}
// //               placeholder="Enter customer name"
// //             />
// //           </Form.Group>
// //         </Col>
// //         <Col md={6}>
// //           <Form.Group controlId="date">
// //             <Form.Label>Date</Form.Label>
// //             <Form.Control
// //               type="date"
// //               value={date}
// //               onChange={(e) => setDate(e.target.value)}
// //             />
// //           </Form.Group>
// //         </Col>
// //       </Row>

// //       <Row className="mt-5">
// //         <Col>
// //           <Button variant="primary" onClick={addSection}>
// //             <i className="bi bi-pencil-square"></i> Add Section
// //           </Button>

// //           <Button variant="success" className="ms-3" onClick={handlePrintData}>
// //             <i className="bi bi-printer-fill"></i> Print Data
// //           </Button>

// //           <div className="mt-4">
// //             {sections.map((section, sectionIndex) => (
// //               <div key={sectionIndex} className="mt-4">
// //                 <Row>
// //                   <Col xs={8} sm={10} className="position-relative">
// //                     <Form.Control
// //                       type="text"
// //                       value={section.sectionName}
// //                       onChange={(e) =>
// //                         handleSectionNameChange(sectionIndex, e.target.value)
// //                       }
// //                       placeholder={`Section ${sectionIndex + 1} Name`}
// //                       autoComplete="off"
// //                     />
// //                     {/* Suggestions dropdown */}
// //                     {showSuggestions && filteredSuggestions.length > 0 && (
// //                       <ul
// //                         className="list-group position-absolute"
// //                         style={{
// //                           width: "100%",
// //                           zIndex: 1000,
// //                           maxHeight: "150px",
// //                           overflowY: "auto",
// //                           marginTop: "1rem",
// //                         }}
// //                       >
// //                         {filteredSuggestions.map((suggestion, idx) => (
// //                           <li
// //                             key={idx}
// //                             className="list-group-item list-group-item-action"
// //                             onClick={() =>
// //                               handleSuggestionClick(sectionIndex, suggestion)
// //                             }
// //                           >
// //                             {suggestion}
// //                           </li>
// //                         ))}
// //                       </ul>
// //                     )}
// //                   </Col>
// //                   <Col xs={4} sm={2}>
// //                     <Button
// //                       variant="danger"
// //                       onClick={() => deleteSection(sectionIndex)}
// //                     >
// //                       <i className="bi bi-trash"></i> Delete Section
// //                     </Button>
// //                   </Col>
// //                 </Row>

// //                 <Row className="mt-3">
// //                   <Col>
// //                     <Button
// //                       variant="secondary"
// //                       onClick={() => addRow(sectionIndex)}
// //                     >
// //                       <i className="bi bi-plus"></i> Add Row
// //                     </Button>
// //                   </Col>
// //                 </Row>

// //                 <table className="table table-bordered mt-3">
// //                   <thead>
// //                     <tr>
// //                       <th>Sl. No</th>
// //                       <th>Product</th>
// //                       <th>Description</th>
// //                       <th>sqft</th>
// //                       <th>rate</th>
// //                       <th>Amount</th>
// //                       <th>Actions</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {section.rows.map((row, rowIndex) => (
// //                       <tr key={rowIndex}>
// //                         <td>{row.SlNo}</td>
// //                         <td>
// //                           <Form.Control
// //                             as="textarea"
// //                             rows={1}
// //                             value={row.Product}
// //                             onChange={(e) =>
// //                               updateCellValue(
// //                                 sectionIndex,
// //                                 rowIndex,
// //                                 "Product",
// //                                 e.target.value
// //                               )
// //                             }
// //                             placeholder="Enter value"
// //                             style={{
// //                               padding: "10px",
// //                               width: "100%",
// //                               fontSize: "16px",
// //                               minHeight: "100px",
// //                               minWidth: "150px",
// //                             }}
// //                           />
// //                         </td>
// //                         <td>
// //                           <Form.Control
// //                             as="textarea"
// //                             value={row.Description}
// //                             onChange={(e) =>
// //                               updateCellValue(
// //                                 sectionIndex,
// //                                 rowIndex,
// //                                 "Description",
// //                                 e.target.value
// //                               )
// //                             }
// //                             style={{
// //                               padding: "10px",
// //                               width: "100%",
// //                               fontSize: "16px",
// //                               minHeight: "100px",
// //                               minWidth: "150px",
// //                             }}
// //                           />
// //                         </td>
// //                         <td>
// //                           <Form.Control
// //                             type="number"
// //                             value={row.sqft}
// //                             onChange={(e) =>
// //                               updateCellValue(
// //                                 sectionIndex,
// //                                 rowIndex,
// //                                 "sqft",
// //                                 e.target.value
// //                               )
// //                             }
// //                             style={{
// //                               padding: "10px",
// //                               width: "100%",
// //                               fontSize: "16px",
// //                               minHeight: "100px",
// //                               minWidth: "150px",
// //                             }}
// //                           />
// //                         </td>
// //                         <td>
// //                           <Form.Control
// //                             type="number"
// //                             value={row.rate}
// //                             onChange={(e) =>
// //                               updateCellValue(
// //                                 sectionIndex,
// //                                 rowIndex,
// //                                 "rate",
// //                                 e.target.value
// //                               )
// //                             }
// //                             style={{
// //                               padding: "10px",
// //                               width: "100%",
// //                               fontSize: "16px",
// //                               minHeight: "100px",
// //                               minWidth: "150px",
// //                             }}
// //                           />
// //                         </td>
// //                         <td>{row.Amount}</td>
// //                         <td>
// //                           <Button
// //                             variant="danger"
// //                             onClick={() => deleteRow(sectionIndex, rowIndex)}
// //                           >
// //                             <i className="bi bi-trash"></i>
// //                           </Button>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             ))}
// //           </div>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default DynamicTablePage;

// // // const handlePrintData = () => {
// // //     const doc = new jsPDF();

// // //     // Define margin size
// // //     const margin = 10;

// // //     // Function to draw outer box
// // //     const drawOuterBox = () => {
// // //       const pageWidth = doc.internal.pageSize.width;
// // //       const pageHeight = doc.internal.pageSize.height;
// // //       doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
// // //     };

// // //     // Draw outer box on the first page
// // //     drawOuterBox();

// // //     // Set font color for title
// // //     doc.setTextColor(0, 0, 0); // Black color
// // //     doc.setFontSize(18);
// // //     const title = "House Decors";
// // //     const pageWidth = doc.internal.pageSize.width;
// // //     const textWidth = doc.getTextWidth(title);
// // //     const textX = (pageWidth - textWidth) / 2; // Calculate X position to center the text
// // //     doc.text(title, textX, margin + 10);

// // //     // Set font color for details
// // //     doc.setTextColor(50, 50, 50); // Dark gray color
// // //     const details = `
// // //   Shabari complex, 26 & 27,kithaganura villaganur,Margondanahalli,Bengaluru,Kithiganur,
// // //                                                         Karnataka 560049
// // //   GST: 29BWUPA0578C1ZE                                          Ph: 9739185445 / 8553795482`;

// // //     // Add details below the title
// // //     doc.setFontSize(12);
// // //     const detailsX = margin + 10;
// // //     const detailsY = margin + 20;
// // //     const lineHeight = 6; // Line height for details text

// // //     // Calculate height of the details box
// // //     const detailsLines = details.split("\n");
// // //     const detailsHeight = detailsLines.length * lineHeight;

// // //     // Draw box around details
// // //     doc.rect(
// // //       detailsX - 2,
// // //       detailsY - 2,
// // //       pageWidth - 2 * margin - 16,
// // //       detailsHeight + 4
// // //     );

// // //     // Add details text
// // //     detailsLines.forEach((line, index) => {
// // //       doc.text(line, detailsX, detailsY + index * lineHeight);
// // //     });

// // //     // Adjust yOffset based on the added details box
// // //     let yOffset = detailsY + detailsHeight + 10;

// // //     // Set font color for rest of the content
// // //     doc.setTextColor(0, 0, 0); // Black color
// // //     doc.text(`Name Of The Customer: ${tableName}`, margin + 10, yOffset);
// // //     yOffset += 10;
// // //     doc.text(`Date: ${date}`, margin + 10, yOffset);
// // //     yOffset += 10;

// // //     // Array to store section totals
// // //     const sectionTotals = [];

// // //     sections.forEach((section, sectionIndex) => {
// // //       if (yOffset > doc.internal.pageSize.height - 30) {
// // //         doc.addPage();
// // //         drawOuterBox(); // Draw outer box on the new page
// // //         yOffset = margin + 10;
// // //       }

// // //       // Highlight section names
// // //       doc.setTextColor(0, 0, 255); // Blue color for section names
// // //       doc.setFont("helvetica", "bold");
// // //       doc.setFontSize(14);
// // //       doc.text(
// // //         `Section ${sectionIndex + 1}: ${section.sectionName}`,
// // //         margin + 10,
// // //         yOffset
// // //       );
// // //       yOffset += 10;

// // //       // Reset font style and color for other content
// // //       doc.setTextColor(0, 0, 0); // Black color
// // //       doc.setFont("helvetica", "normal");
// // //       doc.setFontSize(12);

// // //       // Column headers
// // //       let headers = ["Sl. No", ...section.columns.map((col) => col.name)];

// // //       // Create dynamic column styles
// // //       let columnStyles = { 0: { cellWidth: 20 }, 1: { cellWidth: 30 } };
// // //       headers.slice(2).forEach((header, index) => {
// // //         columnStyles[index + 2] = { cellWidth: "auto" };
// // //       });

// // //       doc.autoTable({
// // //         startY: yOffset,
// // //         head: [headers],
// // //         body: section.rows.map((row) => [row.SlNo, ...row.values]),
// // //         margin: { top: 10, left: margin + 10, right: margin + 10 }, // Adjust left and right margin
// // //         styles: {
// // //           overflow: "linebreak",
// // //           cellWidth: "wrap",
// // //           minCellHeight: 20, // Minimum cell height
// // //         },
// // //         bodyStyles: {
// // //           valign: "top",
// // //           cellPadding: 2,
// // //         },
// // //         columnStyles: columnStyles,
// // //         didDrawPage: (data) => {
// // //           // Draw outer box on every page
// // //           drawOuterBox();
// // //         },
// // //         didDrawCell: (data) => {
// // //           // Check if the cell is close to the bottom of the page
// // //           if (
// // //             data.cell.section === "body" &&
// // //             data.row.index === section.rows.length - 1
// // //           ) {
// // //             const pageHeight = doc.internal.pageSize.height;
// // //             if (data.cell.y + data.cell.height > pageHeight - margin) {
// // //               doc.addPage();
// // //               drawOuterBox(); // Draw outer box on the new page
// // //             }
// // //           }
// // //         },
// // //         willDrawCell: (data) => {
// // //           // Check if the cell is close to the bottom of the page and force a page break
// // //           const pageHeight = doc.internal.pageSize.height;
// // //           if (
// // //             data.cell.section === "body" &&
// // //             data.row.index === section.rows.length - 1
// // //           ) {
// // //             if (data.cell.y + data.cell.height > pageHeight - margin) {
// // //               data.cell.pageBreak = "auto";
// // //             }
// // //           }
// // //         },
// // //       });

// // //       // Update Y offset for total price
// // //       yOffset = doc.autoTable.previous.finalY + 10;

// // //       // Total price for the section
// // //       const totalPrice = calculateTotalPrice(sectionIndex);
// // //       sectionTotals.push({
// // //         sectionName: section.sectionName,
// // //         totalPrice: totalPrice.toFixed(2),
// // //       });
// // //       doc.text(`Total Price: ${totalPrice.toFixed(2)}`, margin + 10, yOffset);
// // //       yOffset += 20;
// // //     });

// // //     // Add a new page for the summary
// // //     doc.addPage();
// // //     drawOuterBox(); // Draw outer box on the new page

// // //     // Set font color and size for title
// // //     doc.setTextColor(0, 0, 0); // Black color
// // //     doc.setFontSize(18);
// // //     doc.text(title, textX, margin + 10);

// // //     // Set font color for details
// // //     doc.setTextColor(50, 50, 50); // Dark gray color
// // //     doc.setFontSize(12);
// // //     const summaryDetailsX = margin + 10;
// // //     const summaryDetailsY = margin + 20;

// // //     // Draw box around details
// // //     doc.rect(
// // //       summaryDetailsX - 2,
// // //       summaryDetailsY - 2,
// // //       pageWidth - 2 * margin - 16,
// // //       detailsHeight + 4
// // //     );

// // //     // Add details text
// // //     detailsLines.forEach((line, index) => {
// // //       doc.text(line, summaryDetailsX, summaryDetailsY + index * lineHeight);
// // //     });

// // //     // Adjust yOffset for summary content
// // //     yOffset = summaryDetailsY + detailsHeight + 10;

// // //     // Add section totals in a table
// // //     const finalBillHeaders = ["Section Name", "Total Price"];
// // //     const finalBillBody = sectionTotals.map((section) => [
// // //       section.sectionName,
// // //       section.totalPrice,
// // //     ]);

// // //     doc.autoTable({
// // //       startY: yOffset,
// // //       head: [finalBillHeaders],
// // //       body: finalBillBody,
// // //       margin: { top: 10, left: margin + 10, right: margin + 10 },
// // //       styles: {
// // //         overflow: "linebreak",
// // //         cellWidth: "wrap",
// // //         minCellHeight: 20, // Minimum cell height
// // //       },
// // //       headStyles: {
// // //         fillColor: [22, 160, 133], // Header background color
// // //         textColor: 255, // Header text color (white)
// // //         fontStyle: "bold",
// // //       },
// // //       bodyStyles: {
// // //         valign: "top",
// // //         cellPadding: 2,
// // //       },
// // //       columnStyles: { 0: { cellWidth: "auto" }, 1: { cellWidth: 40 } },
// // //       didDrawPage: (data) => {
// // //         // Draw outer box on every page
// // //         drawOuterBox();
// // //       },
// // //     });

// // //     // Update yOffset for final quoted value
// // //     yOffset = doc.autoTable.previous.finalY + 20;

// // //     // Final quoted value
// // //     doc.setFontSize(14);
// // //     doc.setTextColor(0, 0, 0); // Black color
// // //     doc.setFont("helvetica", "bold");
// // //     doc.text(
// // //       `Final Quoted Value: ${calculateFinalQuotedValue().toFixed(2)}`,
// // //       margin + 10,
// // //       yOffset
// // //     );

// // //     // Add a new page for the disclaimer
// // //     doc.addPage();
// // //     drawOuterBox(); // Draw outer box on the new page

// // //     // Set font size and style for the disclaimer text
// // //     doc.setFontSize(10);
// // //     doc.setFont("helvetica", "normal");

// // //   const disclaimer = `
// // // Brands:
// // // * Plywood : Lumber
// // // * Laminates : Star
// // // * Channels and Hinges: EBCO
// // // * Sliding Door Fitting : SAP
// // // * Tandem : Ebco
// // // * Locks : Godrej or Europa

// // // Note:
// // // * The Project cost is only with respect to woodwork.
// // // * Any additional or subtraction of work shall be reflected in the final invoice.
// // // * We at Black & White Interiors are committed to providing the utmost quality and satisfaction to the
// // // customers and a value for their money.
// // // * The above quotation doesn't include any Kitchen Top, light fixtures, Profile Lights, sensors, or any
// // // other artifacts.
// // // * The price is an initial estimate and valid for 90 days. The actual quote would be provided once site
// // // masking is complete. Further,
// // // * To move forward with actual measurement design-based final quote, 10% of the actual value of the
// // // project needs to be paid.

// // // Terms & Conditions:
// // // * The above-mentioned is a rough estimation. The above quote may vary once the designs are finalized.
// // // * GST @ 18% EXTRA
// // // All Rates Are Inclusive Of All Hardwares.
// // // * All telescopic channels will be normal close. Only kitchen will be soft close.
// // // * Certain profile handles will be given for kitchen base units which would meet the rate parity.
// // // * The total time required for the execution of the project will be 45 days from the date of the
// // // receipt of your confirmation.

// // // Payment Terms:
// // // * At the time of sign-up                       -----10%
// // // * At the time of production                    -----40%
// // // * At the time of material delivered to site    -----50%

// // // Warranty:
// // // * All your woodwork is covered under the Chattels Design up to Lifetime warranty. This safeguards you
// // // against any defects in all accessories, hardware, and appliances are covered as per the respective
// // // Manufacturer's Warranty Policy.
// // //   `;

// // //     // Function to set text color and print heading
// // //     // Function to set text color and print heading
// // // const printHeading = (heading, yOffset, color) => {
// // //   // Check if color is an array and has 3 elements
// // //   if (Array.isArray(color) && color.length === 3) {
// // //     // Ensure color values are between 0 and 255
// // //     color.forEach((value) => {
// // //       if (value < 0 || value > 255) {
// // //         throw new Error(`Invalid color value: ${value}`);
// // //       }
// // //     });
// // //     doc.setTextColor(...color);
// // //   } else {
// // //     throw new Error("Invalid color argument");
// // //   }
// // //   doc.text(heading, margin + 10, yOffset);
// // // };

// // // // Print disclaimer headings
// // // const disclaimerLines = disclaimer.split("\n");
// // // let currentY = margin + 10;

// // // disclaimerLines.forEach((line) => {
// // //   if (line.trim().endsWith(":")) {
// // //     // Heading detection (ends with ':')
// // //     printHeading(line, currentY, [255, 0, 0]); // Red color
// // //     currentY += 10;
// // //   } else {
// // //     doc.setTextColor(0, 0, 0); // Black color for regular text
// // //     doc.text(line, margin + 10, currentY);
// // //     currentY += 6; // Line height for disclaimer text
// // //   }
// // // });

// // //     // Save the document
// // //     doc.save("quoted_data.pdf");
// // //   };

// import React, { useState } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { ref, set, get } from "firebase/database";
// import { database } from "./firebase"; // Adjust the path to your firebase configuration

// const DynamicTablePage = () => {
//   const [tableName, setTableName] = useState("");
//   const [date, setDate] = useState("");
//   const [sections, setSections] = useState([]);
//   const [suggestions] = useState([
//     "Living Room",
//     "Bedroom",
//     "Dining Room",
//     "Office",
//     "Kitchen",
//   ]);
//   const [filteredSuggestions, setFilteredSuggestions] = useState([]);
//   const [currentSectionName, setCurrentSectionName] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   const addSection = () => {
//     setSections([
//       ...sections,
//       {
//         sectionName: `Section ${sections.length + 1}`,
//         rows: [],
//       },
//     ]);
//   };

//   const deleteSection = (sectionIndex) => {
//     const updatedSections = sections.filter(
//       (_, index) => index !== sectionIndex
//     );
//     setSections(updatedSections);
//   };

//   const updateSectionName = (sectionIndex, newName) => {
//     const updatedSections = [...sections];
//     updatedSections[sectionIndex].sectionName = newName;
//     setSections(updatedSections);
//   };

//   const handleSectionNameChange = (sectionIndex, value) => {
//     setCurrentSectionName(value);
//     setShowSuggestions(true);

//     if (value) {
//       setFilteredSuggestions(
//         suggestions.filter((suggestion) =>
//           suggestion.toLowerCase().includes(value.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredSuggestions([]);
//     }

//     updateSectionName(sectionIndex, value);
//   };

//   const handleSuggestionClick = (sectionIndex, suggestion) => {
//     setCurrentSectionName(suggestion);
//     setFilteredSuggestions([]);
//     setShowSuggestions(false);
//     updateSectionName(sectionIndex, suggestion);
//   };

//   const addRow = (sectionIndex) => {
//     const updatedSections = [...sections];
//     updatedSections[sectionIndex].rows.push({
//       SlNo: updatedSections[sectionIndex].rows.length + 1,
//       Product: "",
//       Description: "",
//       sqft: "",
//       rate: "",
//       Amount: "",
//     });
//     setSections(updatedSections);
//   };

//   const deleteRow = (sectionIndex, rowIndex) => {
//     const updatedSections = [...sections];
//     updatedSections[sectionIndex].rows.splice(rowIndex, 1);
//     setSections(updatedSections);
//   };

//   const updateCellValue = (sectionIndex, rowIndex, columnName, value) => {
//     const updatedSections = [...sections];
//     updatedSections[sectionIndex].rows[rowIndex][columnName] = value;

//     if (columnName === "sqft" || columnName === "rate") {
//       const sqft =
//         parseFloat(updatedSections[sectionIndex].rows[rowIndex].sqft) || 0;
//       const rate =
//         parseFloat(updatedSections[sectionIndex].rows[rowIndex].rate) || 0;
//       updatedSections[sectionIndex].rows[rowIndex].Amount = (
//         sqft * rate
//       ).toFixed(2);
//     }

//     setSections(updatedSections);
//   };

//   const calculateTotalPrice = (sectionIndex) => {
//     return sections[sectionIndex].rows.reduce((total, row) => {
//       const amount = parseFloat(row.Amount) || 0;
//       return total + amount;
//     }, 0);
//   };

//   const calculateFinalQuotedValue = () => {
//     return sections.reduce(
//       (total, section) =>
//         total + calculateTotalPrice(sections.indexOf(section)),
//       0
//     );
//   };

//   const handlePrintData = () => {
//     const doc = new jsPDF();

//     // Define margin size
//     const margin = 10;

//     // Function to draw outer box
//     const drawOuterBox = () => {
//       const pageWidth = doc.internal.pageSize.width;
//       const pageHeight = doc.internal.pageSize.height;
//       doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
//     };

//     // Draw outer box on the first page
//     drawOuterBox();

//     // Set font color for title
//     doc.setTextColor(0, 0, 0); // Black color
//     doc.setFontSize(18);
//     const title = "House Decors";
//     const pageWidth = doc.internal.pageSize.width;
//     const textWidth = doc.getTextWidth(title);
//     const textX = (pageWidth - textWidth) / 2; // Calculate X position to center the text
//     doc.text(title, textX, margin + 10);

//     // Set font color for details
//     doc.setTextColor(50, 50, 50); // Dark gray color
//     const details = `
//     Shabari complex, 26 & 27,kithaganura villaganur,Margondanahalli,Bengaluru,Kithiganur,
//                                                           Karnataka 560049
//     GST: 29BWUPA0578C1ZE                                          Ph: 9739185445 / 8553795482`;

//     // Add details below the title
//     doc.setFontSize(12);
//     const detailsX = margin + 10;
//     const detailsY = margin + 20;
//     const lineHeight = 6; // Line height for details text

//     // Calculate height of the details box
//     const detailsLines = details.split("\n");
//     const detailsHeight = detailsLines.length * lineHeight;

//     // Draw box around details
//     doc.rect(
//       detailsX - 2,
//       detailsY - 2,
//       pageWidth - 2 * margin - 16,
//       detailsHeight + 4
//     );

//     // Add details text
//     detailsLines.forEach((line, index) => {
//       doc.text(line, detailsX, detailsY + index * lineHeight);
//     });

//     // Adjust yOffset based on the added details box
//     let yOffset = detailsY + detailsHeight + 10;

//     // Set font color for rest of the content
//     doc.setTextColor(0, 0, 0); // Black color
//     doc.text(`Name Of The Customer: ${tableName}`, margin + 10, yOffset);
//     yOffset += 10;
//     doc.text(`Date: ${date}`, margin + 10, yOffset);
//     yOffset += 10;

//     // Array to store section totals
//     const sectionTotals = [];

//     sections.forEach((section, sectionIndex) => {
//       if (yOffset > doc.internal.pageSize.height - 30) {
//         doc.addPage();
//         drawOuterBox(); // Draw outer box on the new page
//         yOffset = margin + 10;
//       }

//       // Highlight section names
//       doc.setTextColor(0, 0, 255); // Blue color for section names
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(14);
//       doc.text(
//         `Section ${sectionIndex + 1}: ${section.sectionName}`,
//         margin + 10,
//         yOffset
//       );
//       yOffset += 10;

//       // Reset font style and color for other content
//       doc.setTextColor(0, 0, 0); // Black color
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(12);

//       // Column headers
//       let headers = [
//         "Sl. No",
//         "Product",
//         "Description",
//         "sqft",
//         "rate",
//         "Amount",
//       ];

//       // Prepare data for autoTable
//       const tableBody = section.rows.map((row) => [
//         row.SlNo,
//         row.Product,
//         row.Description,
//         row.sqft,
//         row.rate,
//         row.Amount,
//       ]);

//       doc.autoTable({
//         startY: yOffset,
//         head: [headers],
//         body: tableBody,
//         margin: { top: 10, left: margin + 10, right: margin + 10 }, // Adjust left and right margin
//         styles: {
//           overflow: "linebreak",
//           cellWidth: "wrap",
//           minCellHeight: 20, // Minimum cell height
//         },
//         bodyStyles: {
//           valign: "top",
//           cellPadding: 2,
//         },
//         columnStyles: {
//           0: { cellWidth: 20 }, // Sl. No
//           1: { cellWidth: "auto" }, // Product
//           2: { cellWidth: 50 }, // Description
//           3: { cellWidth: 20 }, // sqft
//           4: { cellWidth: 20 }, // rate
//           5: { cellWidth: 30 }, // Amount
//         },
//         didDrawPage: (data) => {
//           // Draw outer box on every page
//           drawOuterBox();
//         },
//       });

//       // Update Y offset for total price
//       yOffset = doc.autoTable.previous.finalY + 10;

//       // Total price for the section
//       const totalPrice = calculateTotalPrice(sectionIndex);
//       sectionTotals.push({
//         sectionName: section.sectionName,
//         totalPrice: totalPrice.toFixed(2),
//       });
//       doc.text(`Total Price: ${totalPrice.toFixed(2)}`, margin + 10, yOffset);
//       yOffset += 20;
//     });

//     // Add a new page for the summary
//     doc.addPage();
//     drawOuterBox(); // Draw outer box on the new page

//     // Set font color and size for title
//     doc.setTextColor(0, 0, 0); // Black color
//     doc.setFontSize(18);
//     doc.text(title, textX, margin + 10);

//     // Set font color for details
//     doc.setTextColor(50, 50, 50); // Dark gray color
//     doc.setFontSize(12);
//     const summaryDetailsX = margin + 10;
//     const summaryDetailsY = margin + 20;

//     // Draw box around details
//     doc.rect(
//       summaryDetailsX - 2,
//       summaryDetailsY - 2,
//       pageWidth - 2 * margin - 16,
//       detailsHeight + 4
//     );

//     // Add details text
//     detailsLines.forEach((line, index) => {
//       doc.text(line, summaryDetailsX, summaryDetailsY + index * lineHeight);
//     });

//     // Adjust yOffset for summary content
//     yOffset = summaryDetailsY + detailsHeight + 10;

//     // Add section totals in a table
//     const finalBillHeaders = ["Section Name", "Total Price"];
//     const finalBillBody = sectionTotals.map((section) => [
//       section.sectionName,
//       section.totalPrice,
//     ]);

//     doc.autoTable({
//       startY: yOffset,
//       head: [finalBillHeaders],
//       body: finalBillBody,
//       margin: { top: 10, left: margin + 10, right: margin + 10 },
//       styles: {
//         overflow: "linebreak",
//         cellWidth: "wrap",
//         minCellHeight: 20, // Minimum cell height
//       },
//       headStyles: {
//         fillColor: [22, 160, 133], // Header background color
//         textColor: 255, // Header text color (white)
//         fontStyle: "bold",
//       },
//       bodyStyles: {
//         valign: "top",
//         cellPadding: 2,
//       },
//       columnStyles: { 0: { cellWidth: "auto" }, 1: { cellWidth: 40 } },
//       didDrawPage: (data) => {
//         // Draw outer box on every page
//         drawOuterBox();
//       },
//     });

//     // Update yOffset for final quoted value
//     yOffset = doc.autoTable.previous.finalY + 20;

//     // Final quoted value
//     doc.setFontSize(14);
//     doc.setTextColor(0, 0, 0); // Black color
//     doc.setFont("helvetica", "bold");
//     doc.text(
//       `Final Quoted Value: ${calculateFinalQuotedValue().toFixed(2)}`,
//       margin + 10,
//       yOffset
//     );

//     // Add a new page for the disclaimer
//     doc.addPage();
//     drawOuterBox(); // Draw outer box on the new page

//     // Set font size and style for the disclaimer text
//     doc.setFontSize(10);
//     doc.setFont("helvetica", "normal");

//     const disclaimer = `
//     Brands:
//     * Plywood : Lumber
//     * Laminates : Star
//     * Channels and Hinges: EBCO
//     * Sliding Door Fitting : SAP
//     * Tandem : Ebco
//     * Locks : Godrej or Europa

//     Note:
//     * The Project cost is only with respect to woodwork.
//     * Any additional or subtraction of work shall be reflected in the final invoice.
//     * We at Black & White Interiors are committed to providing the utmost quality and satisfaction to the
//     customers and a value for their money.
//     * The above quotation doesn't include any Kitchen Top, light fixtures, Profile Lights, sensors, or any
//     other artifacts.
//     * The price is an initial estimate and valid for 90 days. The actual quote would be provided once site
//     masking is complete. Further,
//     * To move forward with actual measurement design-based final quote, 10% of the actual value of the
//     project needs to be paid.

//     Terms & Conditions:
//     * The above-mentioned is a rough estimation. The above quote may vary once the designs are finalized.
//     * GST @ 18% EXTRA
//     All Rates Are Inclusive Of All Hardwares.
//     * All telescopic channels will be normal close. Only kitchen will be soft close.
//     * Certain profile handles will be given for kitchen base units which would meet the rate parity.
//     * The total time required for the execution of the project will be 45 days from the date of the
//     receipt of your confirmation.

//     Payment Terms:
//     * At the time of sign-up                       -----10%
//     * At the time of production                    -----40%
//     * At the time of material delivered to site    -----50%

//     Warranty:
//     * All your woodwork is covered under the Chattels Design up to Lifetime warranty. This safeguards you
//     against any defects in all accessories, hardware, and appliances are covered as per the respective
//     Manufacturer's Warranty Policy.
//       `;

//     const printHeading = (heading, yOffset, color) => {
//       // Check if color is an array and has 3 elements
//       if (Array.isArray(color) && color.length === 3) {
//         // Ensure color values are between 0 and 255
//         color.forEach((value) => {
//           if (value < 0 || value > 255) {
//             throw new Error(`Invalid color value: ${value}`);
//           }
//         });
//         doc.setTextColor(...color);
//       } else {
//         throw new Error("Invalid color argument");
//       }
//       doc.text(heading, margin + 10, yOffset);
//     };

//     // Print disclaimer headings
//     const disclaimerLines = disclaimer.split("\n");
//     let currentY = margin + 10;

//     disclaimerLines.forEach((line) => {
//       if (line.trim().endsWith(":")) {
//         // Heading detection (ends with ':')
//         printHeading(line, currentY, [255, 0, 0]); // Red color
//         currentY += 10;
//       } else {
//         doc.setTextColor(0, 0, 0); // Black color for regular text
//         doc.text(line, margin + 10, currentY);
//         currentY += 6; // Line height for disclaimer text
//       }
//     });

//     doc.save(`${tableName}_quote.pdf`);

//     // Save data to Firebase
//     const newRecordId = Date.now(); // Using timestamp as a unique identifier
//     const newRecord = {
//       tableName,
//       date,
//       sections,
//     };

//     // Use ref() and set() functions from Firebase v9
//     set(ref(database, `records/${newRecordId}`), newRecord)
//       .then(() => {
//         // Clear form data after saving
//         setTableName("");
//         setDate("");
//         setSections([]);
//       })
//       .catch((error) => {
//         console.error("Error saving data:", error);
//       });
//   };

//   return (
//     <Container fluid>
//       <h2 className="mt-4 d-flex justify-content-center">
//         Black And White Interiors
//       </h2>

//       <Row className="mt-3">
//         <Col md={6}>
//           <Form.Group controlId="tableName">
//             <Form.Label>Name Of The Customer</Form.Label>
//             <Form.Control
//               type="text"
//               value={tableName}
//               onChange={(e) => setTableName(e.target.value)}
//               placeholder="Enter customer name"
//             />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group controlId="date">
//             <Form.Label>Date</Form.Label>
//             <Form.Control
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mt-5">
//         <Col>
//           <Button variant="primary" onClick={addSection}>
//             <i className="bi bi-pencil-square"></i> Add Section
//           </Button>

//           <Button variant="success" onClick={handlePrintData} className="ms-3">
//             <i className="bi bi-printer"></i> Print Data
//           </Button>
//         </Col>
//       </Row>

//       {sections.map((section, sectionIndex) => (
//         <div key={sectionIndex} className="mt-4">
//           <Row>
//             <Col xs={8} sm={10} className="position-relative">
//               <Form.Control
//                 type="text"
//                 value={section.sectionName}
//                 onChange={(e) =>
//                   handleSectionNameChange(sectionIndex, e.target.value)
//                 }
//                 placeholder={`Section ${sectionIndex + 1} Name`}
//                 autoComplete="off"
//               />
//               {/* Suggestions dropdown */}
//               {showSuggestions && filteredSuggestions.length > 0 && (
//                 <ul
//                   className="list-group position-absolute"
//                   style={{
//                     width: "100%",
//                     zIndex: 1000,
//                     maxHeight: "150px",
//                     overflowY: "auto",
//                     marginTop: "1rem",
//                   }}
//                 >
//                   {filteredSuggestions.map((suggestion, idx) => (
//                     <li
//                       key={idx}
//                       className="list-group-item list-group-item-action"
//                       onClick={() =>
//                         handleSuggestionClick(sectionIndex, suggestion)
//                       }
//                     >
//                       {suggestion}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </Col>
//             <Col xs={4} sm={2}>
//               <Button
//                 variant="danger"
//                 onClick={() => deleteSection(sectionIndex)}
//               >
//                 <i className="bi bi-trash"></i> Delete Section
//               </Button>
//             </Col>
//           </Row>

//           <table className="table mt-3">
//             <thead>
//               <tr>
//                 <th>Sl. No</th>
//                 <th>Product</th>
//                 <th>Description</th>
//                 <th>sqft</th>
//                 <th>rate</th>
//                 <th>Amount</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {section.rows.map((row, rowIndex) => (
//                 <tr key={rowIndex}>
//                   <td>{row.SlNo}</td>
//                   <td>
//                     <Form.Control
//                       as="textarea"
//                       rows={1}
//                       value={row.Product}
//                       onChange={(e) =>
//                         updateCellValue(
//                           sectionIndex,
//                           rowIndex,
//                           "Product",
//                           e.target.value
//                         )
//                       }
//                       placeholder="Enter value"
//                       style={{
//                         padding: "10px",
//                         width: "100%",
//                         fontSize: "16px",
//                         minHeight: "100px",
//                         minWidth: "150px",
//                       }}
//                     />
//                   </td>
//                   <td>
//                     <Form.Control
//                       as="textarea"
//                       value={row.Description}
//                       onChange={(e) =>
//                         updateCellValue(
//                           sectionIndex,
//                           rowIndex,
//                           "Description",
//                           e.target.value
//                         )
//                       }
//                       style={{
//                         padding: "10px",
//                         width: "100%",
//                         fontSize: "16px",
//                         minHeight: "100px",
//                         minWidth: "150px",
//                       }}
//                     />
//                   </td>
//                   <td>
//                     <Form.Control
//                       type="number"
//                       value={row.sqft}
//                       onChange={(e) =>
//                         updateCellValue(
//                           sectionIndex,
//                           rowIndex,
//                           "sqft",
//                           e.target.value
//                         )
//                       }
//                       style={{
//                         padding: "10px",
//                         width: "100%",
//                         fontSize: "16px",
//                         minHeight: "100px",
//                         minWidth: "150px",
//                       }}
//                     />
//                   </td>
//                   <td>
//                     <Form.Control
//                       type="number"
//                       value={row.rate}
//                       onChange={(e) =>
//                         updateCellValue(
//                           sectionIndex,
//                           rowIndex,
//                           "rate",
//                           e.target.value
//                         )
//                       }
//                       style={{
//                         padding: "10px",
//                         width: "100%",
//                         fontSize: "16px",
//                         minHeight: "100px",
//                         minWidth: "150px",
//                       }}
//                     />
//                   </td>
//                   <td>{row.Amount}</td>
//                   <td>
//                     <Button
//                       variant="danger"
//                       onClick={() => deleteRow(sectionIndex, rowIndex)}
//                     >
//                       Delete Row
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <Button variant="primary" onClick={() => addRow(sectionIndex)}>
//             Add Row
//           </Button>

//           {/* <div className="mt-2">
//             <strong>
//               Total Price for Section {sectionIndex + 1}:{" "}
//               {calculateTotalPrice(sectionIndex).toFixed(2)}
//             </strong>
//           </div> */}
//         </div>
//       ))}

//       {/* <div className="mt-4">
//         <h4>Final Quoted Value: {calculateFinalQuotedValue().toFixed(2)}</h4>
//       </div> */}
//     </Container>
//   );
// };

// export default DynamicTablePage;

import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ref, set, get } from "firebase/database";
import { database } from "./firebase"; // Adjust the path to your firebase configuration
import logo from "./logo2.png";

const DynamicTablePage = () => {
  const [tableName, setTableName] = useState("");
  const [date, setDate] = useState("");
  const [sections, setSections] = useState([]);
  const [suggestions] = useState([
    "Living Room",
    "Bedroom",
    "Dining Room",
    "Office",
    "Kitchen",
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [currentSectionName, setCurrentSectionName] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addSection = () => {
    setSections([
      ...sections,
      {
        sectionName: `Section ${sections.length + 1}`,
        rows: [],
      },
    ]);
  };

  const deleteSection = (sectionIndex) => {
    const updatedSections = sections.filter(
      (_, index) => index !== sectionIndex
    );
    setSections(updatedSections);
  };

  const updateSectionName = (sectionIndex, newName) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].sectionName = newName;
    setSections(updatedSections);
  };

  const handleSectionNameChange = (sectionIndex, value) => {
    setCurrentSectionName(value);
    setShowSuggestions(true);

    if (value) {
      setFilteredSuggestions(
        suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredSuggestions([]);
    }

    updateSectionName(sectionIndex, value);
  };

  const handleSuggestionClick = (sectionIndex, suggestion) => {
    setCurrentSectionName(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    updateSectionName(sectionIndex, suggestion);
  };

  const addRow = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].rows.push({
      SlNo: updatedSections[sectionIndex].rows.length + 1,
      Product: "",
      Description: "",
      sqft: "",
      rate: "",
      Amount: "",
    });
    setSections(updatedSections);
  };

  const deleteRow = (sectionIndex, rowIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].rows.splice(rowIndex, 1);
    setSections(updatedSections);
  };

  const updateCellValue = (sectionIndex, rowIndex, columnName, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].rows[rowIndex][columnName] = value;

    if (columnName === "sqft" || columnName === "rate") {
      const sqft =
        parseFloat(updatedSections[sectionIndex].rows[rowIndex].sqft) || 0;
      const rate =
        parseFloat(updatedSections[sectionIndex].rows[rowIndex].rate) || 0;
      updatedSections[sectionIndex].rows[rowIndex].Amount = (
        sqft * rate
      ).toFixed(2);
    }

    setSections(updatedSections);
  };

  const calculateTotalPrice = (sectionIndex) => {
    return sections[sectionIndex].rows.reduce((total, row) => {
      const amount = parseFloat(row.Amount) || 0;
      return total + amount;
    }, 0);
  };

  const calculateFinalQuotedValue = () => {
    return sections.reduce(
      (total, section) =>
        total + calculateTotalPrice(sections.indexOf(section)),
      0
    );
  };

  const handlePrintData = () => {
    const doc = new jsPDF();

    // Define margin size
    const margin = 10;

    // Set background color for the entire page
    // Define page width and height
    const pageWidth1 = doc.internal.pageSize.width;
    const pageHeight1 = doc.internal.pageSize.height;

    // Set background color for the entire page
    doc.setFillColor(255, 245, 225); // Light Yellow-Orange background color (corresponds to #FFF5E1)
    doc.rect(0, 0, pageWidth1, pageHeight1, "F");

    // Function to draw outer box
    doc.setTextColor(204, 85, 0);
    const drawOuterBox = () => {
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
    };

    // Draw outer box on the first page

    drawOuterBox();

    // Add the logo to the left end near the border
    const logo =
      "data:image/png;base64,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";
    const logoX = margin + 5; // Align the logo at the left margin
    const logoY = margin + 2; // Align it near the top
    const logoWidth = 15; // Adjust width of the logo
    const logoHeight = 15; // Adjust height of the logo
    doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);

    // Set font color for title
    doc.setTextColor(204, 85, 0);
    doc.setFontSize(18);
    const title = "House Decors";
    const pageWidth = doc.internal.pageSize.width;
    const textWidth = doc.getTextWidth(title);
    const textX = (pageWidth - textWidth) / 2; // Calculate X position to center the text
    doc.text(title, textX, margin + 10);

    // Set font color for details
    doc.setTextColor(204, 85, 0);
    const details = `
          1st Floor, No.10-B, 12th Street, Landmark, North,Opp. to MPA Church, North 
                      Jagannatha Nagar, Villivakkam,Chennai, Tamil Nadu - 600049.

    GST: 29BWUPA0578C1ZE                                                                Ph: 98400 49606`;

    // Add details below the title
    doc.setFontSize(12);
    const detailsX = margin + 10;
    const detailsY = margin + 20;
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
    doc.setTextColor(0, 0, 0); // Black color
    doc.text(`Name Of The Customer: ${tableName}`, margin + 10, yOffset);
    yOffset += 10;
    doc.text(`Date: ${date}`, margin + 10, yOffset);
    yOffset += 10;

    // Array to store section totals
    const sectionTotals = [];

    sections.forEach((section, sectionIndex) => {
      if (yOffset > doc.internal.pageSize.height - 30) {
        doc.addPage();
        drawOuterBox(); // Draw outer box on the new page
        yOffset = margin + 10;
      }

      // Highlight section names
      doc.setTextColor(255, 87, 51);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(` ${section.sectionName}`, margin + 80, yOffset);
      yOffset += 10;

      // Reset font style and color for other content
      doc.setTextColor(0, 0, 0); // Black color
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      // Column headers
      let headers = [
        "Sl. No",
        "Product",
        "Description",
        "Sqft",
        "Rate",
        "Amount",
      ];

      // Prepare data for autoTable
      const tableBody = section.rows.map((row) => [
        row.SlNo,
        row.Product,
        row.Description,
        row.sqft,
        row.rate,
        row.Amount,
      ]);

      doc.autoTable({
        startY: yOffset,
        head: [headers],
        body: tableBody,
        margin: { top: 10, left: margin + 10, right: margin + 10 }, // Adjust left and right margin
        styles: {
          overflow: "linebreak",
          cellWidth: "wrap",
          minCellHeight: 20, // Minimum cell height
        },
        headStyles: {
          fillColor: [255, 69, 0], // Orange Red for headers (#FF4500)
          textColor: 255, // White text
        },
        bodyStyles: {
          valign: "top",
          cellPadding: 2,
          fillColor: (rowIndex) => {
            return rowIndex % 2 === 0
              ? [255, 218, 185] // Peach (#FFDAB9) for even rows
              : [255, 240, 224]; // Light Peach (#FFF0E0) for odd rows
          },
        },
        columnStyles: {
          0: { cellWidth: 20 }, // Sl. No
          1: { cellWidth: "auto" }, // Product
          2: { cellWidth: 50 }, // Description
          3: { cellWidth: 20 }, // sqft
          4: { cellWidth: 20 }, // rate
          5: { cellWidth: 30 }, // Amount
        },

        didDrawPage: (data) => {
          // Draw outer box on every page
          drawOuterBox();
        },
      });

      // Update Y offset for total price
      yOffset = doc.autoTable.previous.finalY + 10;

      // Total price for the section
      const totalPrice = calculateTotalPrice(sectionIndex);
      sectionTotals.push({
        sectionName: section.sectionName,
        totalPrice: totalPrice.toFixed(2),
      });
      doc.text(`Total Price: ${totalPrice.toFixed(2)}`, margin + 135, yOffset);
      yOffset += 20;
    });

    // Add a new page for the summary
    doc.addPage();
    drawOuterBox(); // Draw outer box on the new page

    doc.setFillColor(255, 245, 225); // Light Yellow-Orange background color (corresponds to #FFF5E1)
    doc.rect(0, 0, pageWidth1, pageHeight1, "F");

    // Set font color and size for title
    doc.setTextColor(255, 87, 51); // Black color
    doc.setFontSize(18);
    doc.text(title, textX, margin + 10);

    // Set font color for details
    doc.setTextColor(50, 50, 50); // Dark gray color
    doc.setFontSize(12);
    const summaryDetailsX = margin + 10;
    const summaryDetailsY = margin + 20;

    // Draw box around details
    doc.rect(
      summaryDetailsX - 2,
      summaryDetailsY - 2,
      pageWidth - 2 * margin - 16,
      detailsHeight + 4
    );

    // Add details text
    doc.setTextColor(204, 85, 0);
    detailsLines.forEach((line, index) => {
      doc.text(line, summaryDetailsX, summaryDetailsY + index * lineHeight);
    });

    // Adjust yOffset for summary content
    yOffset = summaryDetailsY + detailsHeight + 10;

    // Add section totals in a table
    const finalBillHeaders = ["Section Name", "Total Price"];
    const finalBillBody = sectionTotals.map((section) => [
      section.sectionName,
      section.totalPrice,
    ]);

    doc.autoTable({
      startY: yOffset,
      head: [finalBillHeaders],
      body: finalBillBody,
      margin: { top: 10, left: margin + 10, right: margin + 10 },
      styles: {
        overflow: "linebreak",
        cellWidth: "wrap",
        minCellHeight: 20, // Minimum cell height
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
    yOffset = doc.autoTable.previous.finalY + 20;

    // Final quoted value
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Black color
    doc.setFont("helvetica", "bold");
    doc.text(
      `Final Quoted Value: ${calculateFinalQuotedValue().toFixed(2)}`,
      margin + 10,
      yOffset
    );

    // Add a new page for the disclaimer
    doc.addPage();
    // Draw outer box on the new page

    doc.setFillColor(255, 245, 225); // Light Yellow-Orange background color (corresponds to #FFF5E1)
    doc.rect(0, 0, pageWidth1, pageHeight1, "F");
    drawOuterBox();

    // Set font size and style for the disclaimer text
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const disclaimer = `
    Brands:
    * Plywood : Lumber
    * Laminates : Star
    * Channels and Hinges: EBCO
    * Sliding Door Fitting : SAP
    * Tandem : Ebco
    * Locks : Godrej or Europa

    Note:
    * The Project cost is only with respect to woodwork.
    * Any additional or subtraction of work shall be reflected in the final invoice.
    * We at Black & White Interiors are committed to providing the utmost quality and satisfaction to the
    customers and a value for their money.
    * The above quotation doesn't include any Kitchen Top, light fixtures, Profile Lights, sensors, or any
    other artifacts.
    * The price is an initial estimate and valid for 90 days. The actual quote would be provided once site
    masking is complete. Further,
    * To move forward with actual measurement design-based final quote, 10% of the actual value of the
    project needs to be paid.

    Terms & Conditions:
    * The above-mentioned is a rough estimation. The above quote may vary once the designs are finalized.
    * GST @ 18% EXTRA
    All Rates Are Inclusive Of All Hardwares.
    * All telescopic channels will be normal close. Only kitchen will be soft close.
    * Certain profile handles will be given for kitchen base units which would meet the rate parity.
    * The total time required for the execution of the project will be 45 days from the date of the
    receipt of your confirmation.

    Payment Terms:
    * At the time of sign-up                       -----10%
    * At the time of production                    -----40%
    * At the time of material delivered to site    -----50%

    Warranty:
    * All your woodwork is covered under the Chattels Design up to Lifetime warranty. This safeguards you
    against any defects in all accessories, hardware, and appliances are covered as per the respective
    Manufacturer's Warranty Policy.
      `;

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

    doc.save(`${tableName}_quote.pdf`);

    // Save data to Firebase
    const newRecordId = Date.now(); // Using timestamp as a unique identifier
    const newRecord = {
      tableName,
      date,
      sections,
    };

    // Use ref() and set() functions from Firebase v9
    set(ref(database, `records/${newRecordId}`), newRecord)
      .then(() => {
        // Clear form data after saving
        setTableName("");
        setDate("");
        setSections([]);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor: "#FFF5E1",
        minHeight: "100vh",
        padding: "0 15px",
      }}
    >
      {/* Header */}
      <Row className="align-items-center mb-4">
        <Col xs={12} className="text-center">
          <img src={logo} alt="Logo" style={{ maxHeight: "60px" }} />
        </Col>
        <Col xs={12} className="text-center">
          <h2
            className="mt-2"
            style={{
              color: "#CC5500", // Burnt Orange
              fontFamily: "'Stylish', serif",
              fontWeight: "400",
              fontStyle: "normal",
              fontSize: "36px",
            }}
          >
            Black And White Interiors
          </h2>
        </Col>
      </Row>

      {/* Customer and Date Fields */}
      <Row className="mt-3">
        <Col xs={12} sm={6}>
          <Form.Group controlId="tableName">
            <Form.Label style={{ color: "#CC5500" }}>
              Name Of The Customer
            </Form.Label>
            <Form.Control
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="Enter customer name"
              style={{
                backgroundColor: "#FFF5E1", // Input Area Background
                borderColor: "#FF8C00", // Input Area Border
                padding: "10px",
                fontSize: "16px",
              }}
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6}>
          <Form.Group controlId="date">
            <Form.Label style={{ color: "#CC5500" }}>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                backgroundColor: "#FFF5E1",
                borderColor: "#FF8C00",
                padding: "10px",
                fontSize: "16px",
              }}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Buttons */}
      <Row className="mt-5">
        <Col>
          <Button
            variant="primary"
            onClick={addSection}
            style={{
              backgroundColor: "#FF4500", // Orange Red for Primary Button
              borderColor: "#FF4500",
              fontSize: "18px",
              padding: "10px 20px",
            }}
          >
            <i className="bi bi-pencil-square"></i> Add Section
          </Button>

          <Button
            variant="success"
            onClick={handlePrintData}
            className="ms-3"
            style={{
              backgroundColor: "#FFA500", // Orange for Secondary Button
              borderColor: "#FFA500",
              fontSize: "18px",
              padding: "10px 20px",
            }}
          >
            <i className="bi bi-printer"></i> Print Data
          </Button>
        </Col>
      </Row>

      {/* Sections and Rows */}
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mt-4">
          <Row>
            <Col xs={8} sm={10}>
              <Form.Control
                type="text"
                value={section.sectionName}
                onChange={(e) =>
                  handleSectionNameChange(sectionIndex, e.target.value)
                }
                placeholder={`Section ${sectionIndex + 1} Name`}
                autoComplete="off"
                style={{
                  backgroundColor: "#FFF5E1",
                  borderColor: "#FF8C00",
                  padding: "10px",
                  fontSize: "16px",
                }}
              />
            </Col>
            <Col xs={4} sm={2}>
              <Button
                variant="danger"
                onClick={() => deleteSection(sectionIndex)}
                style={{
                  backgroundColor: "#FF6347", // Tomato Red for Delete Button
                  borderColor: "#FF6347",
                  fontSize: "16px",
                  padding: "8px 12px",
                }}
              >
                <i className="bi bi-trash"></i> Delete Section
              </Button>
            </Col>
          </Row>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table
              className="table mt-3"
              style={{
                backgroundColor: "#FFF5E1",
                border: "1px solid #FF8C00",
              }}
            >
              <thead>
                <tr>
                  <th>Sl. No</th>
                  <th>Product</th>
                  <th>Description</th>
                  <th>sqft</th>
                  <th>rate</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    style={{
                      backgroundColor:
                        rowIndex % 2 === 0 ? "#FFE4E1" : "#FFDAB9", // Alternating row colors
                    }}
                  >
                    <td>{row.SlNo}</td>
                    <td>
                      <Form.Control
                        as="textarea"
                        rows={1}
                        value={row.Product}
                        onChange={(e) =>
                          updateCellValue(
                            sectionIndex,
                            rowIndex,
                            "Product",
                            e.target.value
                          )
                        }
                        placeholder="Enter value"
                        style={{
                          padding: "10px",
                          width: "100%",
                          fontSize: "16px",
                          minHeight: "100px",
                          minWidth: "150px",
                          backgroundColor: "#FFF5E1",
                          borderColor: "#FF8C00",
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        as="textarea"
                        value={row.Description}
                        onChange={(e) =>
                          updateCellValue(
                            sectionIndex,
                            rowIndex,
                            "Description",
                            e.target.value
                          )
                        }
                        style={{
                          padding: "10px",
                          width: "100%",
                          fontSize: "16px",
                          minHeight: "100px",
                          minWidth: "150px",
                          backgroundColor: "#FFF5E1",
                          borderColor: "#FF8C00",
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        value={row.sqft}
                        onChange={(e) =>
                          updateCellValue(
                            sectionIndex,
                            rowIndex,
                            "sqft",
                            e.target.value
                          )
                        }
                        style={{
                          padding: "10px",
                          width: "100%",
                          fontSize: "16px",
                          backgroundColor: "#FFF5E1",
                          borderColor: "#FF8C00",
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        value={row.rate}
                        onChange={(e) =>
                          updateCellValue(
                            sectionIndex,
                            rowIndex,
                            "rate",
                            e.target.value
                          )
                        }
                        style={{
                          padding: "10px",
                          width: "100%",
                          fontSize: "16px",
                          backgroundColor: "#FFF5E1",
                          borderColor: "#FF8C00",
                        }}
                      />
                    </td>
                    <td>{row.Amount}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => deleteRow(sectionIndex, rowIndex)}
                        style={{
                          backgroundColor: "#FF6347",
                          borderColor: "#FF6347",
                          padding: "8px 12px",
                          fontSize: "16px",
                        }}
                      >
                        Delete Row
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Button
            variant="primary"
            onClick={() => addRow(sectionIndex)}
            style={{
              backgroundColor: "#FF4500",
              borderColor: "#FF4500",
              fontSize: "16px",
              padding: "10px 20px",
            }}
          >
            Add Row
          </Button>
        </div>
      ))}
    </Container>
  );
};

export default DynamicTablePage;
