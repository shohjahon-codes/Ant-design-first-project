import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsers } from "../hooks/useGetUser";
import { List, Button, Input, message } from "antd";
import { useEditUser } from "../hooks/useEdituser"; // useEditUser hookini import qilish

export function Home () {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetUsers();
  const { mutate: editUser } = useEditUser(); 

  const [editingUser, setEditingUser] = useState(null); 
  const [newName, setNewName] = useState(""); 

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleEdit = (user) => {
    setEditingUser(user);
    setNewName(user.name);
  };

  const handleSave = () => {
    if (newName.trim() === "") {
      message.error("Please enter a valid name.");
      return;
    }

    // Foydalanuvchini tahrirlash
    editUser({ ...editingUser, name: newName });
    setEditingUser(null); // Tahrirni yakunlash
    setNewName(""); // Nomini bo'shatish
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h1 style={{ textAlign: "center" }}>User List</h1>
      <Button
        type="primary"
        block
        style={{ marginBottom: "20px" }}
        onClick={() => navigate("/add")}
      >
        Add User
      </Button>
      <List
        bordered
        dataSource={data}
        renderItem={(user) => (
          <List.Item
            actions={[
              editingUser?.id === user.id ? (
                <Button type="link" onClick={handleSave}>
                  Save
                </Button>
              ) : (
                <Button type="link" onClick={() => handleEdit(user)}>
                  Edit
                </Button>
              ),
              <Button type="link" danger>
                Delete
              </Button>,
            ]}
          >
            {editingUser?.id === user.id ? (
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new name"
              />
            ) : (
              user.name
            )}
          </List.Item>
        )}
      />
    </div>
  );
}
