import { IUpdateContractDto } from "../dto/IContractDto";
import ContractsModel from "./schema/contracts";
import ReportsModel, { IReportsModel } from "./schema/reports";
import ReportsPaymentModel, { IReportsPayment } from "./schema/reportsPayment";
import ReportsReturnPaymentModel, { IReportsReturnPayment } from "./schema/reportsReturnPayment";

const updateData = async ({ id, numContract, dateContract, customer, typeContract, reports }: IUpdateContractDto) => {
  await ContractsModel.update(
    {
      numContract,
      dateContract,
      typeContract,
      customer,
    },
    {
      where: { id: id },
    }
  );
  await ReportsModel.destroy({
    where: { contractId: id },
  });

  let reportsModelData: IReportsModel[] = reports.map(({ totalCost, reportDescription, presenter, reportsPayment, reportsReturnPayment }) => {
    let reportPaymentData: IReportsPayment[] = reportsPayment.map(({ bank, payments, datepayment, paymentDescription }) => {
      return { bank, payments, datepayment, contractId: id, paymentDescription };
    });
    let reportsReturnPaymentData: IReportsReturnPayment[] = reportsReturnPayment.map(
      ({ returnPaymentsbank, returnPayments, dateReturnPayment, returnPaymentDescription }) => {
        return { returnPaymentsbank, returnPayments, dateReturnPayment, contractId: id, returnPaymentDescription };
      }
    );
    return {
      totalCost,
      reportDescription,
      presenter,
      reportsPayment: reportPaymentData,
      reportsReturnPayment: reportsReturnPaymentData,
      contractId: id,
    };
  });
  for (const reportData of reportsModelData) {
    const reportInstance = await ReportsModel.create(reportData);
    const reportPayments = reportData.reportsPayment.map((payment) => ({
      ...payment,
      reportId: reportInstance.id,
      contractId: reportInstance.contractId,
    }));
    await ReportsPaymentModel.bulkCreate(reportPayments);
  }
  for (const reportData of reportsModelData) {
    const reportInstance = await ReportsModel.create(reportData);
    const reportsReturnPayment = reportData.reportsReturnPayment.map((payment) => ({
      ...payment,
      reportId: reportInstance.id,
      contractId: reportInstance.contractId,
    }));
    await ReportsReturnPaymentModel.bulkCreate(reportsReturnPayment);
  }
  await ReportsModel.bulkCreate(reportsModelData);
};
export default { updateData };
