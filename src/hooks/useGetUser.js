import { useQuery } from "@tanstack/react-query";
import { request } from "../config/request";

export const useGetUsers = () => {
  return useQuery(
    ["clients"], 
    async () => {
      const { data } = await request.get("/clients");
      return data;
    }
  );
};
