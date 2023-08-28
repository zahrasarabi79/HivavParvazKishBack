import { IUpdateContractDto } from "../dto/IContractDto";
import ContractsModel from "./schema/contracts";
import PassengersModel, { IPassengersModel } from "./schema/passengers";
import ReportsModel, { IReportsModel } from "./schema/report";
import ReportsPaymentModel, { IReportsPayment } from "./schema/reportPayment";

const updateData = async ({ id, numContract, dateContract, typeReport, report, passengers }: IUpdateContractDto) => {
  await ContractsModel.update(
    {
      numContract,
      dateContract,
      typeReport,
    },
    {
      where: { id: id },
    }
  );
  await ReportsModel.destroy({
    where: { contractId: id },
  });
  await PassengersModel.destroy({
    where: { contractId: id },
  });
  let reportsModelData: IReportsModel[] = report.map(({ costTitle, number, presenter, reportPayment }) => {
    let reportPaymentData: IReportsPayment[] = reportPayment.map(({ bank, payments, datepayment }) => {
      return { bank, payments, datepayment, contractId: id };
    });
    return {
      costTitle,
      number,
      presenter,
      reportPayment: reportPaymentData,
      contractId: id,
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

  let passengersModelData: IPassengersModel[] = passengers.map((passenger) => {
    return { passenger, contractId: id };
  });
  await PassengersModel.bulkCreate(passengersModelData);
};
export default { updateData };
