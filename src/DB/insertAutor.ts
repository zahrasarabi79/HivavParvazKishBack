import Contracts from "./schema/contracts";
import { IContractDto } from "../dto/IContractDto";
import ReportsModel, { IReportsModel } from "./schema/reports";

import ContractsModel from "./schema/contracts";
import ReportsPaymentModel, { IReportsPayment } from "./schema/reportsPayment";
import reportsReturnPaymentModel, { IReportsReturnPayment } from "./schema/reportsReturnPayment";
import ReportsReturnPaymentModel from "./schema/reportsReturnPayment";

const insertData = async ({ dateContract, numContract, customer, reports, typeContract }: IContractDto) => {
  try {
    const contract = await ContractsModel.create({
      numContract,
      dateContract,
      typeContract,
      customer,
    });
    if (!contract) return false;

    let reportsModelData: IReportsModel[] = reports.map(({ totalCost, reportDescription, presenter, reportsPayment, reportsReturnPayment }) => {
      let reportPaymentData: IReportsPayment[] = reportsPayment.map(({ bank, payments, datepayment, paymentDescription }) => {
        return { bank, payments, datepayment, contractId: contract.id, paymentDescription };
      });
      let reportsReturnPaymentData: IReportsReturnPayment[] = reportsReturnPayment.map(
        ({ returnPaymentsbank, returnPayments, dateReturnPayment, returnPaymentDescription }) => {
          return { returnPaymentsbank, returnPayments, dateReturnPayment, contractId: contract.id, returnPaymentDescription };
        }
      );
      return {
        totalCost,
        reportDescription,
        presenter,
        reportsPayment: reportPaymentData,
        reportsReturnPayment: reportsReturnPaymentData,
        contractId: contract.id,
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
    console.log(contract);

    return contract;
  } catch (error) {
    console.log(error);
  }
};
export default { insertData };
