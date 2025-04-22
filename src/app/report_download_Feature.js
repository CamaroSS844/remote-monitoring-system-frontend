import {PdfDocument} from "@ironsoftware/ironpdf";

async function generatePdf() {
   try {
       // Define the JavaScript code to change text color to red
       const javascriptCode = "document.querySelectorAll('h1').forEach(function(el){el.style.color='red';})";
       
       // Create rendering options object
       const renderOptions = {
           enableJavaScript: true,
           javascript: javascriptCode,
       };

       // HTML content to be rendered  
       const htmlContent = "<h1>Hello World!!</h1>";

       // Render HTML content to a PDF
       const pdf = await PdfDocument.fromHtml(htmlContent, { renderOptions: renderOptions });

       // Save the PDF with the executed JavaScript
       await pdf.saveAs("result1.pdf");
       
       return true;
   } catch (error) {
       console.error("Error generating PDF:", error);
       return false;
   }
}

// Export the function
export default generatePdf;