import Excel from '@helpers/Excel'
import { formatDateGenerateFile } from '@helpers/Date'
import BuildResponse from '@modules/Response/BuildResponse'
import express, { Request, Response, NextFunction } from 'express'

const router = express.Router()
/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  const buildResponse = BuildResponse.get({
    message: 'Express Docs Functions',
    maintaner: 'masb0ymas, <n.fajri@outlook.com>',
    source: 'https://github.com/masb0ymas/express-docs-functions',
  })
  return res.json(buildResponse)
})

router.post('/convert-excel', async (req: Request, res: Response) => {
  const formData = req.body
  const dataJson = JSON.parse(JSON.stringify(formData))

  const header = [
    { header: 'No', key: 'no', width: 5 },
    { header: 'Name', key: 'nama', width: 20 },
    { header: 'Nomor Telp', key: 'nohp', width: 20 },
  ]

  const newData = []
  for (let i = 0; i < dataJson.length; i += 1) {
    const item = dataJson[i]
    newData.push({
      ...item,
    })
  }

  const streamExcel: Buffer = await Excel.generate(header, newData)

  const dateNow = formatDateGenerateFile(new Date())
  const filename = `${dateNow}_generate_excel.xlsx`

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`)
  res.setHeader('Content-Length', streamExcel.length)

  return res.send(streamExcel)
})

export default router
