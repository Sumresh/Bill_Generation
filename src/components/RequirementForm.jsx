// import React, { useState } from "react";
// import {
//   Form,
//   Button,
//   Container,
//   Row,
//   Col,
//   Table,
//   InputGroup,
//   FormControl,
// } from "react-bootstrap";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaDownload, FaPlus, FaEdit } from "react-icons/fa";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// const ResponsiveForm = () => {
//   const initialFormState = {
//     name: "",
//     date: new Date(),
//     title: "",
//     numberOfSections: 0,
//     sectionNames: [],
//     columnNames: [],
//   };

//   const [formData, setFormData] = useState(initialFormState);
//   const [submittedData, setSubmittedData] = useState(null);
//   const [sectionsData, setSectionsData] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [newColumnName, setNewColumnName] = useState(""); // State to manage new column input

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleDateChange = (date) => {
//     setFormData({ ...formData, date });
//   };

//   const handleSectionNamesChange = (index, value) => {
//     const updatedSections = [...formData.sectionNames];
//     updatedSections[index] = value;
//     setFormData({ ...formData, sectionNames: updatedSections });
//   };

//   const handleColumnNamesChange = (index, value) => {
//     const updatedColumns = [...formData.columnNames];
//     updatedColumns[index] = value;
//     setFormData({ ...formData, columnNames: updatedColumns });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmittedData(formData);
//     initializeSectionsData(formData.numberOfSections);
//     setIsEditing(true);
//   };

//   const initializeSectionsData = (numberOfSections) => {
//     const initialSections = Array.from(
//       { length: numberOfSections },
//       (_, index) => ({
//         sectionName: formData.sectionNames[index] || "",
//         columns: formData.columnNames.map((name) => ({ name, contents: "" })),
//       })
//     );
//     setSectionsData(initialSections);
//   };

//   const handleContentChange = (sectionIndex, colIndex, value) => {
//     const updatedSectionsData = [...sectionsData];
//     updatedSectionsData[sectionIndex].columns[colIndex].contents = value;
//     setSectionsData(updatedSectionsData);
//   };

//   const handleEditSectionName = (sectionIndex, value) => {
//     const updatedSectionsData = [...sectionsData];
//     updatedSectionsData[sectionIndex].sectionName = value;
//     setSectionsData(updatedSectionsData);
//   };

//   const handleEditColumnName = (sectionIndex, colIndex, value) => {
//     const updatedSectionsData = [...sectionsData];
//     updatedSectionsData[sectionIndex].columns[colIndex].name = value;
//     setSectionsData(updatedSectionsData);
//   };

//   const handleAddColumn = () => {
//     if (newColumnName.trim() !== "") {
//       setFormData((prev) => ({
//         ...prev,
//         columnNames: [...prev.columnNames, newColumnName.trim()],
//       }));
//       setNewColumnName(""); // Clear the input field after adding
//     }
//   };

//   const handleReset = () => {
//     setFormData(initialFormState);
//     setSubmittedData(null);
//     setSectionsData([]);
//     setIsEditing(false);
//     setNewColumnName(""); // Clear the input field on reset
//   };

//   const handleDownloadPDF = () => {
//     const input = document.getElementById("tableView");
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF();
//       const imgWidth = 190;
//       const pageHeight = 295;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       const heightLeft = imgHeight;

//       let position = 10;
//       pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
//       pdf.save("table_data.pdf");
//     });
//   };

//   return (
//     <Container className="mt-4">
//       {!submittedData ? (
//         <>
//           <h2 className="text-center mb-4">Responsive Form</h2>
//           <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
//             <Row className="mb-3">
//               <Col xs={12} md={6}>
//                 <Form.Group controlId="formName">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     placeholder="Enter your name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group controlId="formDate">
//                   <Form.Label>Date</Form.Label>
//                   <DatePicker
//                     selected={formData.date}
//                     onChange={handleDateChange}
//                     className="form-control"
//                     name="date"
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mb-3">
//               <Col xs={12} md={6}>
//                 <Form.Group controlId="formTitle">
//                   <Form.Label>Title</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="title"
//                     placeholder="Enter title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col xs={12} md={6}>
//                 <Form.Group controlId="formSections">
//                   <Form.Label>Number of Sections</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="numberOfSections"
//                     placeholder="Enter number of sections"
//                     value={formData.numberOfSections}
//                     onChange={handleChange}
//                     min="0"
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mb-3">
//               <Col xs={12}>
//                 <Form.Label>Section Names</Form.Label>
//                 {Array.from({ length: formData.numberOfSections }).map(
//                   (_, index) => (
//                     <Form.Group
//                       controlId={`formSectionName${index}`}
//                       key={index}
//                     >
//                       <Form.Control
//                         type="text"
//                         placeholder={`Enter section name ${index + 1}`}
//                         value={formData.sectionNames[index] || ""}
//                         onChange={(e) =>
//                           handleSectionNamesChange(index, e.target.value)
//                         }
//                         className="mb-2"
//                       />
//                     </Form.Group>
//                   )
//                 )}
//               </Col>
//             </Row>

//             <Row className="mb-3">
//               <Col xs={12}>
//                 <Form.Label>Column Names</Form.Label>
//                 {Array.from({ length: formData.columnNames.length }).map(
//                   (_, index) => (
//                     <Form.Group
//                       controlId={`formColumnName${index}`}
//                       key={index}
//                     >
//                       <Form.Control
//                         type="text"
//                         placeholder={`Enter column name ${index + 1}`}
//                         value={formData.columnNames[index] || ""}
//                         onChange={(e) =>
//                           handleColumnNamesChange(index, e.target.value)
//                         }
//                         className="mb-2"
//                       />
//                     </Form.Group>
//                   )
//                 )}
//                 <Row className="mb-2">
//                   <Col xs={9}>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter new column name"
//                       value={newColumnName}
//                       onChange={(e) => setNewColumnName(e.target.value)}
//                     />
//                   </Col>
//                   <Col xs={3}>
//                     <Button variant="outline-primary" onClick={handleAddColumn}>
//                       <FaPlus className="me-2" /> Add Column
//                     </Button>
//                   </Col>
//                 </Row>
//               </Col>
//             </Row>

//             <Row className="mb-3">
//               <Col xs={12} md={6}>
//                 <Button variant="primary" type="submit">
//                   Submit
//                 </Button>
//               </Col>
//               <Col xs={12} md={6} className="text-md-end mt-2 mt-md-0">
//                 <Button variant="secondary" onClick={handleReset}>
//                   Refresh
//                 </Button>
//               </Col>
//             </Row>
//           </Form>
//         </>
//       ) : (
//         <div className="mt-4">
//           <h2 className="text-center">INTERIOR DESIGN</h2>
//           <h4 className="text-center">{submittedData.title}</h4>

//           <div id="tableView" className="shadow p-4 rounded bg-light">
//             <Table bordered hover className="mt-4">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{submittedData.name}</td>
//                   <td>{submittedData.date.toDateString()}</td>
//                 </tr>

//                 {sectionsData.map((section, sectionIndex) => (
//                   <React.Fragment key={`section-${sectionIndex}`}>
//                     <tr>
//                       <td colSpan={formData.columnNames.length + 1}>
//                         <InputGroup>
//                           <FormControl
//                             placeholder={`Edit section name ${
//                               sectionIndex + 1
//                             }`}
//                             value={section.sectionName}
//                             onChange={(e) =>
//                               handleEditSectionName(
//                                 sectionIndex,
//                                 e.target.value
//                               )
//                             }
//                           />
//                           <InputGroup.Text>
//                             <FaEdit />
//                           </InputGroup.Text>
//                         </InputGroup>
//                       </td>
//                     </tr>
//                     <tr>
//                       {section.columns.map((col, colIndex) => (
//                         <td key={`section-${sectionIndex}-col-${colIndex}`}>
//                           <InputGroup>
//                             <FormControl
//                               placeholder={`Edit column name ${colIndex + 1}`}
//                               value={col.name}
//                               onChange={(e) =>
//                                 handleEditColumnName(
//                                   sectionIndex,
//                                   colIndex,
//                                   e.target.value
//                                 )
//                               }
//                             />
//                             <InputGroup.Text>
//                               <FaEdit />
//                             </InputGroup.Text>
//                           </InputGroup>
//                           <FormControl
//                             type="text"
//                             placeholder="Enter content"
//                             value={col.contents}
//                             onChange={(e) =>
//                               handleContentChange(
//                                 sectionIndex,
//                                 colIndex,
//                                 e.target.value
//                               )
//                             }
//                             className="mt-2"
//                           />
//                           {/* <Button
//                             variant="outline-secondary"
//                             onClick={() =>
//                               handleContentChange(sectionIndex, colIndex, "")
//                             }
//                             className="mt-2"
//                           >
//                             Clear Content
//                           </Button> */}
//                         </td>
//                       ))}
//                     </tr>
//                   </React.Fragment>
//                 ))}
//               </tbody>
//             </Table>
//           </div>

//           <div className="text-center mt-4">
//             <Button variant="success" onClick={handleDownloadPDF}>
//               <FaDownload className="me-2" /> Download as PDF
//             </Button>
//           </div>

//           <Button className="mt-3" variant="secondary" onClick={handleReset}>
//             Reset
//           </Button>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default ResponsiveForm;

import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaDownload, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import styled from "styled-components";

const ResponsiveForm = () => {
  const initialFormState = {
    name: "",
    date: new Date(),
    title: "",
    numberOfSections: 0,
    sectionNames: [],
    columnNames: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [submittedData, setSubmittedData] = useState(null);
  const [sectionsData, setSectionsData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newColumnName, setNewColumnName] = useState(""); // State to manage new column input
  const [newSectionName, setNewSectionName] = useState(""); // State to manage new section input

  const RowInput = styled(FormControl)`
    min-height: 80px;

    @media (max-width: 576px) {
      min-height: 80px;
      font-size: 16px;
    }
  `;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSectionNamesChange = (index, value) => {
    const updatedSections = [...formData.sectionNames];
    updatedSections[index] = value;
    setFormData({ ...formData, sectionNames: updatedSections });
  };

  const handleColumnNamesChange = (index, value) => {
    const updatedColumns = [...formData.columnNames];
    updatedColumns[index] = value;
    setFormData({ ...formData, columnNames: updatedColumns });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    initializeSectionsData(formData.numberOfSections);
    setIsEditing(true);
  };

  const initializeSectionsData = (numberOfSections) => {
    const initialSections = Array.from(
      { length: numberOfSections },
      (_, index) => ({
        sectionName: formData.sectionNames[index] || "",
        columns: formData.columnNames.map((name) => ({ name, contents: [] })),
      })
    );
    setSectionsData(initialSections);
  };

  const handleContentChange = (sectionIndex, rowIndex, colIndex, value) => {
    const updatedSectionsData = [...sectionsData];
    if (
      !updatedSectionsData[sectionIndex].columns[colIndex].contents[rowIndex]
    ) {
      updatedSectionsData[sectionIndex].columns[colIndex].contents[rowIndex] =
        "";
    }
    updatedSectionsData[sectionIndex].columns[colIndex].contents[rowIndex] =
      value;
    setSectionsData(updatedSectionsData);
  };

  const handleEditSectionName = (sectionIndex, value) => {
    const updatedSectionsData = [...sectionsData];
    updatedSectionsData[sectionIndex].sectionName = value;
    setSectionsData(updatedSectionsData);
  };

  const handleEditColumnName = (sectionIndex, colIndex, value) => {
    const updatedSectionsData = [...sectionsData];
    updatedSectionsData[sectionIndex].columns[colIndex].name = value;
    setSectionsData(updatedSectionsData);
  };

  const handleAddColumn = () => {
    if (newColumnName.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        columnNames: [...prev.columnNames, newColumnName.trim()],
      }));
      setNewColumnName(""); // Clear the input field after adding
    }
  };

  const handleAddSection = () => {
    if (newSectionName.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        sectionNames: [...prev.sectionNames, newSectionName.trim()],
      }));
      setNewSectionName(""); // Clear the input field after adding
      initializeSectionsData(formData.numberOfSections + 1);
    }
  };

  const handleAddRow = (sectionIndex) => {
    const updatedSectionsData = [...sectionsData];
    const numberOfColumns = updatedSectionsData[sectionIndex].columns.length;
    const newRow = Array(numberOfColumns).fill("");
    updatedSectionsData[sectionIndex].columns.forEach((col) =>
      col.contents.push(newRow)
    );
    setSectionsData(updatedSectionsData);
  };

  const handleRemoveRow = (sectionIndex, rowIndex) => {
    const updatedSectionsData = [...sectionsData];
    updatedSectionsData[sectionIndex].columns.forEach((col) =>
      col.contents.splice(rowIndex, 1)
    );
    setSectionsData(updatedSectionsData);
  };

  const handleRemoveColumn = (sectionIndex, colIndex) => {
    const updatedSectionsData = [...sectionsData];
    updatedSectionsData[sectionIndex].columns.splice(colIndex, 1);
    setSectionsData(updatedSectionsData);
  };

  const handleRemoveSection = (sectionIndex) => {
    const updatedSectionsData = sectionsData.filter(
      (_, index) => index !== sectionIndex
    );
    setSectionsData(updatedSectionsData);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setSubmittedData(null);
    setSectionsData([]);
    setIsEditing(false);
    setNewColumnName(""); // Clear the input field on reset
    setNewSectionName(""); // Clear the input field on reset
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("tableView");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 190;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      let position = 10;
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      pdf.save("table_data.pdf");
    });
  };

  return (
    <Container className="mt-4">
      {!submittedData ? (
        <>
          <h2 className="text-center mb-4">Responsive Form</h2>
          <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formDate">
                  <Form.Label>Date</Form.Label>
                  <DatePicker
                    selected={formData.date}
                    onChange={handleDateChange}
                    className="form-control"
                    name="date"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formSections">
                  <Form.Label>Number of Sections</Form.Label>
                  <Form.Control
                    type="number"
                    name="numberOfSections"
                    placeholder="Enter number of sections"
                    value={formData.numberOfSections}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12}>
                <Form.Label>Section Names</Form.Label>
                {Array.from({ length: formData.numberOfSections }).map(
                  (_, index) => (
                    <Form.Group
                      controlId={`formSectionName${index}`}
                      key={index}
                    >
                      <Form.Control
                        type="text"
                        placeholder={`Enter section name ${index + 1}`}
                        value={formData.sectionNames[index] || ""}
                        onChange={(e) =>
                          handleSectionNamesChange(index, e.target.value)
                        }
                        className="mb-2"
                      />
                    </Form.Group>
                  )
                )}
                <Row className="mb-2">
                  <Col xs={9}>
                    <Form.Control
                      type="text"
                      placeholder="Enter new section name"
                      value={newSectionName}
                      onChange={(e) => setNewSectionName(e.target.value)}
                    />
                  </Col>
                  <Col xs={3}>
                    <Button
                      variant="outline-primary"
                      onClick={handleAddSection}
                    >
                      <FaPlus className="me-2" /> Add Section
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12}>
                <Form.Label>Column Names</Form.Label>
                {Array.from({ length: formData.columnNames.length }).map(
                  (_, index) => (
                    <Form.Group
                      controlId={`formColumnName${index}`}
                      key={index}
                    >
                      <Form.Control
                        type="text"
                        placeholder={`Enter column name ${index + 1}`}
                        value={formData.columnNames[index] || ""}
                        onChange={(e) =>
                          handleColumnNamesChange(index, e.target.value)
                        }
                        className="mb-2"
                      />
                    </Form.Group>
                  )
                )}
                <Row className="mb-2">
                  <Col xs={9}>
                    <Form.Control
                      type="text"
                      placeholder="Enter new column name"
                      value={newColumnName}
                      onChange={(e) => setNewColumnName(e.target.value)}
                    />
                  </Col>
                  <Col xs={3}>
                    <Button variant="outline-primary" onClick={handleAddColumn}>
                      <FaPlus className="me-2" /> Add Column
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
              <Col xs={12} md={6} className="text-md-end mt-2 mt-md-0">
                <Button variant="secondary" onClick={handleReset}>
                  Refresh
                </Button>
              </Col>
            </Row>
          </Form>
        </>
      ) : (
        <div className="mt-4">
          <h2 className="text-center">INTERIOR DESIGN</h2>
          <h4 className="text-center">{submittedData.title}</h4>

          <div id="tableView" className="shadow p-4 rounded bg-light">
            {sectionsData.map((section, sectionIndex) => (
              <div key={`section-${sectionIndex}`} className="mb-4">
                <h5 className="text-center">{section.sectionName}</h5>

                <Table bordered hover className="mt-4">
                  <thead>
                    <tr>
                      <th>Sl. No.</th>
                      {section.columns.map((col, colIndex) => (
                        <th key={`col-${colIndex}`}>
                          <InputGroup>
                            <FormControl
                              placeholder={`Edit column name ${colIndex + 1}`}
                              value={col.name}
                              onChange={(e) =>
                                handleEditColumnName(
                                  sectionIndex,
                                  colIndex,
                                  e.target.value
                                )
                              }
                            />
                            <InputGroup.Text>
                              <FaEdit />
                            </InputGroup.Text>
                          </InputGroup>
                        </th>
                      ))}
                      <th>
                        <Button
                          variant="outline-primary"
                          onClick={() => {
                            const updatedSectionsData = [...sectionsData];
                            updatedSectionsData[sectionIndex].columns.push({
                              name: `New Column`,
                              contents: [],
                            });
                            setSectionsData(updatedSectionsData);
                          }}
                        >
                          <FaPlus /> Add Column
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.columns[0].contents.map((_, rowIndex) => (
                      <tr key={`row-${rowIndex}`}>
                        <td>{rowIndex + 1}</td>
                        {section.columns.map((col, colIndex) => (
                          <td key={`cell-${colIndex}`}>
                            {/* <FormControl
                              type="text"
                              placeholder={`Enter content for row ${
                                rowIndex + 1
                              }`}
                              value={col.contents[rowIndex] || ""}
                              onChange={(e) =>
                                handleContentChange(
                                  sectionIndex,
                                  rowIndex,
                                  colIndex,
                                  e.target.value
                                )
                              }
                            />
                             */}

                            <RowInput
                              rows={1}
                              placeholder={`Enter content for row ${
                                rowIndex + 1
                              }`}
                              value={col.contents[rowIndex] || ""}
                              onChange={(e) =>
                                handleContentChange(
                                  sectionIndex,
                                  rowIndex,
                                  colIndex,
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        ))}
                        <td>
                          <Button
                            variant="outline-danger"
                            onClick={() =>
                              handleRemoveRow(sectionIndex, rowIndex)
                            }
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <div className="text-center">
                  <Button
                    variant="outline-primary"
                    onClick={() => handleAddRow(sectionIndex)}
                  >
                    <FaPlus /> Add Row
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="ms-2"
                    onClick={() => handleRemoveSection(sectionIndex)}
                  >
                    <FaTrash /> Remove Section
                  </Button>
                </div>
              </div>
            ))}

            <div className="text-center mt-4">
              <Button variant="success" onClick={handleDownloadPDF}>
                <FaDownload className="me-2" /> Download as PDF
              </Button>
            </div>

            <Button className="mt-3" variant="secondary" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ResponsiveForm;
