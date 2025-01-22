import { userMap } from "..";

export function getReceiverSocketId(userId: string) {
  return userMap[userId];
}
