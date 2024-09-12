// // // // import React, { useState } from "react";
// // // // import { Container, Row, Col, Form, Button } from "react-bootstrap";
// // // // import "bootstrap-icons/font/bootstrap-icons.css";

// // // // const DynamicTablePage = () => {
// // // //   const [tableName, setTableName] = useState("");
// // // //   const [date, setDate] = useState("");
// // // //   const [sections, setSections] = useState([]);
// // // //   const [newColumnName, setNewColumnName] = useState(""); // Track the new column name
// // // //   const [editingColumnSectionIndex, setEditingColumnSectionIndex] =
// // // //     useState(null); // Track which section is being edited

// // // //   const addSection = () => {
// // // //     setSections([
// // // //       ...sections,
// // // //       {
// // // //         sectionName: `Section ${sections.length + 1}`,
// // // //         columns: [
// // // //           { name: "Price", isEditing: false }, // Add the "Price" column by default
// // // //         ],
// // // //         rows: [],
// // // //       },
// // // //     ]);
// // // //   };

// // // //   const deleteSection = (sectionIndex) => {
// // // //     const updatedSections = sections.filter(
// // // //       (_, index) => index !== sectionIndex
// // // //     );
// // // //     setSections(updatedSections);
// // // //   };

// // // //   const updateSectionName = (sectionIndex, newName) => {
// // // //     const updatedSections = [...sections];
// // // //     updatedSections[sectionIndex].sectionName = newName;
// // // //     setSections(updatedSections);
// // // //   };

// // // //   const addColumn = (sectionIndex) => {
// // // //     // Set the section index where the new column is being added
// // // //     setEditingColumnSectionIndex(sectionIndex);
// // // //     // Reset the new column name input
// // // //     setNewColumnName("");
// // // //   };

// // // //   const confirmAddColumn = (sectionIndex) => {
// // // //     if (newColumnName.trim() === "") return; // Ensure the column name is not empty

// // // //     const updatedSections = [...sections];
// // // //     updatedSections[sectionIndex].columns.push({
// // // //       name: newColumnName,
// // // //       isEditing: false,
// // // //     });
// // // //     updatedSections[sectionIndex].rows.forEach((row) => row.values.push(""));

// // // //     setSections(updatedSections);
// // // //     setEditingColumnSectionIndex(null); // Reset the editing state
// // // //   };

// // // //   const deleteColumn = (sectionIndex, columnIndex) => {
// // // //     const updatedSections = [...sections];
// // // //     updatedSections[sectionIndex].columns.splice(columnIndex, 1);
// // // //     updatedSections[sectionIndex].rows.forEach((row) =>
// // // //       row.values.splice(columnIndex, 1)
// // // //     );
// // // //     setSections(updatedSections);
// // // //   };

// // // //   const updateColumnName = (sectionIndex, columnIndex, newName) => {
// // // //     const updatedSections = [...sections];
// // // //     updatedSections[sectionIndex].columns[columnIndex].name = newName;
// // // //     setSections(updatedSections);
// // // //   };

// // // //   const toggleEditColumnName = (sectionIndex, columnIndex) => {
// // // //     const updatedSections = [...sections];
// // // //     updatedSections[sectionIndex].columns[columnIndex].isEditing =
// // // //       !updatedSections[sectionIndex].columns[columnIndex].isEditing;
// // // //     setSections(updatedSections);
// // // //   };

// // // //   const addRow = (sectionIndex) => {
// // // //     const updatedSections = [...sections];
// // // //     updatedSections[sectionIndex].rows.push({
// // // //       SlNo: updatedSections[sectionIndex].rows.length + 1,
// // // //       values: new Array(updatedSections[sectionIndex].columns.length).fill(""),
// // // //     });
// // // //     setSections(updatedSections);
// // // //   };

// // // //   const deleteRow = (sectionIndex, rowIndex) => {
// // // //     const updatedSections = [...sections];
// // // //     updatedSections[sectionIndex].rows.splice(rowIndex, 1);
// // // //     setSections(updatedSections);
// // // //   };

// // // //   const updateCellValue = (sectionIndex, rowIndex, columnIndex, value) => {
// // // //     const updatedSections = [...sections];
// // // //     updatedSections[sectionIndex].rows[rowIndex].values[columnIndex] = value;
// // // //     setSections(updatedSections);
// // // //   };

// // // //   const calculateTotalPrice = (sectionIndex) => {
// // // //     return sections[sectionIndex].rows.reduce((total, row) => {
// // // //       const priceColumnIndex = sections[sectionIndex].columns.findIndex(
// // // //         (col) => col.name === "Price"
// // // //       );
// // // //       const price = parseFloat(row.values[priceColumnIndex]) || 0;
// // // //       return total + price;
// // // //     }, 0);
// // // //   };

// // // //   return (
// // // //     <Container fluid>
// // // //       <h2 className=" mt-4 d-flex justify-content-center">
// // // //         Black And White Interiors{" "}
// // // //       </h2>

// // // //       {/* Form for Table Name and Date */}
// // // //       <Row className="mt-3">
// // // //         <Col md={6}>
// // // //           <Form.Group controlId="tableName">
// // // //             <Form.Label>Name Of The Customer</Form.Label>
// // // //             <Form.Control
// // // //               type="text"
// // // //               value={tableName}
// // // //               onChange={(e) => setTableName(e.target.value)}
// // // //               placeholder="Enter table name"
// // // //             />
// // // //           </Form.Group>
// // // //         </Col>
// // // //         <Col md={6}>
// // // //           <Form.Group controlId="date">
// // // //             <Form.Label>Date</Form.Label>
// // // //             <Form.Control
// // // //               type="date"
// // // //               value={date}
// // // //               onChange={(e) => setDate(e.target.value)}
// // // //             />
// // // //           </Form.Group>
// // // //         </Col>
// // // //       </Row>

// // // //       {/* Table Section */}
// // // //       <Row className="mt-5">
// // // //         <Col>
// // // //           <Button variant="primary" onClick={addSection}>
// // // //             <i className="bi bi-pencil-square"> </i>
// // // //             Add Section
// // // //           </Button>

// // // //           {/* Actual Content for Display */}
// // // //           <div className="mt-4">
// // // //             {sections.map((section, sectionIndex) => (
// // // //               <div key={sectionIndex} className="mt-4">
// // // //                 <Row>
// // // //                   <Col md={6}>
// // // //                     <Form.Control
// // // //                       type="text"
// // // //                       value={section.sectionName}
// // // //                       onChange={(e) =>
// // // //                         updateSectionName(sectionIndex, e.target.value)
// // // //                       }
// // // //                       placeholder={`Section ${sectionIndex + 1} Name`}
// // // //                     />
// // // //                   </Col>
// // // //                   <Col md={6}>
// // // //                     <Button
// // // //                       variant="danger"
// // // //                       onClick={() => deleteSection(sectionIndex)}
// // // //                     >
// // // //                       <i className="bi bi-trash2-fill"> </i>
// // // //                       Delete Section
// // // //                     </Button>
// // // //                   </Col>
// // // //                 </Row>

// // // //                 <div className="table-responsive mt-3">
// // // //                   <table className="table table-bordered">
// // // //                     <thead>
// // // //                       <tr>
// // // //                         <th>Sl. No</th>
// // // //                         {section.columns.map((column, columnIndex) => (
// // // //                           <th key={columnIndex}>
// // // //                             {column.isEditing ? (
// // // //                               <Form.Control
// // // //                                 type="text"
// // // //                                 value={column.name}
// // // //                                 onChange={(e) =>
// // // //                                   updateColumnName(
// // // //                                     sectionIndex,
// // // //                                     columnIndex,
// // // //                                     e.target.value
// // // //                                   )
// // // //                                 }
// // // //                                 onBlur={() =>
// // // //                                   toggleEditColumnName(
// // // //                                     sectionIndex,
// // // //                                     columnIndex
// // // //                                   )
// // // //                                 }
// // // //                                 autoFocus
// // // //                               />
// // // //                             ) : (
// // // //                               <span
// // // //                                 onClick={() =>
// // // //                                   toggleEditColumnName(
// // // //                                     sectionIndex,
// // // //                                     columnIndex
// // // //                                   )
// // // //                                 }
// // // //                               >
// // // //                                 {column.name}
// // // //                               </span>
// // // //                             )}
// // // //                             {column.name !== "Price" && (
// // // //                               <Button
// // // //                                 variant="danger"
// // // //                                 size="sm"
// // // //                                 className="ms-2"
// // // //                                 onClick={() =>
// // // //                                   deleteColumn(sectionIndex, columnIndex)
// // // //                                 }
// // // //                               >
// // // //                                 <i className="bi bi-trash2-fill"></i>
// // // //                               </Button>
// // // //                             )}
// // // //                           </th>
// // // //                         ))}

// // // //                         {/* Render column input if the section is being edited */}
// // // //                         {editingColumnSectionIndex === sectionIndex && (
// // // //                           <th>
// // // //                             <Form.Control
// // // //                               type="text"
// // // //                               value={newColumnName}
// // // //                               onChange={(e) => setNewColumnName(e.target.value)}
// // // //                               placeholder="Enter column name"
// // // //                               autoFocus
// // // //                             />
// // // //                             <Button
// // // //                               variant="success"
// // // //                               className="mt-2"
// // // //                               onClick={() => confirmAddColumn(sectionIndex)}
// // // //                             >
// // // //                               Add Column
// // // //                             </Button>
// // // //                           </th>
// // // //                         )}

// // // //                         {/* Add Column Button */}
// // // //                         {editingColumnSectionIndex !== sectionIndex && (
// // // //                           <th>
// // // //                             <Button
// // // //                               variant="success"
// // // //                               onClick={() => addColumn(sectionIndex)}
// // // //                             >
// // // //                               <i className="bi bi-pencil-square"> </i>
// // // //                               Add Column
// // // //                             </Button>
// // // //                           </th>
// // // //                         )}
// // // //                       </tr>
// // // //                     </thead>
// // // //                     <tbody>
// // // //                       {section.rows.map((row, rowIndex) => (
// // // //                         <tr key={rowIndex}>
// // // //                           <td>{row.SlNo}</td>
// // // //                           {row.values.map((value, columnIndex) => (
// // // //                             <td key={columnIndex}>
// // // //                               <Form.Control
// // // //                                 as="textarea"
// // // //                                 rows={1}
// // // //                                 value={value}
// // // //                                 onChange={(e) =>
// // // //                                   updateCellValue(
// // // //                                     sectionIndex,
// // // //                                     rowIndex,
// // // //                                     columnIndex,
// // // //                                     e.target.value
// // // //                                   )
// // // //                                 }
// // // //                                 placeholder="Enter value"
// // // //                               />
// // // //                             </td>
// // // //                           ))}
// // // //                           <td>
// // // //                             <Button
// // // //                               variant="danger"
// // // //                               onClick={() => deleteRow(sectionIndex, rowIndex)}
// // // //                             >
// // // //                               <i className="bi bi-trash2-fill"></i>
// // // //                             </Button>
// // // //                           </td>
// // // //                         </tr>
// // // //                       ))}
// // // //                     </tbody>
// // // //                   </table>
// // // //                   <Button
// // // //                     variant="primary"
// // // //                     onClick={() => addRow(sectionIndex)}
// // // //                   >
// // // //                     <i className="bi bi-pencil-square"> </i>
// // // //                     Add Row
// // // //                   </Button>
// // // //                   <div className="mt-3">
// // // //                     <strong>Total Price: </strong>
// // // //                     {calculateTotalPrice(sectionIndex).toFixed(2)}
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </Col>
// // // //       </Row>
// // // //     </Container>
// // // //   );
// // // // };

// // // // export default DynamicTablePage;

// // // import React, { useState } from "react";
// // // import { Container, Row, Col, Form, Button } from "react-bootstrap";

// // // import "bootstrap-icons/font/bootstrap-icons.css";
// // // import jsPDF from "jspdf";
// // // import "jspdf-autotable"; // No need to import anything specific from 'jspdf-autotable'

// // // const DynamicTablePage = () => {
// // //   const [tableName, setTableName] = useState("");
// // //   const [date, setDate] = useState("");
// // //   const [sections, setSections] = useState([]);
// // //   const [newColumnName, setNewColumnName] = useState("");
// // //   const [editingColumnSectionIndex, setEditingColumnSectionIndex] =
// // //     useState(null);

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

// // //     doc.setFontSize(18);
// // //     doc.text("BLACK AND WHITE INTERIORS", 20, 20);

// // //     doc.setFontSize(12);
// // //     doc.text(`Name Of The Customer: ${tableName}`, 20, 30);
// // //     doc.text(`Date: ${date}`, 20, 40);

// // //     let yOffset = 50; // Initial Y offset for content

// // //     sections.forEach((section, sectionIndex) => {
// // //       if (yOffset > 250) {
// // //         doc.addPage();
// // //         yOffset = 20;
// // //       }

// // //       doc.setFontSize(14);
// // //       doc.text(
// // //         `Section ${sectionIndex + 1}: ${section.sectionName}`,
// // //         20,
// // //         yOffset
// // //       );
// // //       yOffset += 10;

// // //       doc.setFontSize(12);

// // //       // Column headers
// // //       let headers = ["Sl. No", ...section.columns.map((col) => col.name)];
// // //       doc.autoTable({
// // //         startY: yOffset,
// // //         head: [headers],
// // //         body: section.rows.map((row) => [row.SlNo, ...row.values]),
// // //         margin: { top: 10 },
// // //       });

// // //       // Update Y offset for total price
// // //       yOffset = doc.autoTable.previous.finalY + 10;

// // //       // Total price for the section
// // //       const totalPrice = calculateTotalPrice(sectionIndex);
// // //       doc.text(`Total Price: ${totalPrice.toFixed(2)}`, 20, yOffset);
// // //       yOffset += 20;
// // //     });

// // //     // Final quoted value
// // //     doc.setFontSize(14);
// // //     doc.text(
// // //       `Final Quoted Value: ${calculateFinalQuotedValue().toFixed(2)}`,
// // //       20,
// // //       yOffset
// // //     );

// // //     doc.save("quoted_data.pdf");
// // //   };

// // //   return (
// // //     <Container fluid>
// // //       <h2 className="mt-4 d-flex justify-content-center">
// // //         Black And White Interiors
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
// // //                   <Col xs={8} sm={10}>
// // //                     <Form.Control
// // //                       type="text"
// // //                       value={section.sectionName}
// // //                       onChange={(e) =>
// // //                         updateSectionName(sectionIndex, e.target.value)
// // //                       }
// // //                       placeholder={`Section ${sectionIndex + 1} Name`}
// // //                     />
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
// // //                               {/* <Form.Control
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
// // //                               /> */}

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

// // import React, { useState } from "react";
// // import { Container, Row, Col, Form, Button } from "react-bootstrap";
// // import "bootstrap-icons/font/bootstrap-icons.css";
// // import jsPDF from "jspdf";
// // import "jspdf-autotable";

// // const DynamicTablePage = () => {
// //   const [tableName, setTableName] = useState("");
// //   const [date, setDate] = useState("");
// //   const [sections, setSections] = useState([]);
// //   const [newColumnName, setNewColumnName] = useState("");
// //   const [editingColumnSectionIndex, setEditingColumnSectionIndex] =
// //     useState(null);
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
// //         columns: [{ name: "Price", isEditing: false }],
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

// //   const addColumn = (sectionIndex) => {
// //     setEditingColumnSectionIndex(sectionIndex);
// //     setNewColumnName("");
// //   };

// //   const confirmAddColumn = (sectionIndex) => {
// //     if (newColumnName.trim() === "") return;

// //     const updatedSections = [...sections];
// //     updatedSections[sectionIndex].columns.push({
// //       name: newColumnName,
// //       isEditing: false,
// //     });
// //     updatedSections[sectionIndex].rows.forEach((row) => row.values.push(""));

// //     setSections(updatedSections);
// //     setEditingColumnSectionIndex(null);
// //   };

// //   const deleteColumn = (sectionIndex, columnIndex) => {
// //     const updatedSections = [...sections];
// //     updatedSections[sectionIndex].columns.splice(columnIndex, 1);
// //     updatedSections[sectionIndex].rows.forEach((row) =>
// //       row.values.splice(columnIndex, 1)
// //     );
// //     setSections(updatedSections);
// //   };

// //   const updateColumnName = (sectionIndex, columnIndex, newName) => {
// //     const updatedSections = [...sections];
// //     updatedSections[sectionIndex].columns[columnIndex].name = newName;
// //     setSections(updatedSections);
// //   };

// //   const toggleEditColumnName = (sectionIndex, columnIndex) => {
// //     const updatedSections = [...sections];
// //     updatedSections[sectionIndex].columns[columnIndex].isEditing =
// //       !updatedSections[sectionIndex].columns[columnIndex].isEditing;
// //     setSections(updatedSections);
// //   };

// //   const addRow = (sectionIndex) => {
// //     const updatedSections = [...sections];
// //     updatedSections[sectionIndex].rows.push({
// //       SlNo: updatedSections[sectionIndex].rows.length + 1,
// //       values: new Array(updatedSections[sectionIndex].columns.length).fill(""),
// //     });
// //     setSections(updatedSections);
// //   };

// //   const deleteRow = (sectionIndex, rowIndex) => {
// //     const updatedSections = [...sections];
// //     updatedSections[sectionIndex].rows.splice(rowIndex, 1);
// //     setSections(updatedSections);
// //   };

// //   const updateCellValue = (sectionIndex, rowIndex, columnIndex, value) => {
// //     const updatedSections = [...sections];
// //     updatedSections[sectionIndex].rows[rowIndex].values[columnIndex] = value;
// //     setSections(updatedSections);
// //   };

// //   const calculateTotalPrice = (sectionIndex) => {
// //     return sections[sectionIndex].rows.reduce((total, row) => {
// //       const priceColumnIndex = sections[sectionIndex].columns.findIndex(
// //         (col) => col.name === "Price"
// //       );
// //       const price = parseFloat(row.values[priceColumnIndex]) || 0;
// //       return total + price;
// //     }, 0);
// //   };

// //   const calculateFinalQuotedValue = () => {
// //     return sections.reduce(
// //       (total, section) =>
// //         total + calculateTotalPrice(sections.indexOf(section)),
// //       0
// //     );
// //   };

// //   // const handlePrintData = () => {
// //   //   const doc = new jsPDF();

// //   //   // Define margin size
// //   //   const margin = 10;

// //   //   // Function to draw outer box
// //   //   const drawOuterBox = () => {
// //   //     const pageWidth = doc.internal.pageSize.width;
// //   //     const pageHeight = doc.internal.pageSize.height;
// //   //     doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
// //   //   };

// //   //   // Draw outer box on the first page
// //   //   drawOuterBox();

// //   //   doc.setFontSize(18);
// //   //   doc.text("BLACK AND WHITE INTERIORS", margin + 10, margin + 10);

// //   //   doc.setFontSize(12);
// //   //   doc.text(`Name Of The Customer: ${tableName}`, margin + 10, margin + 20);
// //   //   doc.text(`Date: ${date}`, margin + 10, margin + 30);

// //   //   let yOffset = margin + 40; // Initial Y offset for content

// //   //   sections.forEach((section, sectionIndex) => {
// //   //     if (yOffset > 250) {
// //   //       doc.addPage();
// //   //       drawOuterBox(); // Draw outer box on the new page
// //   //       yOffset = margin + 10;
// //   //     }

// //   //     doc.setFontSize(14);
// //   //     doc.text(
// //   //       `Section ${sectionIndex + 1}: ${section.sectionName}`,
// //   //       margin + 10,
// //   //       yOffset
// //   //     );
// //   //     yOffset += 10;

// //   //     doc.setFontSize(12);

// //   //     // Column headers
// //   //     let headers = ["Sl. No", ...section.columns.map((col) => col.name)];

// //   //     // Create dynamic column styles
// //   //     let columnStyles = { 0: { cellWidth: 20 }, 1: { cellWidth: 30 } };
// //   //     headers.slice(2).forEach((header, index) => {
// //   //       columnStyles[index + 2] = { cellWidth: "auto" };
// //   //     });

// //   //     doc.autoTable({
// //   //       startY: yOffset,
// //   //       head: [headers],
// //   //       body: section.rows.map((row) => [row.SlNo, ...row.values]),
// //   //       margin: { top: 10, left: margin + 10, right: margin + 10 }, // Adjust left and right margin
// //   //       styles: {
// //   //         overflow: "linebreak",
// //   //         cellWidth: "wrap",
// //   //         minCellHeight: 20, // Minimum cell height
// //   //       },
// //   //       bodyStyles: {
// //   //         valign: "top",
// //   //         cellPadding: 2,
// //   //       },
// //   //       columnStyles: columnStyles,
// //   //       didDrawPage: (data) => {
// //   //         // Draw outer box on every page
// //   //         drawOuterBox();
// //   //       },
// //   //     });

// //   //     // Update Y offset for total price
// //   //     yOffset = doc.autoTable.previous.finalY + 10;

// //   //     // Total price for the section
// //   //     const totalPrice = calculateTotalPrice(sectionIndex);
// //   //     doc.text(`Total Price: ${totalPrice.toFixed(2)}`, margin + 10, yOffset);
// //   //     yOffset += 20;
// //   //   });

// //   //   // Final quoted value
// //   //   doc.setFontSize(14);
// //   //   doc.text(
// //   //     `Final Quoted Value: ${calculateFinalQuotedValue().toFixed(2)}`,
// //   //     margin + 10,
// //   //     yOffset
// //   //   );

// //   //   doc.save("quoted_data.pdf");
// //   // };
// //   const handlePrintData = () => {
// //     const doc = new jsPDF();

// //     // Define margin size
// //     const margin = 10;

// //     // Function to draw outer box
// //     const drawOuterBox = () => {
// //       const pageWidth = doc.internal.pageSize.width;
// //       const pageHeight = doc.internal.pageSize.height;
// //       doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
// //     };

// //     // Draw outer box on the first page
// //     drawOuterBox();

// //     // Set font color for title
// //     doc.setTextColor(0, 0, 0); // Black color
// //     doc.setFontSize(18);
// //     const title = "BLACK AND WHITE INTERIORS";
// //     const pageWidth = doc.internal.pageSize.width;
// //     const textWidth = doc.getTextWidth(title);
// //     const textX = (pageWidth - textWidth) / 2; // Calculate X position to center the text
// //     doc.text(title, textX, margin + 10);

// //     // Set font color for details
// //     doc.setTextColor(50, 50, 50); // Dark gray color
// //     const details = `
// //   Shabari complex, 26 & 27,kithaganura villaganur,Margondanahalli,Bengaluru,Kithiganur,
// //                                                         Karnataka 560049
// //   GST: 29BWUPA0578C1ZE                                          Ph: 9739185445 / 8553795482`;

// //     // Add details below the title
// //     doc.setFontSize(12);
// //     const detailsX = margin + 10;
// //     const detailsY = margin + 20;
// //     const lineHeight = 6; // Line height for details text

// //     // Calculate height of the details box
// //     const detailsLines = details.split("\n");
// //     const detailsHeight = detailsLines.length * lineHeight;

// //     // Draw box around details
// //     doc.rect(
// //       detailsX - 2,
// //       detailsY - 2,
// //       pageWidth - 2 * margin - 16,
// //       detailsHeight + 4
// //     );

// //     // Add details text
// //     detailsLines.forEach((line, index) => {
// //       doc.text(line, detailsX, detailsY + index * lineHeight);
// //     });

// //     // Adjust yOffset based on the added details box
// //     let yOffset = detailsY + detailsHeight + 10;

// //     // Set font color for rest of the content
// //     doc.setTextColor(0, 0, 0); // Black color
// //     doc.text(`Name Of The Customer: ${tableName}`, margin + 10, yOffset);
// //     yOffset += 10;
// //     doc.text(`Date: ${date}`, margin + 10, yOffset);
// //     yOffset += 10;

// //     // Array to store section totals
// //     const sectionTotals = [];

// //     sections.forEach((section, sectionIndex) => {
// //       if (yOffset > doc.internal.pageSize.height - 30) {
// //         doc.addPage();
// //         drawOuterBox(); // Draw outer box on the new page
// //         yOffset = margin + 10;
// //       }

// //       // Highlight section names
// //       doc.setTextColor(0, 0, 255); // Blue color for section names
// //       doc.setFont("helvetica", "bold");
// //       doc.setFontSize(14);
// //       doc.text(
// //         `Section ${sectionIndex + 1}: ${section.sectionName}`,
// //         margin + 10,
// //         yOffset
// //       );
// //       yOffset += 10;

// //       // Reset font style and color for other content
// //       doc.setTextColor(0, 0, 0); // Black color
// //       doc.setFont("helvetica", "normal");
// //       doc.setFontSize(12);

// //       // Column headers
// //       let headers = ["Sl. No", ...section.columns.map((col) => col.name)];

// //       // Create dynamic column styles
// //       let columnStyles = { 0: { cellWidth: 20 }, 1: { cellWidth: 30 } };
// //       headers.slice(2).forEach((header, index) => {
// //         columnStyles[index + 2] = { cellWidth: "auto" };
// //       });

// //       doc.autoTable({
// //         startY: yOffset,
// //         head: [headers],
// //         body: section.rows.map((row) => [row.SlNo, ...row.values]),
// //         margin: { top: 10, left: margin + 10, right: margin + 10 }, // Adjust left and right margin
// //         styles: {
// //           overflow: "linebreak",
// //           cellWidth: "wrap",
// //           minCellHeight: 20, // Minimum cell height
// //         },
// //         bodyStyles: {
// //           valign: "top",
// //           cellPadding: 2,
// //         },
// //         columnStyles: columnStyles,
// //         didDrawPage: (data) => {
// //           // Draw outer box on every page
// //           drawOuterBox();
// //         },
// //         didDrawCell: (data) => {
// //           // Check if the cell is close to the bottom of the page
// //           if (
// //             data.cell.section === "body" &&
// //             data.row.index === section.rows.length - 1
// //           ) {
// //             const pageHeight = doc.internal.pageSize.height;
// //             if (data.cell.y + data.cell.height > pageHeight - margin) {
// //               doc.addPage();
// //               drawOuterBox(); // Draw outer box on the new page
// //             }
// //           }
// //         },
// //         willDrawCell: (data) => {
// //           // Check if the cell is close to the bottom of the page and force a page break
// //           const pageHeight = doc.internal.pageSize.height;
// //           if (
// //             data.cell.section === "body" &&
// //             data.row.index === section.rows.length - 1
// //           ) {
// //             if (data.cell.y + data.cell.height > pageHeight - margin) {
// //               data.cell.pageBreak = "auto";
// //             }
// //           }
// //         },
// //       });

// //       // Update Y offset for total price
// //       yOffset = doc.autoTable.previous.finalY + 10;

// //       // Total price for the section
// //       const totalPrice = calculateTotalPrice(sectionIndex);
// //       sectionTotals.push({
// //         sectionName: section.sectionName,
// //         totalPrice: totalPrice.toFixed(2),
// //       });
// //       doc.text(`Total Price: ${totalPrice.toFixed(2)}`, margin + 10, yOffset);
// //       yOffset += 20;
// //     });

// //     // Add a new page for the summary
// //     doc.addPage();
// //     drawOuterBox(); // Draw outer box on the new page

// //     // Set font color and size for title
// //     doc.setTextColor(0, 0, 0); // Black color
// //     doc.setFontSize(18);
// //     doc.text(title, textX, margin + 10);

// //     // Set font color for details
// //     doc.setTextColor(50, 50, 50); // Dark gray color
// //     doc.setFontSize(12);
// //     const summaryDetailsX = margin + 10;
// //     const summaryDetailsY = margin + 20;

// //     // Draw box around details
// //     doc.rect(
// //       summaryDetailsX - 2,
// //       summaryDetailsY - 2,
// //       pageWidth - 2 * margin - 16,
// //       detailsHeight + 4
// //     );

// //     // Add details text
// //     detailsLines.forEach((line, index) => {
// //       doc.text(line, summaryDetailsX, summaryDetailsY + index * lineHeight);
// //     });

// //     // Adjust yOffset for summary content
// //     yOffset = summaryDetailsY + detailsHeight + 10;

// //     // Add section totals in a table
// //     const finalBillHeaders = ["Section Name", "Total Price"];
// //     const finalBillBody = sectionTotals.map((section) => [
// //       section.sectionName,
// //       section.totalPrice,
// //     ]);

// //     doc.autoTable({
// //       startY: yOffset,
// //       head: [finalBillHeaders],
// //       body: finalBillBody,
// //       margin: { top: 10, left: margin + 10, right: margin + 10 },
// //       styles: {
// //         overflow: "linebreak",
// //         cellWidth: "wrap",
// //         minCellHeight: 20, // Minimum cell height
// //       },
// //       headStyles: {
// //         fillColor: [22, 160, 133], // Header background color
// //         textColor: 255, // Header text color (white)
// //         fontStyle: "bold",
// //       },
// //       bodyStyles: {
// //         valign: "top",
// //         cellPadding: 2,
// //       },
// //       columnStyles: { 0: { cellWidth: "auto" }, 1: { cellWidth: 40 } },
// //       didDrawPage: (data) => {
// //         // Draw outer box on every page
// //         drawOuterBox();
// //       },
// //     });

// //     // Update yOffset for final quoted value
// //     yOffset = doc.autoTable.previous.finalY + 20;

// //     // Final quoted value
// //     doc.setFontSize(14);
// //     doc.setTextColor(0, 0, 0); // Black color
// //     doc.setFont("helvetica", "bold");
// //     doc.text(
// //       `Final Quoted Value: ${calculateFinalQuotedValue().toFixed(2)}`,
// //       margin + 10,
// //       yOffset
// //     );

// //     // Add a new page for the disclaimer
// //     doc.addPage();
// //     drawOuterBox(); // Draw outer box on the new page

// //     // Set font size and style for the disclaimer text
// //     doc.setFontSize(10);
// //     doc.setFont("helvetica", "normal");

// //     const disclaimer = `
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

// //     // Function to set text color and print heading
// //     // Function to set text color and print heading
// //     const printHeading = (heading, yOffset, color) => {
// //       // Check if color is an array and has 3 elements
// //       if (Array.isArray(color) && color.length === 3) {
// //         // Ensure color values are between 0 and 255
// //         color.forEach((value) => {
// //           if (value < 0 || value > 255) {
// //             throw new Error(`Invalid color value: ${value}`);
// //           }
// //         });
// //         doc.setTextColor(...color);
// //       } else {
// //         throw new Error("Invalid color argument");
// //       }
// //       doc.text(heading, margin + 10, yOffset);
// //     };

// //     // Print disclaimer headings
// //     const disclaimerLines = disclaimer.split("\n");
// //     let currentY = margin + 10;

// //     disclaimerLines.forEach((line) => {
// //       if (line.trim().endsWith(":")) {
// //         // Heading detection (ends with ':')
// //         printHeading(line, currentY, [255, 0, 0]); // Red color
// //         currentY += 10;
// //       } else {
// //         doc.setTextColor(0, 0, 0); // Black color for regular text
// //         doc.text(line, margin + 10, currentY);
// //         currentY += 6; // Line height for disclaimer text
// //       }
// //     });

// //     // Save the document
// //     doc.save("quoted_data.pdf");
// //   };

// //   return (
// //     <Container fluid>
// //       <h2 className="mt-4 d-flex justify-content-center">
// //         Black And White Interiors
// //       </h2>

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
// //                           marginTop: "5px",
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
// //                   <Col xs={4} sm={2} className="d-flex justify-content-end">
// //                     <Button
// //                       variant="danger"
// //                       onClick={() => deleteSection(sectionIndex)}
// //                     >
// //                       <i className="bi bi-trash2-fill"></i> Section
// //                     </Button>
// //                   </Col>
// //                 </Row>

// //                 <div className="table-responsive mt-3">
// //                   <table className="table table-bordered">
// //                     <thead>
// //                       <tr>
// //                         <th>Sl. No</th>
// //                         {section.columns.map((column, columnIndex) => (
// //                           <th key={columnIndex}>
// //                             {column.isEditing ? (
// //                               <Form.Control
// //                                 type="text"
// //                                 value={column.name}
// //                                 onChange={(e) =>
// //                                   updateColumnName(
// //                                     sectionIndex,
// //                                     columnIndex,
// //                                     e.target.value
// //                                   )
// //                                 }
// //                                 onBlur={() =>
// //                                   toggleEditColumnName(
// //                                     sectionIndex,
// //                                     columnIndex
// //                                   )
// //                                 }
// //                                 autoFocus
// //                               />
// //                             ) : (
// //                               <span
// //                                 onClick={() =>
// //                                   toggleEditColumnName(
// //                                     sectionIndex,
// //                                     columnIndex
// //                                   )
// //                                 }
// //                               >
// //                                 {column.name}
// //                               </span>
// //                             )}
// //                             {column.name !== "Price" && (
// //                               <Button
// //                                 variant="danger"
// //                                 size="sm"
// //                                 className="ms-2"
// //                                 onClick={() =>
// //                                   deleteColumn(sectionIndex, columnIndex)
// //                                 }
// //                               >
// //                                 <i className="bi bi-trash2-fill"></i>
// //                               </Button>
// //                             )}
// //                           </th>
// //                         ))}

// //                         {editingColumnSectionIndex === sectionIndex && (
// //                           <th>
// //                             <Form.Control
// //                               type="text"
// //                               value={newColumnName}
// //                               onChange={(e) => setNewColumnName(e.target.value)}
// //                               placeholder="Enter column name"
// //                               autoFocus
// //                             />
// //                             <Button
// //                               variant="success"
// //                               className="mt-2"
// //                               onClick={() => confirmAddColumn(sectionIndex)}
// //                             >
// //                               Add Column
// //                             </Button>
// //                           </th>
// //                         )}

// //                         {editingColumnSectionIndex !== sectionIndex && (
// //                           <th>
// //                             <Button
// //                               variant="success"
// //                               onClick={() => addColumn(sectionIndex)}
// //                             >
// //                               <i className="bi bi-pencil-square"></i> Add Column
// //                             </Button>
// //                           </th>
// //                         )}
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {section.rows.map((row, rowIndex) => (
// //                         <tr key={rowIndex}>
// //                           <td>{row.SlNo}</td>
// //                           {row.values.map((value, columnIndex) => (
// //                             <td key={columnIndex}>
// //                               <Form.Control
// //                                 as="textarea"
// //                                 rows={1}
// //                                 value={value}
// //                                 onChange={(e) =>
// //                                   updateCellValue(
// //                                     sectionIndex,
// //                                     rowIndex,
// //                                     columnIndex,
// //                                     e.target.value
// //                                   )
// //                                 }
// //                                 placeholder="Enter value"
// //                                 style={{
// //                                   padding: "10px",
// //                                   width: "100%",
// //                                   fontSize: "16px",
// //                                   minHeight: "100px",
// //                                   minWidth: "150px",
// //                                 }}
// //                               />
// //                             </td>
// //                           ))}
// //                           <td>
// //                             <Button
// //                               variant="danger"
// //                               onClick={() => deleteRow(sectionIndex, rowIndex)}
// //                             >
// //                               <i className="bi bi-trash2-fill"></i>
// //                             </Button>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                   <Button
// //                     variant="primary"
// //                     onClick={() => addRow(sectionIndex)}
// //                   >
// //                     <i className="bi bi-pencil-square"></i> Add Row
// //                   </Button>
// //                   <div className="mt-3">
// //                     <strong>Total Price: </strong>
// //                     {calculateTotalPrice(sectionIndex).toFixed(2)}
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default DynamicTablePage;

// import React, { useState } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

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
//     const title = "BLACK AND WHITE INTERIORS";
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
//           2: { cellWidth: 60 }, // Description
//           3: { cellWidth: 20 }, // sqft
//           4: { cellWidth: 20 }, // rate
//           5: { cellWidth: 20 }, // Amount
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

//           <Button variant="success" className="ms-3" onClick={handlePrintData}>
//             <i className="bi bi-printer-fill"></i> Print Data
//           </Button>

//           <div className="mt-4">
//             {sections.map((section, sectionIndex) => (
//               <div key={sectionIndex} className="mt-4">
//                 <Row>
//                   <Col xs={8} sm={10} className="position-relative">
//                     <Form.Control
//                       type="text"
//                       value={section.sectionName}
//                       onChange={(e) =>
//                         handleSectionNameChange(sectionIndex, e.target.value)
//                       }
//                       placeholder={`Section ${sectionIndex + 1} Name`}
//                       autoComplete="off"
//                     />
//                     {/* Suggestions dropdown */}
//                     {showSuggestions && filteredSuggestions.length > 0 && (
//                       <ul
//                         className="list-group position-absolute"
//                         style={{
//                           width: "100%",
//                           zIndex: 1000,
//                           maxHeight: "150px",
//                           overflowY: "auto",
//                           marginTop: "1rem",
//                         }}
//                       >
//                         {filteredSuggestions.map((suggestion, idx) => (
//                           <li
//                             key={idx}
//                             className="list-group-item list-group-item-action"
//                             onClick={() =>
//                               handleSuggestionClick(sectionIndex, suggestion)
//                             }
//                           >
//                             {suggestion}
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </Col>
//                   <Col xs={4} sm={2}>
//                     <Button
//                       variant="danger"
//                       onClick={() => deleteSection(sectionIndex)}
//                     >
//                       <i className="bi bi-trash"></i> Delete Section
//                     </Button>
//                   </Col>
//                 </Row>

//                 <Row className="mt-3">
//                   <Col>
//                     <Button
//                       variant="secondary"
//                       onClick={() => addRow(sectionIndex)}
//                     >
//                       <i className="bi bi-plus"></i> Add Row
//                     </Button>
//                   </Col>
//                 </Row>

//                 <table className="table table-bordered mt-3">
//                   <thead>
//                     <tr>
//                       <th>Sl. No</th>
//                       <th>Product</th>
//                       <th>Description</th>
//                       <th>sqft</th>
//                       <th>rate</th>
//                       <th>Amount</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {section.rows.map((row, rowIndex) => (
//                       <tr key={rowIndex}>
//                         <td>{row.SlNo}</td>
//                         <td>
//                           <Form.Control
//                             as="textarea"
//                             rows={1}
//                             value={row.Product}
//                             onChange={(e) =>
//                               updateCellValue(
//                                 sectionIndex,
//                                 rowIndex,
//                                 "Product",
//                                 e.target.value
//                               )
//                             }
//                             placeholder="Enter value"
//                             style={{
//                               padding: "10px",
//                               width: "100%",
//                               fontSize: "16px",
//                               minHeight: "100px",
//                               minWidth: "150px",
//                             }}
//                           />
//                         </td>
//                         <td>
//                           <Form.Control
//                             as="textarea"
//                             value={row.Description}
//                             onChange={(e) =>
//                               updateCellValue(
//                                 sectionIndex,
//                                 rowIndex,
//                                 "Description",
//                                 e.target.value
//                               )
//                             }
//                             style={{
//                               padding: "10px",
//                               width: "100%",
//                               fontSize: "16px",
//                               minHeight: "100px",
//                               minWidth: "150px",
//                             }}
//                           />
//                         </td>
//                         <td>
//                           <Form.Control
//                             type="number"
//                             value={row.sqft}
//                             onChange={(e) =>
//                               updateCellValue(
//                                 sectionIndex,
//                                 rowIndex,
//                                 "sqft",
//                                 e.target.value
//                               )
//                             }
//                             style={{
//                               padding: "10px",
//                               width: "100%",
//                               fontSize: "16px",
//                               minHeight: "100px",
//                               minWidth: "150px",
//                             }}
//                           />
//                         </td>
//                         <td>
//                           <Form.Control
//                             type="number"
//                             value={row.rate}
//                             onChange={(e) =>
//                               updateCellValue(
//                                 sectionIndex,
//                                 rowIndex,
//                                 "rate",
//                                 e.target.value
//                               )
//                             }
//                             style={{
//                               padding: "10px",
//                               width: "100%",
//                               fontSize: "16px",
//                               minHeight: "100px",
//                               minWidth: "150px",
//                             }}
//                           />
//                         </td>
//                         <td>{row.Amount}</td>
//                         <td>
//                           <Button
//                             variant="danger"
//                             onClick={() => deleteRow(sectionIndex, rowIndex)}
//                           >
//                             <i className="bi bi-trash"></i>
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ))}
//           </div>
//         </Col>
//       </Row>
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

    // Function to draw outer box
    const drawOuterBox = () => {
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
    };

    // Draw outer box on the first page
    drawOuterBox();

    // Set font color for title
    doc.setTextColor(0, 0, 0); // Black color
    doc.setFontSize(18);
    const title = "House Decors";
    const pageWidth = doc.internal.pageSize.width;
    const textWidth = doc.getTextWidth(title);
    const textX = (pageWidth - textWidth) / 2; // Calculate X position to center the text
    doc.text(title, textX, margin + 10);

    // Set font color for details
    doc.setTextColor(50, 50, 50); // Dark gray color
    const details = `
    Shabari complex, 26 & 27,kithaganura villaganur,Margondanahalli,Bengaluru,Kithiganur,
                                                          Karnataka 560049
    GST: 29BWUPA0578C1ZE                                          Ph: 9739185445 / 8553795482`;

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
      doc.setTextColor(0, 0, 255); // Blue color for section names
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(
        `Section ${sectionIndex + 1}: ${section.sectionName}`,
        margin + 10,
        yOffset
      );
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
        "sqft",
        "rate",
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
        bodyStyles: {
          valign: "top",
          cellPadding: 2,
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
      doc.text(`Total Price: ${totalPrice.toFixed(2)}`, margin + 10, yOffset);
      yOffset += 20;
    });

    // Add a new page for the summary
    doc.addPage();
    drawOuterBox(); // Draw outer box on the new page

    // Set font color and size for title
    doc.setTextColor(0, 0, 0); // Black color
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
        fillColor: [22, 160, 133], // Header background color
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
    drawOuterBox(); // Draw outer box on the new page

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
    <Container fluid>
      <h2 className="mt-4 d-flex justify-content-center">
        Black And White Interiors
      </h2>

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group controlId="tableName">
            <Form.Label>Name Of The Customer</Form.Label>
            <Form.Control
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              placeholder="Enter customer name"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Button variant="primary" onClick={addSection}>
            <i className="bi bi-pencil-square"></i> Add Section
          </Button>

          <Button variant="success" onClick={handlePrintData} className="ms-3">
            <i className="bi bi-printer"></i> Print Data
          </Button>
        </Col>
      </Row>

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mt-4">
          <Row>
            <Col xs={8} sm={10} className="position-relative">
              <Form.Control
                type="text"
                value={section.sectionName}
                onChange={(e) =>
                  handleSectionNameChange(sectionIndex, e.target.value)
                }
                placeholder={`Section ${sectionIndex + 1} Name`}
                autoComplete="off"
              />
              {/* Suggestions dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <ul
                  className="list-group position-absolute"
                  style={{
                    width: "100%",
                    zIndex: 1000,
                    maxHeight: "150px",
                    overflowY: "auto",
                    marginTop: "1rem",
                  }}
                >
                  {filteredSuggestions.map((suggestion, idx) => (
                    <li
                      key={idx}
                      className="list-group-item list-group-item-action"
                      onClick={() =>
                        handleSuggestionClick(sectionIndex, suggestion)
                      }
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </Col>
            <Col xs={4} sm={2}>
              <Button
                variant="danger"
                onClick={() => deleteSection(sectionIndex)}
              >
                <i className="bi bi-trash"></i> Delete Section
              </Button>
            </Col>
          </Row>

          <table className="table mt-3">
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
                <tr key={rowIndex}>
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
                        minHeight: "100px",
                        minWidth: "150px",
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
                        minHeight: "100px",
                        minWidth: "150px",
                      }}
                    />
                  </td>
                  <td>{row.Amount}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteRow(sectionIndex, rowIndex)}
                    >
                      Delete Row
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Button variant="primary" onClick={() => addRow(sectionIndex)}>
            Add Row
          </Button>

          {/* <div className="mt-2">
            <strong>
              Total Price for Section {sectionIndex + 1}:{" "}
              {calculateTotalPrice(sectionIndex).toFixed(2)}
            </strong>
          </div> */}
        </div>
      ))}

      {/* <div className="mt-4">
        <h4>Final Quoted Value: {calculateFinalQuotedValue().toFixed(2)}</h4>
      </div> */}
    </Container>
  );
};

export default DynamicTablePage;
