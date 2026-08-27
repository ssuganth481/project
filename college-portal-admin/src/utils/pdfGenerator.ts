import { jsPDF } from 'jspdf';
import { Student, GradeItem, FeeTransaction } from '../types';

export const generateGradeTranscriptPDF = (student: Student, grades: GradeItem[]) => {
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 38, 'F');

  // University Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('APEX UNIVERSITY OF TECHNOLOGY', 105, 16, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('OFFICE OF THE CONTROLLER OF EXAMINATIONS | OFFICIAL TRANSCRIPT', 105, 25, { align: 'center' });
  doc.text('Accredited Grade A++ by NAAC | NIRF Top 10 Institutional Rank', 105, 31, { align: 'center' });

  // Student Info Box
  doc.setTextColor(30, 41, 59);
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, 46, 182, 36, 3, 3, 'F');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Student Name:', 20, 54);
  doc.setFont('helvetica', 'normal');
  doc.text(student.fullName, 60, 54);

  doc.setFont('helvetica', 'bold');
  doc.text('Roll Number / ID:', 120, 54);
  doc.setFont('helvetica', 'normal');
  doc.text(student.studentId, 160, 54);

  doc.setFont('helvetica', 'bold');
  doc.text('Degree Program:', 20, 62);
  doc.setFont('helvetica', 'normal');
  doc.text(student.program, 60, 62);

  doc.setFont('helvetica', 'bold');
  doc.text('Department:', 120, 62);
  doc.setFont('helvetica', 'normal');
  doc.text(student.department.slice(0, 24), 160, 62);

  doc.setFont('helvetica', 'bold');
  doc.text('Current Semester:', 20, 70);
  doc.setFont('helvetica', 'normal');
  doc.text(`Semester ${student.semester} (${student.batch})`, 60, 70);

  doc.setFont('helvetica', 'bold');
  doc.text('Cumulative CGPA:', 120, 70);
  doc.setFont('helvetica', 'normal');
  doc.text(`${student.cgpa.toFixed(2)} / 10.00`, 160, 70);

  // Table Header
  const startY = 92;
  doc.setFillColor(99, 102, 241); // indigo-500
  doc.rect(14, startY, 182, 9, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);

  doc.text('Course Code', 18, startY + 6);
  doc.text('Course Title', 45, startY + 6);
  doc.text('Credits', 125, startY + 6);
  doc.text('Internal (40)', 142, startY + 6);
  doc.text('EndSem (60)', 164, startY + 6);
  doc.text('Grade', 185, startY + 6);

  // Table Rows
  let currentY = startY + 9;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 41, 59);

  grades.forEach((g, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, currentY, 182, 8, 'F');
    }
    doc.text(g.courseCode, 18, currentY + 5.5);
    doc.text(g.courseName.slice(0, 40), 45, currentY + 5.5);
    doc.text(g.credits.toString(), 129, currentY + 5.5);
    doc.text(g.internalMarks.toString(), 148, currentY + 5.5);
    doc.text(g.endSemMarks.toString(), 170, currentY + 5.5);
    doc.setFont('helvetica', 'bold');
    doc.text(g.letterGrade, 188, currentY + 5.5);
    doc.setFont('helvetica', 'normal');

    currentY += 8;
  });

  // Footer & Signatures
  const signY = 240;
  doc.setDrawColor(203, 213, 225);
  doc.line(20, signY, 70, signY);
  doc.line(140, signY, 190, signY);

  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Dean of Academic Affairs', 45, signY + 6, { align: 'center' });
  doc.text('Controller of Examinations', 165, signY + 6, { align: 'center' });

  doc.setFontSize(8);
  doc.text(`Generated on: ${new Date().toLocaleDateString()} | System Authentication Code: APX-${Date.now().toString().slice(-8)}`, 105, 275, { align: 'center' });
  doc.text('This is a computer generated official transcript and requires no physical seal when verified via portal.', 105, 280, { align: 'center' });

  doc.save(`${student.studentId}_Official_Transcript.pdf`);
};

export const generateFeeReceiptPDF = (student: Student, fee: FeeTransaction) => {
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 36, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('APEX UNIVERSITY OF TECHNOLOGY', 105, 16, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('FINANCE & ACCOUNTS DEPARTMENT | OFFICIAL FEE RECEIPT', 105, 25, { align: 'center' });

  // Receipt meta
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Receipt ID: ${fee.receiptId || 'REC-APX-894102'}`, 14, 48);
  doc.text(`Invoice No: ${fee.invoiceNumber}`, 14, 55);
  doc.text(`Payment Date: ${fee.paidDate || new Date().toISOString().split('T')[0]}`, 140, 48);
  doc.text(`Status: PAID (Verified)`, 140, 55);

  // Student details box
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, 62, 182, 30, 2, 2, 'F');

  doc.text('Student:', 20, 72);
  doc.setFont('helvetica', 'normal');
  doc.text(student.fullName, 50, 72);

  doc.setFont('helvetica', 'bold');
  doc.text('Roll No:', 120, 72);
  doc.setFont('helvetica', 'normal');
  doc.text(student.studentId, 150, 72);

  doc.setFont('helvetica', 'bold');
  doc.text('Program:', 20, 82);
  doc.setFont('helvetica', 'normal');
  doc.text(student.program, 50, 82);

  doc.setFont('helvetica', 'bold');
  doc.text('Payment Mode:', 120, 82);
  doc.setFont('helvetica', 'normal');
  doc.text(fee.paymentMethod || 'Online Gateway', 150, 82);

  // Items table
  const tableY = 102;
  doc.setFillColor(16, 185, 129); // emerald-500
  doc.rect(14, tableY, 182, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('Description / Fee Component', 20, tableY + 5.5);
  doc.text('Amount (INR)', 160, tableY + 5.5);

  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'normal');
  let itemY = tableY + 14;

  const items = [
    { name: 'Semester Tuition & Instruction Fee', amount: fee.breakdown.tuition },
    { name: 'Laboratory, Cloud Infra & Practicum Fee', amount: fee.breakdown.labExam },
    { name: 'Digital Library & Journal Subscriptions', amount: fee.breakdown.library },
    { name: 'Sports Complex & Student Activity Fund', amount: fee.breakdown.sportsClub },
    { name: 'Hostel Infrastructure & Mess Maintenance', amount: fee.breakdown.hostelMess || 0 }
  ];

  items.forEach((item, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(14, itemY - 5, 182, 8, 'F');
    }
    doc.text(item.name, 20, itemY);
    doc.text(`$${item.amount.toLocaleString()}`, 160, itemY);
    itemY += 8;
  });

  // Total
  doc.setDrawColor(203, 213, 225);
  doc.line(14, itemY, 196, itemY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Total Amount Paid:', 100, itemY + 8);
  doc.text(`$${fee.amount.toLocaleString()}`, 160, itemY + 8);

  // Security note
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('This is an authorized electronic receipt. Taxes included as applicable.', 105, 230, { align: 'center' });
  doc.text('For finance queries, contact accounts@apex.edu | +1 (555) 800-FIN1', 105, 236, { align: 'center' });

  doc.save(`${fee.invoiceNumber}_Receipt.pdf`);
};

export const generateBonafideCertificatePDF = (student: Student) => {
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 36, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('APEX UNIVERSITY OF TECHNOLOGY', 105, 16, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('OFFICE OF THE REGISTRAR | BONAFIDE STUDENT CERTIFICATE', 105, 25, { align: 'center' });

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('TO WHOMSOEVER IT MAY CONCERN', 105, 60, { align: 'center' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const certificateText = `This is to officially certify that ${student.fullName} (Roll ID: ${student.studentId}) is a bonafide, full-time enrolled student of Apex University of Technology, currently pursuing ${student.program} in the ${student.department}.

As per university academic records, the student is currently enrolled in Semester ${student.semester} of the academic batch ${student.batch}. The student bears good moral character, active academic standing with a CGPA of ${student.cgpa.toFixed(2)} / 10.00, and attendance record of ${student.attendancePercentage}%.

This certificate is issued on the student's request for official verification, visa/passport, scholarship, or internship application purposes.`;

  const splitText = doc.splitTextToSize(certificateText, 170);
  doc.text(splitText, 20, 80);

  // Registrar Seal / Sign
  const signY = 190;
  doc.line(130, signY, 185, signY);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Prof. Robert Sterling', 157, signY + 6, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.text('Registrar & Chief Administrator', 157, signY + 11, { align: 'center' });
  doc.text('Apex University of Technology', 157, signY + 16, { align: 'center' });

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Ref: BONAFIDE/APX/2026/${student.studentId} | Issued on: ${new Date().toLocaleDateString()}`, 105, 260, { align: 'center' });

  doc.save(`${student.studentId}_Bonafide_Certificate.pdf`);
};
