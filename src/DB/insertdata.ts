import Contracts from "./schema/contracts";
import { IContractDto } from "../dto/IContractDto";
import ReportsModel, { IReportsModel } from "./schema/report";
import passengers, { IPassengersModel } from "./schema/passengers";
import PassengersModel from "./schema/passengers";
import ContractsModel from "./schema/contracts";

const insertData = async ({
  dateContract,
  numContract,
  passengers,
  report,
  typeReport,
}: IContractDto) => {
  try {
    const contract = await ContractsModel.create({
      numContract: numContract,
      dateContract: dateContract,
      typeReport: typeReport,
    });
    if (!contract) return false;

    let reportsModelData: IReportsModel[] = report.map(
      ({ bank, costTitle, datepayment, number, payments, presenter }) => {
        return {
          costTitle,
          datepayment,
          number,
          payments,
          presenter,
          bank,
          contractId: contract.id,
        };
      }
    );
    await ReportsModel.bulkCreate(reportsModelData);

    let passengersModelData: IPassengersModel[] = passengers.map(
      (passenger) => {
        return { passenger, contractId: contract.id };
      }
    );
    await PassengersModel.bulkCreate(passengersModelData);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
export default { insertData };
