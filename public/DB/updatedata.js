"use strict";
// import Contracts from "./schema/contracts";
// import { IContractDto } from "../dto/IContractDto";
// import ReportsModel, { IReportsModel } from "./schema/report";
// import passengers, { IPassengersModel } from "./schema/passengers";
// import PassengersModel from "./schema/passengers";
// import ContractsModel from "./schema/contracts";
// const id = "1";
// const updateData = async ({
//   dateContract,
//   numContract,
//   passengers,
//   report,
//   typeReport,
// }: IContractDto ,findContract:number) => {
//   try {
//     const contract = await ContractsModel.update(
//       {
//         dateContract,
//         numContract,
//         passengers,
//         report,
//         typeReport,
//       } as IContractDto,
//       { where: { id: parseInt(id) } }
//     );
//     if (!contract) return false;
//     let reportsModelData: IReportsModel[] = report.map(
//       ({ bank, costTitle, datepayment, number, payments, presenter }) => {
//         return {
//           costTitle,
//           datepayment,
//           number,
//           payments,
//           presenter,
//           bank,
//           contractId:parseInt(id),
//         };
//       }
//     );
//     await ReportsModel.update(reportsModelData, { where: { id: parseInt(id) } });
//     let passengersModelData: IPassengersModel[] = passengers.map(
//       (passenger) => {
//         return { passenger, contractId:parseInt(id) };
//       }
//     );
//     await PassengersModel.update(passengersModelData, { where: { id: parseInt(id) } });
//     return contract;
//   } catch (error) {
//     console.log(error);
//   }
// };
// export default { updateData };
