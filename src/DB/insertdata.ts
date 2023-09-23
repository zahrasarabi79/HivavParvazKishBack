import Contracts from "./schema/contracts";
import { IContractDto } from "../dto/IContractDto";
import ReportsModel, { IReportsModel } from "./schema/reports";
import customers, { ICustomersModel } from "./schema/customers";
import CustomersModel from "./schema/customers";
import ContractsModel from "./schema/contracts";
import ReportsPaymentModel, { IReportsPayment } from "./schema/reportsPayment";
import reportsReturnPaymentModel, { IReportsReturnPayment } from "./schema/reportsReturnPayment";

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
      await reportsReturnPaymentModel.bulkCreate(reportsReturnPayment);
    }
    await ReportsModel.bulkCreate(reportsModelData);

    // let customersModelData: ICustomersModel[] = customers.map((customer) => {
    //   return { customer, contractId: contract.id };
    // });
    // await CustomersModel.bulkCreate(customersModelData);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
export default { insertData };
