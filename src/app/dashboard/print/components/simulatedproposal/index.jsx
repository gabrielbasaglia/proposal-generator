import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../../../providers/modal";

const SimulatedProposal = () => {
  const { selectedCustomer, calculateAverage } = useContext(ModalContext);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    const kwhValues = Array.from(
      { length: 12 },
      (_, index) => selectedCustomer?.[`kwh${index + 1}`] || 0,
    );

    // Filter out zero values
    const validKwhValues = kwhValues.filter((value) => value !== 0);

    if (validKwhValues.length > 0) {
      const calculatedAverage = calculateAverage(validKwhValues);
      setAverage(calculatedAverage);
    } else {
      // No valid values, set average to 0
      setAverage(0);
    }
  }, [calculateAverage, selectedCustomer]);

  const valorAtualCpfl =
    (Number(selectedCustomer?.cpfltusd.replace("R$", "").replace(",", ".")) ||
      0) +
    (Number(selectedCustomer?.cpflte.replace("R$", "").replace(",", ".")) || 0);

  const PadraoValorAtualCpfl = valorAtualCpfl.toFixed(8);
  const valorAtualAxs = 0.71962;

  const tarifaMun = 11.37;

  return (
    <div className=" flex flex-col md:flex-row  md:mx-auto md:justify-between">
      <div className="w-full flex flex-col justify-center md:pr-2">
        <div className="flex justify-between">
          <h1 className="font-bold">Valor KWh CPFL</h1>
          <p className="font-bold text-cyan-600">R$ {PadraoValorAtualCpfl}</p>
        </div>

        <table>
          <thead>
            <tr>
              <td colSpan="3" className="text-center py-1 border border-black">
                Comparativo do Mês
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center py-2 px-1 border border-black">
                Consumo
              </td>
              <td className="text-center py-2 px-1 border border-black">
                Valor KWh
              </td>
              <td className="text-center  py-2 px-1 border  border-black">
                Total
              </td>
            </tr>
            <tr>
              <td className="text-center  py-2 px-1 border bg-cyan-600 border-black">
                {selectedCustomer?.kwh1}
              </td>
              <td className="text-center  py-2 px-1 border bg-cyan-600 border-black">
                {PadraoValorAtualCpfl}
              </td>
              <td className="text-center  py-2 px-1 border bg-cyan-600 border-black">
                {(
                  selectedCustomer?.kwh1 * PadraoValorAtualCpfl +
                  tarifaMun
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
            </tr>
            <tr>
              <td className="text-center  py-2 px-1 border bg-green-600 border-black">
                {selectedCustomer?.kwh1}
              </td>
              <td className="text-center  py-2 px-1 border bg-green-600 border-black">
                0,71962
              </td>
              <td className="text-center  py-2 px-1 border bg-green-600 border-black">
                {(selectedCustomer?.kwh1 * valorAtualAxs).toLocaleString(
                  "pt-BR",
                  { style: "currency", currency: "BRL" },
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-full flex flex-col justify-center  my-2  md:pl-2">
        <div className="flex justify-between">
          <h1 className="font-bold">Valor KWh AXS</h1>
          <p className="font-bold  text-green-600 ">R$ {valorAtualAxs}</p>
        </div>

        <table>
          <thead>
            <tr>
              <td colSpan="3" className="text-center py-1  border border-black">
                Comparativo da Média
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center py-2 px-1 border border-black">
                Consumo
              </td>
              <td className="text-center py-2 px-1 border border-black">
                Valor KWh
              </td>
              <td className="text-center  py-2 px-1 border  border-black">
                Total
              </td>
            </tr>
            <tr>
              <td className="text-center  py-2 px-1 border bg-cyan-600 border-black">
                {average}
              </td>
              <td className="text-center  py-2 px-1 border bg-cyan-600 border-black">
                {PadraoValorAtualCpfl}
              </td>
              <td className="text-center  py-2 px-1 border bg-cyan-600 border-black">
                {(average * valorAtualCpfl + 11.37).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
            </tr>
            <tr>
              <td className="text-center  py-2 px-1 border bg-green-600 border-black">
                {average}
              </td>
              <td className="text-center  py-2 px-1 border bg-green-600 border-black">
                0,71962
              </td>
              <td className="text-center  py-2 px-1 border bg-green-600 border-black">
                {(average * valorAtualAxs).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SimulatedProposal;
