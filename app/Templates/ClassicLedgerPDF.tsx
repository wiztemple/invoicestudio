import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Invoice } from '../db';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  container: {
    backgroundColor: '#FFFFFF',
    // padding: 20,
    // border: '1px solid #EAEDF0',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    objectFit: 'cover',
  },
  invoiceInfo: {
    textAlign: 'right',
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  summaryText: {
    fontSize: 10,
    color: '#9A9899',
  },
  separator: {
    flexGrow: 1,
    height: 1,
    backgroundColor: '#F0EDEF',
    marginLeft: 10,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    color: '#64676D',
  },
  table: {
    marginTop: 20,
    borderRadius: 8,
    border: '1px solid #EAEDF0',
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#3A7AF6',
    padding: 8,
  },
  tableHeaderText: {
    fontSize: 12,
    color: '#FFFFFF',
    width: '25%',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottom: '1px solid #EAEDF0',
  },
  tableRowText: {
    fontSize: 12,
    color: '#060A17',
    width: '25%',
  },
  totalsContainer: {
    alignItems: 'flex-end',
    marginTop: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    paddingVertical: 5,
  },
  totalLabel: {
    fontSize: 12,
    color: '#9A9899',
  },
  totalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#060A17',
  },
  notesContainer: {
    backgroundColor: '#F7F7F7',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  notesText: {
    fontSize: 12,
  },
});

// Create PDF Document Component
const ClassicLedgerPDF = ({ invoice }: { invoice: Invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        <View style={styles.header}>
          {invoice.logo ? (
            <Image style={styles.logo} src={invoice.logo} />
          ) : (
            <Text>Logo Here</Text>
          )}
          <View style={styles.invoiceInfo}>
            <Text style={styles.text}>Invoice No:</Text>
            <Text style={[styles.text, { color: '#3A7AF6' }]}>{invoice.invoiceNumber}</Text>
          </View>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryText}>SUMMARY</Text>
          <View style={styles.separator} />
        </View>

        <View style={styles.section}>
          <View>
            <Text style={styles.title}>{invoice.companyName || 'Company Name'}</Text>
            <Text style={styles.text}>{invoice.companyAddress || 'Address'}</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.title}>{invoice.billTo || 'Bill To'}</Text>
            <Text style={styles.text}>{invoice.companyAddress || 'Address'}</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Date Issued: {invoice.dateIssued}</Text>
            <Text style={styles.text}>Payment Terms: {invoice.paymentTerms}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Item</Text>
            <Text style={styles.tableHeaderText}>Rate</Text>
            <Text style={styles.tableHeaderText}>Quantity</Text>
            <Text style={styles.tableHeaderText}>Amount</Text>
          </View>
          {invoice.items.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableRowText}>{item.itemName}</Text>
              <Text style={styles.tableRowText}>{item.rate}</Text>
              <Text style={styles.tableRowText}>{item.quantity}</Text>
              <Text style={styles.tableRowText}>{item.amount}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>SubTotal</Text>
            <Text style={styles.totalValue}>{invoice.subtotal}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax</Text>
            <Text style={styles.totalValue}>{invoice.tax}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Discount</Text>
            <Text style={styles.totalValue}>{invoice.discount}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Shipping Fee</Text>
            <Text style={styles.totalValue}>{invoice.shippingFee}</Text>
          </View>
        </View>

        <Text>Status: {invoice.status}</Text>
        <Text>Currency: {invoice.currency}</Text>

        <View style={styles.notesContainer}>
          <Text style={styles.notesText}>Notes: {invoice.notes}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default ClassicLedgerPDF;
