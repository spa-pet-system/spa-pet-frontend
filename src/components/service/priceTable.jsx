// src/components/service/PriceTable.jsx
import { useEffect, useState } from "react"
import { getPriceTable } from "~/services/priceTableService" 

export default function PriceTable() {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const data = await getPriceTable()
        setEntries(data)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])

  // group theo petType
  const dogs = entries.filter(e => e.petType === "dog")
  const cats = entries.filter(e => e.petType === "cat")

  const renderRows = list =>
    list.map((e, i) => (
      <tr key={i} className="odd:bg-white even:bg-gray-50">
        <td className="px-4 py-2 text-center">{e.minWeight} – {e.maxWeight} kg</td>
        <td className="px-4 py-2 text-right">{e.price.toLocaleString()} ₫</td>
      </tr>
    ))

  return (
    <div className="my-16">
      <h2 className="text-2xl font-bold text-center text-orange-600 mb-8">BẢNG GIÁ DỊCH VỤ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* DOG TABLE */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-orange-100 px-4 py-2 font-semibold">Chó</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-orange-50">
                <th className="px-4 py-2">Cân nặng</th>
                <th className="px-4 py-2">Giá (VNĐ)</th>
              </tr>
            </thead>
            <tbody>{renderRows(dogs)}</tbody>
          </table>
        </div>

        {/* CAT TABLE */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-orange-100 px-4 py-2 font-semibold">Mèo</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-orange-50">
                <th className="px-4 py-2">Cân nặng</th>
                <th className="px-4 py-2">Giá (VNĐ)</th>
              </tr>
            </thead>
            <tbody>{renderRows(cats)}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
