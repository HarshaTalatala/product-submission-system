import { jsPDF } from 'jspdf';
import { Product } from '../types';

/**
 * Helper function to format text from snake_case or camelCase to Title Case
 */
const formatText = (text: string): string => {
  return text
    // Replace underscores and hyphens with spaces
    .replace(/[_-]/g, ' ')
    // Add space before capital letters (for camelCase)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // Capitalize first letter of each word
    .replace(/\b\w/g, char => char.toUpperCase())
    .trim();
};

/**
 * Generate a simple, clean PDF report for a product
 */
export const generatePDF = (product: Product): void => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Set PDF metadata
    pdf.setProperties({
      title: `${product.productName} - Product Report`,
      author: 'Product Management System',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let yPos = margin;

    // === SIMPLE HEADER ===
    pdf.setFillColor(79, 70, 229);
    pdf.rect(0, 0, pageWidth, 35, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Product Report', margin, 15);
    
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }), margin, 22);

    yPos = 50;

    // === PRODUCT NAME ===
    pdf.setTextColor(100, 100, 100);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PRODUCT NAME', margin, yPos);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(product.productName, margin, yPos + 7);
    
    yPos += 18;

    // === PRODUCT TYPE ===
    pdf.setTextColor(100, 100, 100);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.text('PRODUCT TYPE', margin, yPos);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text(formatText(product.productType), margin, yPos + 6);
    
    yPos += 16;

    // === DESCRIPTION ===
    pdf.setTextColor(100, 100, 100);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.text('DESCRIPTION', margin, yPos);
    yPos += 6;
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const descLines = pdf.splitTextToSize(product.description, contentWidth);
    pdf.text(descLines, margin, yPos);
    yPos += descLines.length * 5 + 10;

    // === SEPARATOR ===
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

    // === PRODUCT REVIEW SECTION ===
    pdf.setTextColor(79, 70, 229);
    pdf.setFillColor(79, 70, 229);
    pdf.rect(margin - 2, yPos - 2, 3, 12, 'F');
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Product Review & Details', margin + 3, yPos + 4);
    
    pdf.setTextColor(120, 120, 120);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'italic');
    pdf.text('AI-Generated questions and responses based on product information', margin + 3, yPos + 9);
    yPos += 18;

    const answers = Object.entries(product.answers);
    
    if (answers.length === 0) {
      // Empty state with helpful message
      pdf.setFillColor(250, 250, 250);
      pdf.roundedRect(margin, yPos, contentWidth, 20, 2, 2, 'F');
      
      pdf.setTextColor(150, 150, 150);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      pdf.text('No questions were answered during the review process.', margin + contentWidth / 2, yPos + 10, { align: 'center' });
      pdf.setFontSize(8);
      pdf.text('Complete the multi-step form to generate detailed review questions.', margin + contentWidth / 2, yPos + 15, { align: 'center' });
    } else {
      // Summary box
      pdf.setFillColor(245, 247, 250);
      pdf.roundedRect(margin, yPos, contentWidth, 12, 2, 2, 'F');
      
      pdf.setTextColor(79, 70, 229);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Total Questions: ${answers.length}`, margin + 4, yPos + 5);
      
      pdf.setTextColor(100, 100, 100);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Review completed on ${new Date(product.submittedAt || Date.now()).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })}`, margin + 4, yPos + 9);
      
      yPos += 18;
      
      // Q&A Items with enhanced context
      answers.forEach(([question, answer], index) => {
        // Format the question text to be readable
        const formattedQuestion = formatText(question);
        
        // Pre-calculate text lines for proper box sizing
        const qLines = pdf.splitTextToSize(formattedQuestion, contentWidth - 20);
        const aLines = pdf.splitTextToSize(answer, contentWidth - 26);
        
        // Calculate proper card height with padding
        const questionHeight = qLines.length * 5 + 8;
        const answerBoxHeight = aLines.length * 5 + 6;
        const totalCardHeight = questionHeight + answerBoxHeight + 10;
        
        // Check if need new page
        if (yPos + totalCardHeight > pageHeight - 30) {
          pdf.addPage();
          yPos = margin;
        }

        const cardStartY = yPos;
        
        // Main card background with border
        pdf.setFillColor(252, 252, 252);
        pdf.roundedRect(margin, yPos, contentWidth, totalCardHeight, 2, 2, 'F');
        pdf.setDrawColor(220, 220, 220);
        pdf.setLineWidth(0.4);
        pdf.roundedRect(margin, yPos, contentWidth, totalCardHeight, 2, 2, 'D');
        
        yPos += 6;

        // Question number badge
        pdf.setFillColor(79, 70, 229);
        pdf.circle(margin + 6, yPos + 1, 3.5, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${index + 1}`, margin + 6, yPos + 2.5, { align: 'center' });

        // Question label
        pdf.setTextColor(79, 70, 229);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Q:', margin + 12, yPos + 2);

        // Question text (formatted)
        pdf.setTextColor(30, 30, 30);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(qLines, margin + 17, yPos + 2);
        yPos += questionHeight;

        // Answer label
        pdf.setTextColor(34, 197, 94);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        pdf.text('A:', margin + 12, yPos);

        // Answer box with subtle background
        pdf.setFillColor(248, 250, 252);
        pdf.roundedRect(margin + 17, yPos - 2, contentWidth - 29, answerBoxHeight, 1.5, 1.5, 'F');
        pdf.setDrawColor(235, 240, 245);
        pdf.setLineWidth(0.2);
        pdf.roundedRect(margin + 17, yPos - 2, contentWidth - 29, answerBoxHeight, 1.5, 1.5, 'D');
        
        // Answer text
        pdf.setTextColor(50, 50, 50);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        pdf.text(aLines, margin + 20, yPos + 2);
        
        // Move to next question position
        yPos = cardStartY + totalCardHeight + 7;
      });
      
      // End of review note
      yPos += 4;
      pdf.setTextColor(150, 150, 150);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'italic');
      pdf.text(
        `End of review - All ${answers.length} question${answers.length !== 1 ? 's' : ''} answered`,
        pageWidth / 2,
        yPos,
        { align: 'center' }
      );
    }

    // === FOOTER ===
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      const footerY = pageHeight - 15;
      
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.3);
      pdf.line(margin, footerY, pageWidth - margin, footerY);
      
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(120, 120, 120);
      pdf.text(
        'Product Management System',
        pageWidth / 2,
        footerY + 5,
        { align: 'center' }
      );
      
      pdf.text(
        `Page ${i} of ${totalPages}`,
        pageWidth - margin,
        footerY + 5,
        { align: 'right' }
      );
    }

    // Save PDF
    const filename = `${product.productName.replace(/[^a-z0-9]/gi, '_')}_Report.pdf`;
    pdf.save(filename);

    console.log(`✅ PDF generated: ${filename}`);
    
  } catch (error) {
    console.error('❌ PDF error:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};
