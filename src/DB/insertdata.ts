import Contracts from "./schema/contracts";
import { IContractDto } from "../dto/IContractDto";
import ReportsModel, { IReportsModel } from "./schema/report";
import passengers, { IPassengersModel } from "./schema/passengers";
import PassengersModel from "./schema/passengers";
import ContractsModel from "./schema/contracts";
import ReportsPaymentModel, { IReportsPayment } from "./schema/reportPayment";

const insertData = async ({ dateContract, numContract, passengers, report, typeReport }: IContractDto) => {
  try {
    const contract = await ContractsModel.create({
      numContract,
      dateContract,
      typeReport,
    });
    if (!contract) return false;

    let reportsModelData: IReportsModel[] = report.map(({ costTitle, number, presenter, reportPayment }) => {
      let reportPaymentData: IReportsPayment[] = reportPayment.map(({ bank, payments, datepayment }) => {
        return { bank, payments, datepayment, contractId: contract.id };
      });
      return {
        costTitle,
        number,
        presenter,
        reportPayment: reportPaymentData,
        contractId: contract.id,
      };
    });
    for (const reportData of reportsModelData) {
      const reportInstance = await ReportsModel.create(reportData);
      const reportPayments = reportData.reportPayment.map((payment) => ({
        ...payment,
        reportId: reportInstance.id,
        contractId: reportInstance.contractId,
      }));
      await ReportsPaymentModel.bulkCreate(reportPayments);
    }
    
    await ReportsModel.bulkCreate(reportsModelData);

    // let reportsModelData: IReportsModel[] = report.map(({ costTitle, number, presenter, reportPayment }) => {
    //   return {
    //     costTitle,
    //     number,
    //     presenter,
    //     reportPayment,
    //     contractId: contract.id,
    //   };
    // });
    // await ReportsModel.bulkCreate(reportsModelData);

    let passengersModelData: IPassengersModel[] = passengers.map((passenger) => {
      return { passenger, contractId: contract.id };
    });
    await PassengersModel.bulkCreate(passengersModelData);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
export default { insertData };
