import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../config/request";
import { message } from "antd"; // Agar bildirishnoma qo‘shilsa

export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => request.post("/clients", values).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user-data"]); 
     
    },
    onError: (error) => {
      console.error(error);
     
    },
  });
};
