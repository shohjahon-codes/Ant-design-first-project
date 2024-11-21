import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { useGetUsers } from "../hooks/useGetUser";
import { useAddUser } from "../hooks/useAddUser";

export function UserFormPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { data } = useGetUsers(); 
  const [form] = Form.useForm();
  const addUser = useAddUser(); // addUser hookini chaqirish

  useEffect(() => {
    if (id) {
      const user = data?.find((u) => u.id.toString() === id);
      if (user) {
        form.setFieldsValue(user); // Formni foydalanuvchi ma'lumotlari bilan to‘ldirish
      }
    }
  }, [id, data, form]);

  const handleFinish = (values) => {
    console.log(values); // Foydalanuvchi ma'lumotlarini konsolga chiqarish
    if (id) {
      message.success(`User ${values.name} updated successfully!`);
      // Tahrirlash uchun PUT so‘rovini qo‘shing
    } else {
      addUser.mutate(values, {
        onSuccess: () => {
          message.success(`User ${values.name} added successfully!`);
          navigate("/"); // Ro‘yxatga qaytish
        },
        onError: () => {
          message.error("Failed to add user.");
        },
      });
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h1 style={{ textAlign: "center" }}>{id ? "Edit User" : "Add User"}</h1>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the user's name!" }]}
        >
          <Input placeholder="Enter user's name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {id ? "Update" : "Add"}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={() => navigate("/")} block>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
