import PDFDocument from 'pdfkit'
import * as fs from 'fs'
import { dialog } from 'electron'
import path from 'path'
import { formatAddress } from 'localized-address-format'

interface Address {
  line1: string
  line2?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
  customer?: string
}

export const getPostalAddress = ({
  line1,
  line2,
  city,
  state,
  postalCode,
  country,
  customer
}: Address) =>
  formatAddress({
    name: customer,
    postalCountry: country,
    postalCode,
    administrativeArea: state,
    addressLines: line2 ? [line1, line2] : [line1],
    locality: city
  }).join('\n')

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)

export async function exportInvoice(order: any) {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Save Order as PDF',
    defaultPath: `order_${order.id}.pdf`,
    filters: [{ name: 'PDF', extensions: ['pdf'] }]
  })

  if (canceled || !filePath) return

  const doc = new PDFDocument({ margin: 50 })
  doc.registerFont('Geist-Regular', path.resolve('resources/fonts/Geist-Regular.ttf'))
  doc.registerFont('Geist-Medium', path.resolve('resources/fonts/Geist-Medium.ttf'))
  doc.registerFont('Geist-Semibold', path.resolve('resources/fonts/Geist-SemiBold.ttf'))
  doc.registerFont('Geist-Bold', path.resolve('resources/fonts/Geist-Bold.ttf'))
  doc.pipe(fs.createWriteStream(filePath))

  // Brand logo + name
  const logoPath = path.resolve('resources/invoice-logo.png')
  const logoWidth = 211
  const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right
  const logoX = doc.page.margins.left + (pageWidth - logoWidth) / 2
  doc.image(logoPath, logoX, 40, { width: logoWidth })

  // Invoice title
  doc.moveDown(3)
  doc.font('Geist-Semibold').fontSize(18).text('INVOICE', { align: 'center' })

  // Invoice info
  doc.moveDown(2)
  doc.font('Geist-Medium').fontSize(12)
  doc.text(`Invoice No.: ${order.id}`)
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`)
  doc.text(`Shipping Option: ${order.shippingOption}`)

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

  let totalCalc = 0
  doc.font('Geist-Regular').fontSize(11)
  order.products.forEach((p: any) => {
    const subtotal = p.qty * p.product.price
    totalCalc += subtotal
    y = drawRow(
      [p.product.name, String(p.qty), formatPrice(p.product.price), formatPrice(subtotal)],
      y
    )
  })

  // Totals (right aligned)
  doc.moveDown(2)

  doc.font('Geist-Semibold').fontSize(13)
  doc.text(`Subtotal: ${formatPrice(totalCalc)}`, doc.page.margins.left, doc.y, {
    width: pageWidth,
    align: 'right'
  })
  doc.font('Geist-Medium').fontSize(12)
  doc.text(
    `Shipping: ${formatPrice(order.shippingCost)} (${order.shippingOption})`,
    doc.page.margins.left,
    doc.y,
    { width: pageWidth, align: 'right' }
  )
  doc.text(`Tax: ${formatPrice(order.tax)}`, doc.page.margins.left, doc.y, {
    width: pageWidth,
    align: 'right'
  })
  doc.font('Geist-Bold').fontSize(14)
  doc.text(`Total: ${formatPrice(order.total)}`, doc.page.margins.left, doc.y, {
    width: pageWidth,
    align: 'right'
  })

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
}
