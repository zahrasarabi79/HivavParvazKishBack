import { IUpdateContractDto } from "../dto/IContractDto";
import ContractsModel from "./schema/contracts";
import PassengersModel, { IPassengersModel } from "./schema/passengers";
import ReportsModel, { IReportsModel } from "./schema/report";

const updateData = async ({
    id,
    numContract,
    dateContract,
    typeReport,
    report,
    passengers,
  }: IUpdateContractDto) => {
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
    let reportsModelData: IReportsModel[] = report.map(
      ({ bank, costTitle, datepayment, number, payments, presenter }) => {
        return {
          costTitle,
          datepayment,
          number,
          payments,
          presenter,
          bank,
          contractId: id,
        };
      }
    );
    await ReportsModel.bulkCreate(reportsModelData);

    let passengersModelData: IPassengersModel[] = passengers.map(
      (passenger) => {
        return { passenger, contractId: id };
      }
    );
    await PassengersModel.bulkCreate(passengersModelData);
  };
  export default { updateData };
