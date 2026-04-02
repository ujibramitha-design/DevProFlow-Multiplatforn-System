# Template Directory

This directory contains master templates for the Multi-Master High-Fidelity Document Engine.

## Supported Formats

- **DOCX**: Microsoft Word documents with placeholder variables
- **HTML**: HTML templates that can be converted to PDF

## Template Variables

All templates support the following placeholder variables:

### Customer Information
- `{NAMA_NASABAH}` - Customer full name
- `{NIK}` - National ID number
- `{ALAMAT}` - Address
- `{NO_TELP}` - Phone number
- `{EMAIL}` - Email address

### Property Information
- `{NAMA_PROPERTI}` - Property name/project
- `{TIPE_UNIT}` - Unit type
- `{BLOK}` - Block number
- `{NOMOR_UNIT}` - Unit number
- `{LUAS_TANAH}` - Land area (m²)
- `{LUAS_BANGUNAN}` - Building area (m²)

### Financial Information
- `{HARGA_JUAL}` - Selling price
- `{HARGA_PROPERTI}` - Property price/loan amount
- `{DP}` - Down payment
- `{CICILAN}` - Monthly installment
- `{TENOR}` - Loan tenure (months)

### Banking & Legal
- `{BANK}` - Bank name
- `{NOTARIS}` - Notary name
- `{TANGGAL}` - Current date
- `{TANGGAL_AKAD}` - Agreement date
- `{TANGGAL_SERAH_TERIMA}` - Handover date

## Creating New Templates

### For DOCX Templates:
1. Create your document in Microsoft Word
2. Use `{VARIABLE_NAME}` format for placeholders
3. **Important**: Do NOT change formatting after adding placeholders
4. Images and logos will maintain their exact position and quality (300 DPI)
5. Save as `.docx` format
6. Place in this directory

### For HTML Templates:
1. Create HTML file with proper structure
2. Use `{{VARIABLE_NAME}}` format for placeholders (Handlebars syntax)
3. Include inline CSS for styling (external CSS won't work in PDF)
4. Use `@page` CSS rules for PDF page settings
5. Save as `.html` format
6. Place in this directory

## Template Categories

Templates are automatically categorized based on filename:
- **Legal**: Files containing 'akad', 'perjanjian'
- **Finance**: Files containing 'invoice', 'kwitansi'
- **Estate**: Files containing 'bast', 'serah-terima'
- **Correspondence**: Files containing 'surat', 'letter'
- **Reports**: Files containing 'laporan', 'report'
- **General**: All other files

## Sample Templates Included

1. `sample-akad-kredit.html` - Credit agreement template
2. `sample-invoice.html` - Invoice template

## Best Practices

1. **High-Fidelity Preservation**:
   - All images maintain 300 DPI quality
   - Layout positions are preserved exactly
   - Formatting (bold, italic, colors) remains intact

2. **Variable Naming**:
   - Use UPPERCASE for variable names
   - Use underscores for multi-word variables
   - Be consistent across all templates

3. **Testing**:
   - Always test templates before production use
   - Verify all placeholders are replaced correctly
   - Check PDF output quality for HTML templates

4. **File Organization**:
   - Use descriptive filenames
   - Include category keywords in filename
   - Keep templates updated and versioned

## Usage in Application

Templates in this directory are automatically detected and available in the Document Generator dashboard at `/dashboard/generate`.

Users can:
- Select templates from categorized lists
- Fill data manually or pull from database
- Generate documents in DOCX or PDF format
- Bulk generate multiple documents at once
