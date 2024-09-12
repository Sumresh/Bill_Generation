import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { database, ref, get, update } from "./firebase";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

  const handlePrintData = () => {
    const doc = new jsPDF();
    const margin = 10;

    const drawOuterBox = () => {
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
    };

    drawOuterBox();

    doc.setFontSize(18);
    doc.text("BLACK AND WHITE INTERIORS", margin + 10, margin + 10);

    doc.setFontSize(12);
    doc.text(
      `Name Of The Customer: ${selectedRecord.tableName}`,
      margin + 10,
      margin + 20
    );
    doc.text(`Date: ${selectedRecord.date}`, margin + 10, margin + 30);

    let yOffset = margin + 40;

    sections.forEach((section, sectionIndex) => {
      if (yOffset > 250) {
        doc.addPage();
        drawOuterBox();
        yOffset = margin + 10;
      }

      doc.setFontSize(14);
      doc.text(
        `Section ${sectionIndex + 1}: ${section.sectionName}`,
        margin + 10,
        yOffset
      );
      yOffset += 10;

      doc.setFontSize(12);

      const headers = [
        "Sl. No",
        "Product",
        "Description",
        "sqft",
        "rate",
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
          minCellHeight: 20,
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
      doc.text(`Total Price: ${totalPrice.toFixed(2)}`, margin + 10, yOffset);
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

    doc.save("updated_quoted_data.pdf");
  };

  return (
    <Container>
      <h2 className="mt-4">Update Data</h2>
      <Row className="mt-3">
        <Col>
          <Form.Group controlId="selectRecord">
            <Form.Label>Select Record to Update</Form.Label>
            <Form.Control
              as="select"
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
            <Col>
              <Form.Group controlId="updateTableName">
                <Form.Label>Name Of The Customer</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedRecord.tableName}
                  onChange={(e) =>
                    setSelectedRecord({
                      ...selectedRecord,
                      tableName: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="updateDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedRecord.date}
                  onChange={(e) =>
                    setSelectedRecord({
                      ...selectedRecord,
                      date: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Button variant="success" className="mt-4" onClick={handleUpdate}>
                Update Record
              </Button>
            </Col>
          </Row>

          {sections.map((section) => (
            <div key={section.id} className="mt-4">
              <h4>Section: {section.sectionName}</h4>
              {section.rows.map((row, rowIndex) => (
                <Row key={rowIndex} className="mb-2">
                  <Col>
                    <Form.Group controlId={`product-${section.id}-${rowIndex}`}>
                      <Form.Label>Product</Form.Label>
                      <Form.Control
                        type="text"
                        value={row.Product}
                        onChange={(e) =>
                          handleRowChange(
                            section.id,
                            rowIndex,
                            "Product",
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      controlId={`description-${section.id}-${rowIndex}`}
                    >
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        value={row.Description}
                        onChange={(e) =>
                          handleRowChange(
                            section.id,
                            rowIndex,
                            "Description",
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId={`sqft-${section.id}-${rowIndex}`}>
                      <Form.Label>Sqft</Form.Label>
                      <Form.Control
                        type="text"
                        value={row.sqft}
                        onChange={(e) =>
                          handleRowChange(
                            section.id,
                            rowIndex,
                            "sqft",
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId={`rate-${section.id}-${rowIndex}`}>
                      <Form.Label>Rate</Form.Label>
                      <Form.Control
                        type="text"
                        value={row.rate}
                        onChange={(e) =>
                          handleRowChange(
                            section.id,
                            rowIndex,
                            "rate",
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId={`amount-${section.id}-${rowIndex}`}>
                      <Form.Label>Amount</Form.Label>
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
                      />
                    </Form.Group>
                  </Col>
                </Row>
              ))}
            </div>
          ))}

          <Button variant="primary" className="mt-4" onClick={handlePrintData}>
            Generate PDF
          </Button>
        </>
      )}
    </Container>
  );
};

export default UpdateTablePage;
