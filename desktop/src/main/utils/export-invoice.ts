import PDFDocument from 'pdfkit'
import { imageSize } from 'image-size'
import * as fs from 'fs'
import { dialog } from 'electron'
import path from 'path'
import { formatPrice, getPostalAddress, getShippingOption } from '../../common/utils'
import { fetchOrder } from '../api/orders'

function drawLogo(doc: typeof PDFDocument, pageWidth: number) {
  const logoPath = path.resolve('resources/invoice-logo.png')
  const maxLogoWidth = 160
  const logoY = 40

  // measure actual image size
  const { width: imgWidth, height: imgHeight } = imageSize(fs.readFileSync(logoPath))

  // decide render width (never upscale)
  const renderWidth = Math.min(maxLogoWidth, imgWidth)

  // keep aspect ratio
  const scale = renderWidth / imgWidth
  const renderHeight = imgHeight * scale

  // center horizontally on page
  const logoX = doc.page.margins.left + (pageWidth - renderWidth) / 2

  // draw the logo
  doc.image(logoPath, logoX, logoY, {
    width: renderWidth,
    height: renderHeight
  })
  return pageWidth
}
function drawLineItem(
  doc: typeof PDFDocument,
  label: string,
  amount: string,
  y: number,
  pageWidth: number
) {
  const marginLeft = doc.page.margins.left
  const marginRight = doc.page.margins.right

  // define a narrower label column, aligned to the right side
  const labelColumnWidth = pageWidth * 0.6 // adjust: 0.6 → labels start further right
  const labelX = marginLeft + pageWidth - labelColumnWidth

  // draw label
  doc.text(label, labelX, y, {
    align: 'left',
    width: labelColumnWidth / 2 // makes it hug closer to the amount
  })

  // draw amount (flush right)
  doc.text(amount, marginLeft, y, {
    align: 'right',
    width: pageWidth - marginRight
  })
}

export async function exportInvoice(id: string) {
  const order = await fetchOrder(id)
  if (!order) throw new Error('Cannot find order to export')

  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Save invoice as PDF',
    defaultPath: `invoice_${order.id.replace('pi_', '')}.pdf`,
    filters: [{ name: 'PDF', extensions: ['pdf'] }]
  })

  if (canceled || !filePath) return { success: !canceled }

  const doc = new PDFDocument({ margin: 50 })
  doc.registerFont('Geist-Regular', path.resolve('resources/fonts/Geist-Regular.ttf'))
  doc.registerFont('Geist-Medium', path.resolve('resources/fonts/Geist-Medium.ttf'))
  doc.registerFont('Geist-Semibold', path.resolve('resources/fonts/Geist-SemiBold.ttf'))
  doc.registerFont('Geist-Bold', path.resolve('resources/fonts/Geist-Bold.ttf'))
  doc.pipe(fs.createWriteStream(filePath))

  // Brand logo + name
  const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right
  drawLogo(doc, pageWidth)

  // Invoice title
  doc.moveDown(3)
  doc.font('Geist-Semibold').fontSize(18).text('INVOICE', { align: 'center' })

  // Invoice info
  doc.moveDown(2)
  doc.font('Geist-Medium').fontSize(12)
  doc.text(`Invoice No.: ${order.id}`)
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`)
  doc.text(`Shipping Option: ${getShippingOption(order.shippingCost)}`)

  // Bill To
  doc.moveDown()
  doc.font('Geist-Semibold').fontSize(14).text('Bill To:')
  doc.font('Geist-Regular').fontSize(12)
  doc.text(order.customer)
  doc.text(order.email)
  doc.text(order.phone)
  doc.text(
    getPostalAddress({
      line1: order.line1,
      line2: order.line2,
      city: order.city,
      state: order.state,
      postalCode: order.postalCode,
      country: order.country,
      customer: order.customer
    })
  )

  // Products table
  doc.moveDown(2)
  doc.font('Geist-Medium').fontSize(12)

  let y = doc.y
  y = drawRow(['Product', 'Qty', 'Price', 'Subtotal'], y)

  doc.font('Geist-Regular').fontSize(11)
  order.products.forEach((p: any) => {
    const subtotal = p.qty * p.product.price
    y = drawRow(
      [p.product.name, String(p.qty), formatPrice(p.product.price), formatPrice(subtotal)],
      y
    )
  })

  // Totals (right aligned)
  doc.moveDown(2)

  // usage
  doc.font('Geist-Medium').fontSize(12)
  drawLineItem(doc, 'Subtotal:', formatPrice(order.total, { inCent: true }), doc.y, pageWidth)
  drawLineItem(
    doc,
    'Shipping:',
    formatPrice(order.shippingCost, { inCent: true }),
    doc.y,
    pageWidth
  )
  drawLineItem(doc, 'Tax:', formatPrice(order.tax, { inCent: true }), doc.y, pageWidth)

  doc.font('Geist-Bold').fontSize(13)
  drawLineItem(
    doc,
    'Total:',
    formatPrice(order.total + order.shippingCost + order.tax, { inCent: true }),
    doc.y,
    pageWidth
  )

  // Footer
  doc.moveDown(4)
  doc.font('Geist-Regular').fontSize(10).text('Thank you for your purchase!', { align: 'center' })

  doc.end()

  // ---- Helper: Table row with proper spacing ----
  function drawRow(cells: string[], y: number, rowHeight = 40) {
    const colWidths = [320, 50, 70, 70]
    let x = doc.page.margins.left

    cells.forEach((text, i) => {
      doc.rect(x, y, colWidths[i], rowHeight).stroke()
      doc.text(text, x + 5, y + 8, {
        width: colWidths[i] - 10,
        align: i === 1 ? 'center' : 'left'
      })
      x += colWidths[i]
    })

    return y + rowHeight
  }
  return { success: !canceled }
}
