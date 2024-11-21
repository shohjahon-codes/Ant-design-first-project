import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../config/request";
import { message } from "antd"; // Bildirishnoma uchun

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => request.put(`/clients/${values.id}`, values).then((res) => res.data),
    onSuccess: (data) => {
     
      queryClient.invalidateQueries(["clients"]);
      message.success("User updated successfully!");
    },
    onError: (error) => {
      console.error(error);
      message.error("Error updating user.");
    },
    onSettled: () => {
      // Har holda invalidate qilish va refetch qilish
      queryClient.refetchQueries(["clients"]);
    },
  });
};
