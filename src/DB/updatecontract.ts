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
    let reportsReturnPaymentData: IReportsReturnPayment[] = reportsReturnPayment.map(({ returnPaymentsbank, returnPayments, dateReturnPayment, returnPaymentDescription }) => {
      return { returnPaymentsbank, returnPayments, dateReturnPayment, contractId: id, returnPaymentDescription };
    });
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
    // Create a single report instance for each reportData

    // Map and associate all reportsPayment data with the report instance
    const reportPayments = reportData.reportsPayment.map((payment) => ({
      ...payment,
      reportId: reportInstance.id,
      contractId: reportInstance.contractId,
    }));

    // Map and associate all reportsReturnPayment data with the report instance
    const reportsReturnPayment = reportData.reportsReturnPayment.map((payment) => ({
      ...payment,
      reportId: reportInstance.id,
      contractId: reportInstance.contractId,
    }));

    // Use bulkCreate to insert multiple payments and return payments in one go
    await ReportsPaymentModel.bulkCreate(reportPayments);
    await ReportsReturnPaymentModel.bulkCreate(reportsReturnPayment);
  }
};
export default { updateData };
