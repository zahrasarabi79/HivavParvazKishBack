import Event from "./schema/event";

export enum Events {
  ContractCreated = "contract_created",
  ContractUpdated = "contract_updated",
  ContractDeleted = "contract_deleted",
}

export async function raiseEvent(userId: number, contractId: number, event: Events) {
  await Event.create({
    eventName: event as string,
    userId,
    contractId,
  });
}

export default raiseEvent;
