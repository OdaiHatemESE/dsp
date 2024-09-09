import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver'; // To download the PDF
import fontkit from '@pdf-lib/fontkit'; // Required to support custom fonts


const fieldMapping :any = {
    SchoolName: 'SchoolName',
    SchoolAddress: 'SchoolAddress',
    SchoolPhone: 'SchoolPhone',
    Name: 'StudentName',
    StudentEmiratesID: 'StudentEID',
    ParentName: 'ParentName1',
    ParentEmiratesID: 'ParentEID',
    Phone: 'ParentPhone',
    Address: 'ParentAddress',
    PrincipalName: 'SchoolManger'
};

const useGeneratePDF = async (data, templatePath, fontPath) => {
    try {
        // Load the existing PDF template
        const templateBytes = await fetch(templatePath).then((res) =>
            res.arrayBuffer()
        );

        // Create a new PDFDocument from the template
        const pdfDoc = await PDFDocument.load(templateBytes);

        // Register fontkit for custom font embedding
        pdfDoc.registerFontkit(fontkit);

        // Load the Arabic font (or any other font)
        const fontBytes = await fetch(fontPath).then((res) => res.arrayBuffer());

        // Embed the custom font
        const customFont = await pdfDoc.embedFont(fontBytes);

        // Get the first page of the PDF
        const form = pdfDoc.getForm();

        // Map the dynamic data to the form fields
        Object.keys(fieldMapping).forEach((fieldKey) => {
            const formField = form.getTextField(fieldMapping[fieldKey]);
            const fieldValue = data[fieldKey] ? data[fieldKey].toString() : '';
            formField.setText(fieldValue);
            formField.updateAppearances(customFont);
        });

        // Serialize the PDFDocument to bytes
        const pdfBytes = await pdfDoc.save();

        // Trigger file download using FileSaver.js
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        saveAs(blob, `${data.Name || 'Document'}.pdf`);
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};

export default useGeneratePDF;
